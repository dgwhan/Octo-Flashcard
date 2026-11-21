"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Volume2 } from "lucide-react";
import { GEMINI_VOICES } from "@/src/lib/ai";
import { useUserSettings, updateUserSettings } from "@/src/lib/userSettings";
import { KOKORO_SIZE_MB, KOKORO_VOICES, isKokoroCached, kokoroStatus, loadKokoro } from "@/src/lib/voice/kokoro";
import { browserVoices, voicePlayer } from "@/src/lib/voice/voice";
import styles from "../settings.module.css";

const SAMPLE = "Hi there! This is how I sound when we practise speaking together.";
const KOKORO_GROUPS = ["Mỹ · Nữ", "Mỹ · Nam", "Anh · Nữ", "Anh · Nam"] as const;
const IDLE = { state: "idle", percent: 0 } as const;
const noop = () => () => {};

/**
 * The app-wide voice: Kokoro (in-browser AI), Gemini (needs the user's key) or a browser voice.
 * The choice is saved to the account, so every page and device uses it.
 */
export default function VoicePicker() {
  const { settings } = useUserSettings();
  const kokoro = useSyncExternalStore(kokoroStatus.subscribe, kokoroStatus.get, () => IDLE);
  const cached = useSyncExternalStore(noop, isKokoroCached, () => false);
  const kokoroOn = kokoro.state === "ready" || cached;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [error, setError] = useState("");

  // Already downloaded: warm the model up from disk so the first click is fast.
  useEffect(() => {
    if (cached) loadKokoro();
  }, [cached]);

  useEffect(() => {
    if (typeof speechSynthesis === "undefined") return;
    // Chrome fills the voice list asynchronously
    const load = () => setVoices(browserVoices());
    load();
    speechSynthesis.addEventListener("voiceschanged", load);
    return () => speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  const choose = (value: string) => {
    setError("");
    if (value.startsWith("kokoro:")) loadKokoro();
    updateUserSettings({ voice: value }).catch((err) => setError(err instanceof Error ? err.message : "Không lưu được."));
  };

  // A Gemini choice without a key would silently play a browser voice: show "automatic" instead.
  const value = settings.voice.startsWith("gemini:") && !settings.hasGeminiKey ? "" : settings.voice;

  return (
    <div className={styles.voiceBar}>
      <label className={styles.voiceField}>
        <span>Giọng đọc</span>
        <select value={value} onChange={(e) => choose(e.target.value)}>
          <option value="">
            Tự động (
            {kokoroOn ? "Kokoro · Heart" : settings.hasGeminiKey ? "giọng AI Gemini Kore" : "giọng tốt nhất của trình duyệt"})
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
          {settings.hasGeminiKey &&
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
      <button type="button" className={styles.linkBtn} onClick={() => voicePlayer.play(SAMPLE)}>
        <Volume2 size={14} aria-hidden="true" /> Nghe thử
      </button>
      <span className={styles.voiceNote}>
        {error ? (
          <span className={styles.error}>{error}</span>
        ) : kokoro.state === "loading" ? (
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
            Kokoro là giọng AI tự nhiên chạy ngay trên máy, không cần key và không giới hạn. Chỉ tải một lần cho mỗi máy (~
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
