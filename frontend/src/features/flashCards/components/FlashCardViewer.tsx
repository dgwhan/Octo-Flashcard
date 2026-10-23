"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Volume2,
  RotateCw,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ArrowLeftRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  Lock,
  LogIn,
  UserCheck,
} from "lucide-react";
import { FlashCardResponse } from "@/src/types/flashCard";
import { authApi } from "@/src/features/auth/api/auth.api";
import { useTranslation } from "@/src/i18n";
import styles from "./FlashCardViewer.module.css";

export interface FlashCardViewerProps {
  cards: FlashCardResponse[];
  deckId?: string;
  deckTitle?: string;
  onCardMastered?: (cardId: string) => void;
}

interface StudyProgressState {
  masteredIds: string[];
  reviewIds: string[];
  lastIndex: number;
  updatedAt: string;
}

export const FlashCardViewer: React.FC<FlashCardViewerProps> = ({
  cards,
  deckId = "default-deck",
  deckTitle,
  onCardMastered,
}) => {
  const { t } = useTranslation();

  // Check user authentication
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<{
    userId: string;
    username: string;
    email: string;
  } | null>(null);

  // Card deck & study queue states
  const [deckCards, setDeckCards] = useState<FlashCardResponse[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Memorization classification sets
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());

  // Determine user login status on mount
  useEffect(() => {
    const token = authApi.getStoredToken();
    const user = authApi.getStoredUser();
    setIsLoggedIn(!!token);
    setCurrentUser(user);
  }, []);

  // Sync cards prop if changed
  useEffect(() => {
    setDeckCards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  }, [cards]);

  // Storage key scoped to user and deck
  const storageKey = useMemo(() => {
    const uid = currentUser?.userId || "guest";
    return `octo_flashcard_study_${uid}_${deckId}`;
  }, [currentUser?.userId, deckId]);

  // Load study progress per user from LocalStorage
  useEffect(() => {
    if (typeof window === "undefined" || !deckId) return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: StudyProgressState = JSON.parse(saved);
        if (parsed.masteredIds) setMasteredIds(new Set(parsed.masteredIds));
        if (parsed.reviewIds) setReviewIds(new Set(parsed.reviewIds));
      }
    } catch {
      // ignore parse errors
    }
  }, [storageKey, deckId]);

  // Persist study progress per user to LocalStorage
  const persistProgress = useCallback(
    (mIds: Set<string>, rIds: Set<string>, curIdx: number) => {
      if (typeof window === "undefined" || !deckId) return;

      const data: StudyProgressState = {
        masteredIds: Array.from(mIds),
        reviewIds: Array.from(rIds),
        lastIndex: curIdx,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
    [deckId, storageKey]
  );

  const totalCards = deckCards.length;
  const currentCard = deckCards[currentIndex];

  // Speech pronunciation using native Web Speech API
  const handlePronounce = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentCard || typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      window.speechSynthesis.cancel();
      const textToSpeak = !isFlipped
        ? (isReversed ? currentCard.definition : currentCard.term)
        : (isReversed ? currentCard.term : currentCard.definition);

      const langToUse = !isFlipped
        ? (isReversed ? currentCard.definitionLanguage : currentCard.termLanguage)
        : (isReversed ? currentCard.termLanguage : currentCard.definitionLanguage);

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const l = (langToUse || "").toLowerCase();

      if (l.includes("vi")) {
        utterance.lang = "vi-VN";
      } else if (l.includes("fr")) {
        utterance.lang = "fr-FR";
      } else if (l.includes("ja")) {
        utterance.lang = "ja-JP";
      } else {
        utterance.lang = "en-US";
      }

      utterance.rate = 0.95;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    },
    [currentCard, isFlipped, isReversed]
  );

  // Flip card
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Next card
  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, totalCards]);

  // Previous card
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Mark as Mastered (Đã thuộc)
  const handleMarkMastered = useCallback(() => {
    if (!currentCard) return;

    setMasteredIds((prevM) => {
      const nextM = new Set(prevM);
      nextM.add(currentCard.id);

      setReviewIds((prevR) => {
        const nextR = new Set(prevR);
        nextR.delete(currentCard.id);
        persistProgress(nextM, nextR, currentIndex);
        return nextR;
      });

      return nextM;
    });

    if (onCardMastered) onCardMastered(currentCard.id);
    handleNext();
  }, [currentCard, currentIndex, handleNext, onCardMastered, persistProgress]);

  // Mark as Need Review (Cần ôn lại)
  const handleMarkReview = useCallback(() => {
    if (!currentCard) return;

    setReviewIds((prevR) => {
      const nextR = new Set(prevR);
      nextR.add(currentCard.id);

      setMasteredIds((prevM) => {
        const nextM = new Set(prevM);
        nextM.delete(currentCard.id);
        persistProgress(nextM, nextR, currentIndex);
        return nextM;
      });

      return nextR;
    });

    handleNext();
  }, [currentCard, currentIndex, handleNext, persistProgress]);

  // Shuffle card order
  const handleToggleShuffle = useCallback(() => {
    if (!isShuffled) {
      const shuffled = [...deckCards].sort(() => Math.random() - 0.5);
      setDeckCards(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsShuffled(true);
    } else {
      setDeckCards(cards);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsShuffled(false);
    }
  }, [cards, deckCards, isShuffled]);

  // Reverse card sides (Def -> Term)
  const handleToggleReverse = useCallback(() => {
    setIsReversed((prev) => !prev);
    setIsFlipped(false);
  }, []);

  // Toggle Fullscreen mode
  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // Restart all cards
  const handleRestartAll = useCallback(() => {
    setDeckCards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  }, [cards]);

  // Review only weak cards
  const handleReviewWeakCards = useCallback(() => {
    const weakCards = cards.filter((c) => reviewIds.has(c.id));
    if (weakCards.length > 0) {
      setDeckCards(weakCards);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsCompleted(false);
    }
  }, [cards, reviewIds]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "1") {
        e.preventDefault();
        handleMarkReview();
      } else if (e.key === "2") {
        e.preventDefault();
        handleMarkMastered();
      } else if (e.key.toLowerCase() === "a") {
        e.preventDefault();
        handlePronounce();
      } else if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleToggleShuffle();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        handleToggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleFlip,
    handleNext,
    handlePrev,
    handleMarkMastered,
    handleMarkReview,
    handlePronounce,
    handleToggleShuffle,
    handleToggleFullscreen,
  ]);

  // ==========================================
  // 1. AUTH GUARD VIEW (Yêu cầu đăng nhập)
  // ==========================================
  if (!isLoggedIn) {
    const redirectTarget = deckId ? `/flashcards?setId=${deckId}` : "/flashcards";
    return (
      <div className={styles.authGuardBox}>
        <div className={styles.lockIconCircle}>
          <Lock size={30} />
        </div>
        <h3 className={styles.authGuardTitle}>Yêu cầu đăng nhập để học tập</h3>
        <p className={styles.authGuardDesc}>
          Bạn cần đăng nhập tài khoản Octo Flashcard để sử dụng giao diện học thẻ 2 mặt, phát âm giọng đọc, theo dõi tỷ lệ nhớ và lưu trữ tiến độ cá nhân của bạn.
        </p>
        <div className={styles.authGuardButtons}>
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(redirectTarget)}`}
            className={styles.btnPrimaryAction}
          >
            <LogIn size={18} />
            <span>Đăng nhập ngay</span>
          </Link>
          <Link
            href={`/auth/register?redirect=${encodeURIComponent(redirectTarget)}`}
            className={styles.btnSecondaryAction}
          >
            <span>Tạo tài khoản mới</span>
          </Link>
        </div>
      </div>
    );
  }

  // If no cards exist
  if (!cards || cards.length === 0 || !currentCard) {
    return null;
  }

  // ==========================================
  // 2. STUDY COMPLETION VIEW (Tổng kết buổi học)
  // ==========================================
  if (isCompleted) {
    const masteredCount = masteredIds.size;
    const reviewCount = reviewIds.size;
    const accuracyRate =
      totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

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
              onClick={handleReviewWeakCards}
            >
              <RotateCcw size={18} />
              <span>{t("study.needReview")} ({reviewCount})</span>
            </button>
          )}

          <button
            type="button"
            className={styles.btnSecondaryAction}
            onClick={handleRestartAll}
          >
            <RotateCw size={18} />
            <span>{t("study.restartStudy")}</span>
          </button>
        </div>
      </div>
    );
  }

  // Values for card front & back depending on Reverse setting
  const frontText = isReversed ? currentCard.definition : currentCard.term;
  const frontLanguage = isReversed ? currentCard.definitionLanguage : currentCard.termLanguage;
  const frontTagLabel = isReversed ? "Định nghĩa" : "Thuật ngữ";

  const backText = isReversed ? currentCard.term : currentCard.definition;
  const backLanguage = isReversed ? currentCard.termLanguage : currentCard.definitionLanguage;
  const backTagLabel = isReversed ? "Thuật ngữ" : "Định nghĩa";

  const progressPercent = ((currentIndex + 1) / totalCards) * 100;

  return (
    <div
      className={`${styles.viewerWrapper} ${
        isFullscreen ? styles.fullscreenActive : ""
      }`}
    >
      {/* Top Bar: User Progress Badge & Study Toolbar */}
      <div className={styles.topBar}>
        <div className={styles.userStatusBadge} title="Tiến độ học tập được lưu tự động cho tài khoản">
          <span className={styles.userDot} />
          <UserCheck size={14} />
          <span>
            Lưu cho: <span className={styles.userNameHighlight}>{currentUser?.username || "Tài khoản của bạn"}</span>
          </span>
        </div>

        <div className={styles.topTools}>
          <button
            type="button"
            className={`${styles.toolBtn} ${isShuffled ? styles.toolBtnActive : ""}`}
            onClick={handleToggleShuffle}
            title="Xáo trộn thứ tự thẻ (Phím S)"
            aria-label="Shuffle cards"
          >
            <Shuffle size={14} />
            <span>Xáo trộn</span>
          </button>

          <button
            type="button"
            className={`${styles.toolBtn} ${isReversed ? styles.toolBtnActive : ""}`}
            onClick={handleToggleReverse}
            title="Đảo mặt thẻ (Định nghĩa <-> Thuật ngữ)"
            aria-label="Reverse card faces"
          >
            <ArrowLeftRight size={14} />
            <span>Đổi mặt hỏi</span>
          </button>

          <button
            type="button"
            className={styles.toolBtn}
            onClick={handleToggleFullscreen}
            title="Bật/Tắt toàn màn hình (Phím F)"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Progress Bar & Counters */}
      <div className={styles.progressSection}>
        <div className={styles.statsBar}>
          <div className={styles.statPills}>
            <span className={styles.pillMastered} title="Số thẻ đã thuộc">
              <CheckCircle2 size={13} />
              <span>{masteredIds.size} Đã nhớ</span>
            </span>
            <span className={styles.pillReview} title="Số thẻ cần ôn lại">
              <XCircle size={13} />
              <span>{reviewIds.size} Cần ôn</span>
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

      {/* 3D Flippable Flashcard */}
      <div
        className={styles.cardScene}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label="Thẻ ghi nhớ - Nhấp chuột hoặc bấm Phím Cách để lật mặt thẻ"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleFlip();
        }}
      >
        <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
          {/* MẶT TRƯỚC (Front Face) */}
          <div className={`${styles.cardFace} ${styles.cardFront}`}>
            <div className={styles.faceHeader}>
              <div className={styles.tagGroup}>
                <span className={styles.faceTag}>{frontTagLabel}</span>
                <span className={styles.languageBadge}>
                  {frontLanguage || "English"}
                </span>
              </div>
              <button
                type="button"
                className={`${styles.audioBtn} ${isPlayingAudio ? styles.audioBtnActive : ""}`}
                onClick={handlePronounce}
                title="Phát âm từ vựng (Phím A)"
                aria-label="Pronounce front text"
              >
                <Volume2 size={18} />
              </button>
            </div>

            <div className={styles.faceBody}>
              <p className={styles.faceText}>{frontText}</p>
            </div>

            <div className={styles.faceFooter}>
              <span className={styles.hintText}>
                <Sparkles size={14} />
                Nhấn vào thẻ hoặc phím Space để lật xem đáp án
              </span>
              <span className={styles.flipBadge}>Mặt 1</span>
            </div>
          </div>

          {/* MẶT SAU (Back Face) */}
          <div className={`${styles.cardFace} ${styles.cardBack}`}>
            <div className={styles.faceHeader}>
              <div className={styles.tagGroup}>
                <span className={`${styles.faceTag} ${styles.backTag}`}>
                  {backTagLabel}
                </span>
                <span className={styles.languageBadge}>
                  {backLanguage || "English"}
                </span>
              </div>
              <button
                type="button"
                className={`${styles.audioBtn} ${isPlayingAudio ? styles.audioBtnActive : ""}`}
                onClick={handlePronounce}
                title="Phát âm định nghĩa (Phím A)"
                aria-label="Pronounce back text"
              >
                <Volume2 size={18} />
              </button>
            </div>

            <div className={styles.faceBody}>
              <p className={styles.faceText}>{backText}</p>
            </div>

            <div className={styles.faceFooter}>
              <span className={styles.hintText}>
                <Sparkles size={14} />
                Nhấn để quay lại mặt trước
              </span>
              <span className={styles.flipBadge}>Mặt 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Assessment Action Buttons */}
      <div className={styles.gradingBar}>
        <button
          type="button"
          className={styles.btnGradingReview}
          onClick={handleMarkReview}
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
          onClick={handleFlip}
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
          onClick={handleMarkMastered}
          title={t("study.mastered")}
          aria-label={t("study.mastered")}
        >
          <CheckCircle2 size={18} />
          <span>{t("study.mastered")}</span>
          <span className={styles.shortcutPill}>2</span>
        </button>
      </div>

      {/* Navigation Controls Bar */}
      <div className={styles.controlsBar}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={handlePrev}
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
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
          title="Thẻ tiếp theo (Mũi tên phải)"
          aria-label="Next card"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Keyboard Shortcuts Hint Bar */}
      <div className={styles.keyboardGuide}>
        <span className={styles.kbdItem}>
          <kbd className={styles.kbd}>Space</kbd> Lật thẻ
        </span>
        <span className={styles.kbdItem}>
          <kbd className={styles.kbd}>←</kbd> <kbd className={styles.kbd}>→</kbd> Chuyển thẻ
        </span>
        <span className={styles.kbdItem}>
          <kbd className={styles.kbd}>1</kbd> Cần ôn
        </span>
        <span className={styles.kbdItem}>
          <kbd className={styles.kbd}>2</kbd> Đã nhớ
        </span>
        <span className={styles.kbdItem}>
          <kbd className={styles.kbd}>A</kbd> Phát âm
        </span>
        <span className={styles.kbdItem}>
          <kbd className={styles.kbd}>F</kbd> Toàn màn hình
        </span>
      </div>
    </div>
  );
};
