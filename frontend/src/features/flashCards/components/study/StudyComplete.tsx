"use client";

import { RotateCcw, RotateCw, Trophy } from "lucide-react";
import { useTranslation } from "@/src/i18n";
import styles from "../FlashCardViewer.module.css";

interface StudyCompleteProps {
  masteredCount: number;
  reviewCount: number;
  accuracyRate: number;
  totalCards: number;
  onReviewWeak: () => void;
  onRestart: () => void;
}

/** End-of-session summary. */
export default function StudyComplete({
  masteredCount,
  reviewCount,
  accuracyRate,
  totalCards,
  onReviewWeak,
  onRestart,
}: StudyCompleteProps) {
  const { t } = useTranslation();
  return (
    <div className={styles.completionCard}>
      <div className={styles.trophyCircle}>
        <Trophy size={40} />
      </div>
      <div>
        <h2 className={styles.completionTitle}>{t("study.completedTitle")}</h2>
        <p className={styles.completionDesc}>
          {t("study.completedSubtitle")}
        </p>
      </div>

      <div className={styles.summaryMetricsGrid}>
        <div className={styles.metricBox}>
          <span className={`${styles.metricValue} ${styles.metricSuccess}`}>
            {masteredCount}
          </span>
          <span className={styles.metricLabel}>{t("study.mastered")} ({accuracyRate}%)</span>
        </div>

        <div className={styles.metricBox}>
          <span className={`${styles.metricValue} ${styles.metricReview}`}>
            {reviewCount}
          </span>
          <span className={styles.metricLabel}>{t("study.needReview")}</span>
        </div>

        <div className={styles.metricBox}>
          <span className={styles.metricValue}>{totalCards}</span>
          <span className={styles.metricLabel}>{t("flashcards.totalCards")}</span>
        </div>
      </div>

      <div className={styles.completionActions}>
        {reviewCount > 0 && (
          <button
            type="button"
            className={styles.btnPrimaryAction}
            onClick={onReviewWeak}
          >
            <RotateCcw size={18} />
            <span>{t("study.needReview")} ({reviewCount})</span>
          </button>
        )}

        <button
          type="button"
          className={styles.btnSecondaryAction}
          onClick={onRestart}
        >
          <RotateCw size={18} />
          <span>{t("study.restartStudy")}</span>
        </button>
      </div>
    </div>
  );
}
