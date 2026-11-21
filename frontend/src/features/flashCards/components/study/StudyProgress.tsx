"use client";

import type { RefObject } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import styles from "../FlashCardViewer.module.css";

interface StudyProgressProps {
  masteredCount: number;
  reviewCount: number;
  currentIndex: number;
  totalCards: number;
  progressPercent: number;
  /** The "Đã nhớ" pill, animated when a card is mastered */
  pillRef: RefObject<HTMLSpanElement | null>;
}

export default function StudyProgress({
  masteredCount,
  reviewCount,
  currentIndex,
  totalCards,
  progressPercent,
  pillRef,
}: StudyProgressProps) {
  return (
    <div className={styles.progressSection}>
      <div className={styles.statsBar}>
        <div className={styles.statPills}>
          <span ref={pillRef} className={styles.pillMastered} title="Số thẻ đã thuộc">
            <CheckCircle2 size={13} />
            <span>{masteredCount} Đã nhớ</span>
          </span>
          <span className={styles.pillReview} title="Số thẻ cần ôn lại">
            <XCircle size={13} />
            <span>{reviewCount} Cần ôn</span>
          </span>
        </div>
        <span className={styles.counterText}>
          Thẻ {currentIndex + 1} / {totalCards} ({Math.round(progressPercent)}%)
        </span>
      </div>

      <div className={styles.progressTrack} role="progressbar" aria-valuenow={progressPercent}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
