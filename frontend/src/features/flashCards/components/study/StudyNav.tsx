"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../FlashCardViewer.module.css";

interface StudyNavProps {
  currentIndex: number;
  totalCards: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function StudyNav({ currentIndex, totalCards, onPrev, onNext }: StudyNavProps) {
  return (
    <div className={styles.controlsBar}>
      <button
        type="button"
        className={styles.controlBtn}
        onClick={onPrev}
        disabled={currentIndex === 0}
        title="Thẻ trước (Mũi tên trái)"
        aria-label="Previous card"
      >
        <ChevronLeft size={20} />
      </button>

      <div className={styles.navGroup}>
        <span className={styles.counter}>
          {currentIndex + 1} / {totalCards}
        </span>
      </div>

      <button
        type="button"
        className={styles.controlBtn}
        onClick={onNext}
        disabled={currentIndex === totalCards - 1}
        title="Thẻ tiếp theo (Mũi tên phải)"
        aria-label="Next card"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
