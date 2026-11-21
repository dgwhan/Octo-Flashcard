"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Volume2 } from "lucide-react";
import { GEMINI_VOICES } from "../gemini";
import { VOICE_EVENT, browserVoices, getVoicePref, setVoicePref, speakingVoice } from "../voice";
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

/** Lets the learner pick the speaking module's voice: a Gemini AI voice (with a key) or an installed browser voice. */
export default function VoicePicker() {
  const pref = useSyncExternalStore(subscribe, getVoicePref, () => "");
  const hasKey = !!useGeminiConfig();
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
        <select value={value} onChange={(e) => setVoicePref(e.target.value)}>
          <option value="">Tự động ({hasKey ? "giọng AI Kore" : "giọng tốt nhất của trình duyệt"})</option>
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
        {hasKey
          ? "Từ đơn và âm IPA luôn dùng bản thu của người bản xứ khi có."
          : "Nhập Gemini API key ở mục Nhập vai hoặc IELTS để mở thêm các giọng AI tự nhiên."}
      </span>
    </div>
  );
}
