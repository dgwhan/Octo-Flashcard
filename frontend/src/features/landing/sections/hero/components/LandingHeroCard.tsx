"use client";

import React, { useState } from "react";
import styles from "./LandingHeroCard.module.css";

interface CardData {
  term: string;
  ipa: string;
  partOfSpeech: string;
  description: string;
  example: string;
}

const DEFAULT_CARD: CardData = {
  term: "Serendipity",
  ipa: "/ˌser.ənˈdɪp.ə.ti/",
  partOfSpeech: "noun",
  description: "Finding valuable or pleasant things by chance in a happy and unexpected way.",
  example: "A fortunate stroke of serendipity brought the two together.",
};

export default function LandingHeroCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div className={styles.showcaseCol}>
      <div className={styles.cardStackContainer}>
        {/* Layer 1: Backmost Clean Flashcard in Stack */}
        <div className={styles.cardBack} aria-hidden="true" />

        {/* Layer 2: Middle Clean Flashcard in Stack */}
        <div className={styles.cardMid} aria-hidden="true" />

        {/* Layer 3: Interactive Front Flashcard */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Flashcard tiếng Anh. Nhấn để lật xem chi tiết."
          className={`${styles.cardFront} ${isFlipped ? styles.isFlipped : ""}`}
          onClick={handleCardClick}
          onKeyDown={handleKeyDown}
        >
          {/* Front Face: Term & Short English Description */}
          <div className={`${styles.cardFace} ${styles.faceFront}`}>
            <div className={styles.cardTop}>
              <span className={styles.termTitle}>{DEFAULT_CARD.term}</span>
              <span className={styles.termIpa}>{DEFAULT_CARD.ipa}</span>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.termDescription}>{DEFAULT_CARD.description}</p>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.cardHint}>Click to flip</span>
            </div>
          </div>

          {/* Back Face: Term & Example in English */}
          <div className={`${styles.cardFace} ${styles.faceBack}`}>
            <div className={styles.cardTop}>
              <span className={styles.termTitle}>{DEFAULT_CARD.term}</span>
              <span className={styles.termPos}>{DEFAULT_CARD.partOfSpeech}</span>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.exampleText}>&ldquo;{DEFAULT_CARD.example}&rdquo;</p>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.cardHint}>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
