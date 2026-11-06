"use client";

import React, { useState, ButtonHTMLAttributes, forwardRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { naturalAudio } from "@/src/features/dictionary";
import styles from "./AudioButton.module.css";

export interface AudioButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  text: string;
  audioUrl?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "subtle" | "ghost";
  speed?: number;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
}

export const AudioButton = forwardRef<HTMLButtonElement, AudioButtonProps>(
  (
    {
      text,
      audioUrl,
      size = "md",
      variant = "primary",
      speed = 1.0,
      onPlayStart,
      onPlayEnd,
      className = "",
      disabled,
      title = "Nghe phát âm chuẩn",
      ...props
    },
    ref
  ) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      if (isPlaying) {
        naturalAudio.stop();
        setIsPlaying(false);
        onPlayEnd?.();
        return;
      }

      setIsPlaying(true);
      onPlayStart?.();

      try {
        await naturalAudio.play(text, audioUrl, speed);
      } catch (err) {
        console.warn("[AudioButton] Lỗi phát âm:", err);
      } finally {
        setIsPlaying(false);
        onPlayEnd?.();
      }
    };

    const iconSize = size === "sm" ? 14 : size === "lg" ? 22 : 18;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleClick}
        title={title}
        aria-label={props["aria-label"] || `Phát âm từ ${text}`}
        aria-pressed={isPlaying}
        className={`${styles.audioBtn} ${styles[size]} ${styles[variant]} ${
          isPlaying ? styles.playing : ""
        } ${className}`}
        {...props}
      >
        {isPlaying ? (
          <span className={styles.playingIndicator}>
            <Volume2 size={iconSize} className={styles.iconPulse} />
          </span>
        ) : (
          <Volume2 size={iconSize} />
        )}
      </button>
    );
  }
);

AudioButton.displayName = "AudioButton";

export default AudioButton;
