"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { AudioButton } from "@/src/components/ui/AudioButton";
import { speakingVoice } from "../lib/voice/voice";
import { kokoroStatus } from "../lib/voice/kokoro";
import VoicePicker from "./VoicePicker";
import SaveToDeckButton from "@/src/features/flashcards/components/SaveToDeckButton";
import { logStudySession } from "@/src/lib/studyLog";
import { compareSpeech, SpeechCheck } from "../lib/compare";
import { useSpeechCapture, useSpeechSupport } from "../hooks/useSpeechCapture";
import { MicButton, LiveTranscript, SpeechResult } from "./SpeechParts";
import styles from "../speaking.module.css";

export interface DrillItem {
  /** What is shown, e.g. "ship – sheep" */
  display: string;
  /** What the learner should say, e.g. "ship sheep" */
  target: string;
}

const SPEEDS = [0.8, 1] as const;

/** Listen → say it → see which words were heard. Shared by Shadowing and Pronunciation. */
export default function SentenceDrill({ items, label }: { items: DrillItem[]; label: string }) {
  const support = useSpeechSupport();
  const [index, setIndex] = useState(0);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [check, setCheck] = useState<SpeechCheck | null>(null);
  const [heard, setHeard] = useState("");
  const [best, setBest] = useState<Record<number, number>>({});
  const [missed, setMissed] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const item = items[index];
  const nextTarget = items[index + 1]?.target;
  const kokoroState = useSyncExternalStore(kokoroStatus.subscribe, () => kokoroStatus.get().state, () => "idle");

  // Kokoro takes a few seconds per sentence on the CPU: start on the shown sentence and the next one
  // before the learner clicks, so "Nghe mẫu" usually plays at once.
  useEffect(() => {
    if (kokoroState !== "ready" || !item) return;
    speakingVoice.prefetch(item.target, speed);
    if (nextTarget) speakingVoice.prefetch(nextTarget, speed);
  }, [kokoroState, item, nextTarget, speed]);

  const capture = useSpeechCapture({
    onEnd: (transcript) => {
      if (!support.recognition) return;
      const result = compareSpeech(item.target, transcript);
      setCheck(result);
      setHeard(transcript);
      setBest((b) => ({ ...b, [index]: Math.max(b[index] ?? 0, result.score) }));
      setMissed((m) => [...new Set([...m, ...result.missed])].slice(-30));
    },
  });

  const go = (to: number) => {
    capture.stop();
    capture.reset();
    setCheck(null);
    setHeard("");
    setIndex(Math.max(0, Math.min(items.length - 1, to)));
  };

  const begin = () => {
    if (!startedAt) setStartedAt(new Date());
    setCheck(null);
    capture.start();
  };

  const finish = () => {
    capture.stop();
    if (startedAt) logStudySession("Speaking", startedAt);
    setDone(true);
  };

  const attempts = Object.values(best);
  const average = attempts.length ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length) : 0;

  if (done) {
    return (
      <section className={styles.panel} aria-label="Kết quả buổi luyện">
        <h2 className={styles.panelTitle}>Xong buổi luyện</h2>
        <p className={styles.muted}>
          {attempts.length} câu đã nói · điểm trung bình {average}%. Thời gian luyện đã được cộng vào chuỗi ngày học.
        </p>
        {missed.length > 0 && (
          <>
            <h3 className={styles.subTitle}>Từ cần luyện thêm</h3>
            <ul className={styles.wordList}>
              {missed.map((w) => (
                <li key={w}>
                  <span lang="en">{w}</span>
                  <AudioButton player={speakingVoice} text={w} size="sm" variant="subtle" aria-label={`Nghe từ ${w}`} />
                  <SaveToDeckButton front={w} back="Từ cần luyện phát âm" label="Lưu" />
                </li>
              ))}
            </ul>
          </>
        )}
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => {
            setDone(false);
            setBest({});
            setMissed([]);
            setStartedAt(null);
            go(0);
          }}
        >
          Luyện lại từ đầu
        </button>
      </section>
    );
  }

  return (
    <div className={styles.stack}>
      <VoicePicker />
      <section className={styles.panel} aria-label={label}>
        <div className={styles.drillMeta}>
          <span>{label}</span>
          <span className={styles.count}>
            {index + 1} / {items.length}
          </span>
        </div>
        <div className={styles.track} aria-hidden="true">
          <span style={{ width: `${((index + 1) / items.length) * 100}%` }} />
        </div>

        <p className={styles.target} lang="en">
          {item.display}
        </p>

        <div className={styles.controls}>
          <AudioButton player={speakingVoice} text={item.target} speed={speed} size="lg" aria-label={`Nghe mẫu: ${item.target}`} />
          <div className={styles.speed} role="group" aria-label="Tốc độ nghe mẫu">
            {SPEEDS.map((s) => (
              <button key={s} type="button" aria-pressed={speed === s} onClick={() => setSpeed(s)}>
                {s === 1 ? "Bình thường" : "Chậm"}
              </button>
            ))}
          </div>
          <MicButton listening={capture.listening} onStart={begin} onStop={capture.stop} label="Nói theo" />
        </div>

        <LiveTranscript transcript={capture.listening ? capture.transcript : ""} interim={capture.interim} />
        {capture.error && (
          <p className={styles.error} role="alert">
            {capture.error}
          </p>
        )}
        {check && <SpeechResult check={check} heard={heard} />}
        {capture.audioUrl && (
          <div className={styles.playback}>
            <span>Giọng của bạn:</span>
            <audio controls src={capture.audioUrl} />
          </div>
        )}

        <div className={styles.nav}>
          <button type="button" className={styles.navBtn} onClick={() => go(index - 1)} disabled={index === 0}>
            <ChevronLeft size={16} aria-hidden="true" /> Câu trước
          </button>
          <button type="button" className={styles.navBtn} onClick={finish} disabled={!startedAt}>
            <Flag size={15} aria-hidden="true" /> Kết thúc
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => (index === items.length - 1 ? finish() : go(index + 1))}
            disabled={index === items.length - 1 && !startedAt}
          >
            {index === items.length - 1 ? "Hoàn thành" : "Câu sau"} <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
