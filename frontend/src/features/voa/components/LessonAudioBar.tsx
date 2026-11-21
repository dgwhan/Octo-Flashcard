"use client";

import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const SPEEDS = [0.75, 1.0, 1.25];

export function formatTime(secs: number) {
  if (isNaN(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

interface LessonAudioBarProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  onToggle: () => void;
  onRestart: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSpeed: (speed: number) => void;
}

/** Play/pause, restart, time, speed and seek bar for the lesson's broadcast audio. */
export default function LessonAudioBar({
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  onToggle,
  onRestart,
  onSeek,
  onSpeed,
}: LessonAudioBarProps) {
  return (
    <div
      style={{
        marginTop: "8px",
        padding: "18px 20px",
        borderRadius: "16px",
        background: "var(--color-bg-alt)",
        border: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={onToggle}
            aria-label={isPlaying ? "Tạm dừng" : "Phát audio"}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 14px var(--color-primary-ring)",
              transition: "transform 0.15s ease",
            }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: "2px" }} />}
          </button>

          <button
            type="button"
            onClick={onRestart}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              padding: "6px",
            }}
            title="Nghe lại từ đầu"
          >
            <RotateCcw size={18} />
          </button>

          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "monospace" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Playback speed buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>Tốc độ:</span>
          {SPEEDS.map((speed) => {
            const isSelected = playbackRate === speed;
            return (
              <button
                key={speed}
                type="button"
                onClick={() => onSpeed(speed)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  border: isSelected ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  backgroundColor: isSelected ? "var(--color-primary)" : "var(--color-bg-card)",
                  color: isSelected ? "var(--color-text-inverse)" : "var(--color-text-primary)",
                  fontSize: "0.775rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {speed}x
              </button>
            );
          })}
        </div>
      </div>

      {/* Range Seek Slider with Smooth Progress */}
      <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
        <input
          type="range"
          aria-label="Tua audio"
          min={0}
          max={duration > 0 ? duration : 100}
          step={0.5}
          value={currentTime}
          onChange={onSeek}
          style={{
            width: "100%",
            height: "6px",
            accentColor: "var(--color-primary)",
            cursor: "pointer",
            borderRadius: "9999px",
          }}
        />
      </div>
    </div>
  );
}
