"use client";

import React from "react";
import { Sparkles, Volume2 } from "lucide-react";
import styles from "../FlashCardViewer.module.css";

interface CardFaceProps {
  back?: boolean;
  tag: string;
  language?: string;
  text?: string;
  isPlayingAudio: boolean;
  onPronounce: (e?: React.MouseEvent) => void;
}

/** One side of the 3D study card. */
export default function CardFace({ back, tag, language, text, isPlayingAudio, onPronounce }: CardFaceProps) {
  return (
    <div className={`${styles.cardFace} ${back ? styles.cardBack : styles.cardFront}`}>
      <div className={styles.faceHeader}>
        <div className={styles.tagGroup}>
          <span className={back ? `${styles.faceTag} ${styles.backTag}` : styles.faceTag}>{tag}</span>
          <span className={styles.languageBadge}>
            {language || "English"}
          </span>
        </div>
        <button
          type="button"
          className={`${styles.audioBtn} ${isPlayingAudio ? styles.audioBtnActive : ""}`}
          onClick={onPronounce}
          title={back ? "Phát âm định nghĩa (Phím A)" : "Phát âm từ vựng (Phím A)"}
          aria-label={back ? "Pronounce back text" : "Pronounce front text"}
        >
          <Volume2 size={18} />
        </button>
      </div>

      <div className={styles.faceBody}>
        <p className={styles.faceText}>{text}</p>
      </div>

      <div className={styles.faceFooter}>
        <span className={styles.hintText}>
          <Sparkles size={14} />
          {back ? "Nhấn để quay lại mặt trước" : "Nhấn vào thẻ hoặc phím Space để lật xem đáp án"}
        </span>
        <span className={styles.flipBadge}>{back ? "Mặt 2" : "Mặt 1"}</span>
      </div>
    </div>
  );
}
