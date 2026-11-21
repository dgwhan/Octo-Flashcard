"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/* Minimal Web Speech API typings (not in every TS dom lib). */
interface RecognitionAlternative {
  transcript: string;
}
interface RecognitionResult {
  isFinal: boolean;
  0: RecognitionAlternative;
}
interface RecognitionEvent {
  resultIndex: number;
  results: ArrayLike<RecognitionResult>;
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export interface SpeechSupport {
  recognition: boolean;
  recorder: boolean;
}

const noop = () => () => {};
let cachedSupport: SpeechSupport | null = null;
const readSupport = (): SpeechSupport =>
  (cachedSupport ??= {
    recognition: !!recognitionCtor(),
    recorder: typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia,
  });
const SERVER_SUPPORT: SpeechSupport = { recognition: true, recorder: true };

/** What this browser can do; the server snapshot assumes "everything" so SSR and hydration agree. */
export const useSpeechSupport = () => useSyncExternalStore(noop, readSupport, () => SERVER_SUPPORT);

const ERRORS: Record<string, string> = {
  "not-allowed": "Trình duyệt chưa được cấp quyền dùng micro.",
  "service-not-allowed": "Trình duyệt chặn dịch vụ nhận dạng giọng nói.",
  "no-speech": "Không nghe thấy tiếng nói. Thử nói to và gần micro hơn.",
  "audio-capture": "Không tìm thấy micro.",
  network: "Nhận dạng giọng nói cần kết nối mạng.",
};

interface Options {
  /** Keep recognising across pauses (long answers); otherwise it ends after one utterance. */
  continuous?: boolean;
  /** Called once per take, after the last recognition result has arrived. */
  onEnd?: (transcript: string, seconds: number) => void;
  /** Take ownership of each recording (caller revokes the URL); otherwise the hook keeps only the latest. */
  onAudio?: (url: string) => void;
}

/** Records the mic (for playback) and runs speech recognition at the same time. */
export function useSpeechCapture({ continuous = false, onEnd, onAudio }: Options = {}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const recRef = useRef<Recognition | null>(null);
  const recRunning = useRef(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const activeRef = useRef(false);
  const finishedRef = useRef(true);
  const finalRef = useRef("");
  const startedAt = useRef(0);
  const urlRef = useRef<string | null>(null);
  const onEndRef = useRef(onEnd);
  const onAudioRef = useRef(onAudio);
  useEffect(() => {
    onEndRef.current = onEnd;
    onAudioRef.current = onAudio;
  });

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    activeRef.current = false;
    setListening(false);
    setInterim("");
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    else streamRef.current?.getTracks().forEach((t) => t.stop());
    onEndRef.current?.(finalRef.current, Math.round((Date.now() - startedAt.current) / 1000));
  }, []);

  const stop = useCallback(() => {
    activeRef.current = false;
    // Let recognition deliver its last result first; its onend calls finish()
    if (recRunning.current) recRef.current?.stop();
    else finish();
  }, [finish]);

  const reset = useCallback(() => {
    finalRef.current = "";
    setTranscript("");
    setInterim("");
    setError("");
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setAudioUrl(null);
  }, []);

  const start = useCallback(async () => {
    reset();
    activeRef.current = true;
    finishedRef.current = false;
    startedAt.current = Date.now();
    setListening(true);

    // 1. Recording for playback (optional: recognition still works without it)
    if (typeof MediaRecorder !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!activeRef.current) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const chunks: Blob[] = [];
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          if (e.data.size) chunks.push(e.data);
        };
        recorder.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          if (!chunks.length) return;
          const url = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
          if (onAudioRef.current) return onAudioRef.current(url);
          urlRef.current = url;
          setAudioUrl(url);
        };
        recorderRef.current = recorder;
        recorder.start();
      } catch (err) {
        const denied = err instanceof DOMException && err.name === "NotAllowedError";
        setError(denied ? ERRORS["not-allowed"] : "Không mở được micro.");
        finishedRef.current = true;
        activeRef.current = false;
        setListening(false);
        return;
      }
    }

    // 2. Speech recognition
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.continuous = continuous;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let live = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current = `${finalRef.current} ${r[0].transcript}`.trim();
        else live += r[0].transcript;
      }
      setTranscript(finalRef.current);
      setInterim(live.trim());
    };
    rec.onerror = (e) => {
      if (e.error === "aborted" || (e.error === "no-speech" && continuous)) return;
      setError(ERRORS[e.error] ?? `Lỗi nhận dạng giọng nói (${e.error}).`);
    };
    rec.onend = () => {
      recRunning.current = false;
      // Chrome ends recognition after a pause; keep going while a long answer is still being recorded
      if (activeRef.current && continuous) {
        try {
          rec.start();
          recRunning.current = true;
          return;
        } catch {
          // fall through and finish
        }
      }
      finish();
    };
    recRef.current = rec;
    try {
      rec.start();
      recRunning.current = true;
    } catch {
      setError("Không khởi động được nhận dạng giọng nói.");
    }
  }, [continuous, finish, reset]);

  useEffect(
    () => () => {
      activeRef.current = false;
      finishedRef.current = true;
      recRef.current?.abort();
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    []
  );

  return { start, stop, reset, listening, transcript, interim, audioUrl, error };
}
