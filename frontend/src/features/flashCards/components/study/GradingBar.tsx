"use client";

import { CheckCircle2, RotateCw, XCircle } from "lucide-react";
import { useTranslation } from "@/src/i18n";
import styles from "../FlashCardViewer.module.css";

interface GradingBarProps {
  onReview: () => void;
  onFlip: () => void;
  onMastered: () => void;
}

/** "Cần ôn" / flip / "Đã nhớ" buttons. */
export default function GradingBar({ onReview, onFlip, onMastered }: GradingBarProps) {
  const { t } = useTranslation();
  return (
    <div className={styles.gradingBar}>
      <button
        type="button"
        className={styles.btnGradingReview}
        onClick={onReview}
        title={t("study.needReview")}
        aria-label={t("study.needReview")}
      >
        <XCircle size={18} />
        <span>{t("study.needReview")}</span>
        <span className={styles.shortcutPill}>1</span>
      </button>

      <button
        type="button"
        className={styles.btnFlipCenter}
        onClick={onFlip}
        title={t("study.flipHint")}
        aria-label="Flip card"
      >
        <RotateCw size={16} />
        <span>{t("study.flipHint")}</span>
        <span className={styles.shortcutPill}>Space</span>
      </button>

      <button
        type="button"
        className={styles.btnGradingMastered}
        onClick={onMastered}
        title={t("study.mastered")}
        aria-label={t("study.mastered")}
      >
        <CheckCircle2 size={18} />
        <span>{t("study.mastered")}</span>
        <span className={styles.shortcutPill}>2</span>
      </button>
    </div>
  );
}
