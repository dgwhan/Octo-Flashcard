"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlashCardResponse } from "@/src/types/flashCard";
import { authApi } from "@/src/features/auth/api/auth.api";
import { flipCard, dealCard, goldTick } from "@/src/lib/motion";
import { studyProgressKey } from "../lib/studyProgress";
import StudyAuthGuard from "./study/StudyAuthGuard";
import StudyComplete from "./study/StudyComplete";
import StudyToolbar from "./study/StudyToolbar";
import StudyProgress from "./study/StudyProgress";
import CardFace from "./study/CardFace";
import GradingBar from "./study/GradingBar";
import StudyNav from "./study/StudyNav";
import ShortcutGuide from "./study/ShortcutGuide";
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
  const storageKey = useMemo(() => studyProgressKey(currentUser?.userId, deckId), [currentUser?.userId, deckId]);

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

  // Flip card — only a user's flip animates; card changes reset to the front instantly
  const sceneRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const masteredPillRef = useRef<HTMLSpanElement>(null);

  const handleFlip = useCallback(() => {
    flipCard(innerRef.current, sceneRef.current, !isFlipped);
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  // Deal the next/previous card in from the direction of travel
  const prevIndexRef = useRef(currentIndex);
  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      dealCard(sceneRef.current, currentIndex > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  // Gold ring on the "mastered" counter when it goes up (never on first load)
  const prevMasteredRef = useRef(masteredIds.size);
  useEffect(() => {
    if (masteredIds.size > prevMasteredRef.current) goldTick(masteredPillRef.current);
    prevMasteredRef.current = masteredIds.size;
  }, [masteredIds.size]);

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
      <StudyAuthGuard redirectTarget={redirectTarget} />
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
      <StudyComplete
        masteredCount={masteredCount}
        reviewCount={reviewCount}
        accuracyRate={accuracyRate}
        totalCards={totalCards}
        onReviewWeak={handleReviewWeakCards}
        onRestart={handleRestartAll}
      />
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
      <StudyToolbar
        username={currentUser?.username}
        isShuffled={isShuffled}
        isReversed={isReversed}
        isFullscreen={isFullscreen}
        onShuffle={handleToggleShuffle}
        onReverse={handleToggleReverse}
        onFullscreen={handleToggleFullscreen}
      />

      {/* Progress Bar & Counters */}
      <StudyProgress
        masteredCount={masteredIds.size}
        reviewCount={reviewIds.size}
        currentIndex={currentIndex}
        totalCards={totalCards}
        progressPercent={progressPercent}
        pillRef={masteredPillRef}
      />

      {/* 3D Flippable Flashcard */}
      <div
        ref={sceneRef}
        className={styles.cardScene}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label="Thẻ ghi nhớ - Nhấp chuột hoặc bấm Phím Cách để lật mặt thẻ"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleFlip();
        }}
      >
        <div ref={innerRef} className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}>
          {/* MẶT TRƯỚC (Front Face) */}
          <CardFace tag={frontTagLabel} language={frontLanguage} text={frontText} isPlayingAudio={isPlayingAudio} onPronounce={handlePronounce} />

          <CardFace back tag={backTagLabel} language={backLanguage} text={backText} isPlayingAudio={isPlayingAudio} onPronounce={handlePronounce} />
        </div>
      </div>

      {/* Memory Assessment Action Buttons */}
      <GradingBar onReview={handleMarkReview} onFlip={handleFlip} onMastered={handleMarkMastered} />

      {/* Navigation Controls Bar */}
      <StudyNav currentIndex={currentIndex} totalCards={totalCards} onPrev={handlePrev} onNext={handleNext} />

      {/* Keyboard Shortcuts Hint Bar */}
      <ShortcutGuide />
    </div>
  );
};
