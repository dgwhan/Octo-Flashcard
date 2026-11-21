"use client";

import { useState } from "react";
import { useUserSettings, updateUserSettings } from "@/src/lib/userSettings";
import { voicePlayer } from "@/src/lib/voice/voice";
import styles from "../settings.module.css";

const SPEEDS = [0.75, 0.9, 1, 1.15, 1.3];

/** Default reading speed for every "listen" button (pages with their own slow/normal toggle still override it). */
export default function VoiceSpeed() {
  const { settings } = useUserSettings();
  const [error, setError] = useState("");

  const choose = (speed: number) => {
    setError("");
    updateUserSettings({ voiceSpeed: speed })
      .then(() => voicePlayer.play("This is my reading speed.", undefined, speed))
      .catch((err) => setError(err instanceof Error ? err.message : "Không lưu được."));
  };

  return (
    <div className={styles.stack}>
      <div className={styles.segmented} role="group" aria-label="Tốc độ đọc mặc định">
        {SPEEDS.map((s) => (
          <button key={s} type="button" aria-pressed={settings.voiceSpeed === s} onClick={() => choose(s)}>
            {s === 1 ? "1× (thường)" : `${s}×`}
          </button>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
