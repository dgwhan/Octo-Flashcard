"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Volume2 } from "lucide-react";
import { GEMINI_VOICES } from "../lib/gemini";
import { KOKORO_SIZE_MB, KOKORO_VOICES, isKokoroCached, kokoroStatus, loadKokoro } from "../lib/voice/kokoro";
import { VOICE_EVENT, browserVoices, getVoicePref, setVoicePref, speakingVoice } from "../lib/voice/voice";
import { useGeminiConfig } from "./GeminiKeyPanel";
import styles from "../speaking.module.css";

const SAMPLE = "Hi there! This is how I sound when we practise speaking together.";

const subscribe = (cb: () => void) => {
  window.addEventListener(VOICE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(VOICE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

const KOKORO_GROUPS = ["Mỹ · Nữ", "Mỹ · Nam", "Anh · Nữ", "Anh · Nam"] as const;
const IDLE = { state: "idle", percent: 0 } as const;

/** Lets the learner pick the speaking module's voice: Kokoro (in-browser AI), Gemini (with a key) or a browser voice. */
export default function VoicePicker() {
  const pref = useSyncExternalStore(subscribe, getVoicePref, () => "");
  const hasKey = !!useGeminiConfig();
  const kokoro = useSyncExternalStore(kokoroStatus.subscribe, kokoroStatus.get, () => IDLE);
  const cached = useSyncExternalStore(subscribe, isKokoroCached, () => false);
  const kokoroOn = kokoro.state === "ready" || cached;

  // Already downloaded: warm the model up from disk so the first click is fast.
  useEffect(() => {
    if (cached) loadKokoro();
  }, [cached]);

  const choose = (value: string) => {
    setVoicePref(value);
    if (value.startsWith("kokoro:")) loadKokoro();
  };
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof speechSynthesis === "undefined") return;
    // Chrome fills the voice list asynchronously
    const load = () => setVoices(browserVoices());
    load();
    speechSynthesis.addEventListener("voiceschanged", load);
    return () => speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  // A Gemini choice without a key would silently play a browser voice: show "automatic" instead.
  const value = pref.startsWith("gemini:") && !hasKey ? "" : pref;

  return (
    <div className={styles.keyBar}>
      <label className={styles.voiceField}>
        <span>Giọng đọc</span>
        <select value={value} onChange={(e) => choose(e.target.value)}>
          <option value="">
            Tự động ({kokoroOn ? "Kokoro · Heart" : hasKey ? "giọng AI Gemini Kore" : "giọng tốt nhất của trình duyệt"})
          </option>
          {KOKORO_GROUPS.map((g) => (
            <optgroup key={g} label={`Kokoro AI trên máy · ${g}`}>
              {KOKORO_VOICES.filter((v) => v.group === g).map((v) => (
                <option key={v.id} value={`kokoro:${v.id}`}>
                  {v.label}
                </option>
              ))}
            </optgroup>
          ))}
          {hasKey &&
            (["Nữ", "Nam"] as const).map((g) => (
              <optgroup key={g} label={`Giọng AI Gemini · ${g}`}>
                {GEMINI_VOICES.filter((v) => v.gender === g).map((v) => (
                  <option key={v.name} value={`gemini:${v.name}`}>
                    {v.label}
                  </option>
                ))}
              </optgroup>
            ))}
          {voices.length > 0 && (
            <optgroup label="Giọng có sẵn trên máy">
              {voices.map((v) => (
                <option key={v.name} value={`browser:${v.name}`}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </label>
      <button type="button" className={styles.linkBtn} onClick={() => speakingVoice.play(SAMPLE)}>
        <Volume2 size={14} aria-hidden="true" /> Nghe thử
      </button>
      <span>
        {kokoro.state === "loading" ? (
          <span className={styles.voiceProgress} role="status">
            Đang tải giọng Kokoro… {kokoro.percent}%
            <progress max={100} value={kokoro.percent} aria-label="Tiến độ tải giọng Kokoro" />
          </span>
        ) : kokoro.state === "error" ? (
          <>
            Không tải được giọng Kokoro ({kokoro.error}).{" "}
            <button type="button" className={styles.linkBtn} onClick={loadKokoro}>
              Thử lại
            </button>
          </>
        ) : kokoroOn ? (
          "Giọng Kokoro chạy ngay trên máy bạn: không cần key, không giới hạn. Từ đơn và âm IPA vẫn dùng bản thu người bản xứ."
        ) : (
          <>
            Kokoro là giọng AI tự nhiên chạy ngay trên máy, không cần key và không giới hạn. Chỉ tải một lần (~
            {KOKORO_SIZE_MB} MB).{" "}
            <button type="button" className={styles.linkBtn} onClick={loadKokoro}>
              Tải giọng Kokoro
            </button>
          </>
        )}
      </span>
    </div>
  );
}
