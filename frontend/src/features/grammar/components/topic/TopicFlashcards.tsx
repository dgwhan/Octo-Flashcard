"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { SuckerRow } from "@/src/components/ui";
import { flipCard, dealCard } from "@/src/lib/motion";
import type { GrammarTopic } from "../../types";
import styles from "../../pages/GrammarTopicPage.module.css";

/** Flip-card deck for the topic's key forms. */
export default function TopicFlashcards({ cards }: { cards: GrammarTopic["review"]["flashcards"] }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const sceneRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const card = cards[currentCardIndex];

  const flip = () => {
    flipCard(innerRef.current, sceneRef.current, !isFlipped);
    setIsFlipped(!isFlipped);
  };
  const goCard = (dir: 1 | -1) => {
    setIsFlipped(false); // snap to front: never show the next card's back mid-turn
    setCurrentCardIndex((i) => (i + dir + cards.length) % cards.length);
    dealCard(sceneRef.current, dir);
  };

  if (!card) return null;
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>Thẻ ghi nhớ</h2>
      <div className={styles.deck}>
        <button
          ref={sceneRef}
          type="button"
          className={styles.flipScene}
          onClick={flip}
          aria-label={isFlipped ? "Lật về mặt câu hỏi" : "Lật thẻ để xem đáp án"}
          aria-pressed={isFlipped}
        >
          <span ref={innerRef} className={`${styles.flipInner} ${isFlipped ? styles.flipped : ""}`}>
            <span className={`${styles.face} ${styles.faceFront}`}>
              <span className={styles.faceTop}>
                Thẻ {currentCardIndex + 1}/{cards.length}
                <span className={styles.faceHint}>
                  <RotateCw size={13} /> Lật thẻ
                </span>
              </span>
              <span className={styles.faceText}>{card.front}</span>
              {card.hint && <span className={styles.faceSub}>Gợi ý: {card.hint}</span>}
            </span>
            <span className={`${styles.face} ${styles.faceBack}`}>
              <span className={styles.faceTop}>
                Đáp án
                <span className={styles.faceHint}>
                  <RotateCw size={13} /> Lật lại
                </span>
              </span>
              <span className={styles.faceText}>{card.back}</span>
            </span>
          </span>
        </button>
        <div className={styles.deckNav}>
          <button type="button" className={styles.ghostBtn} onClick={() => goCard(-1)}>
            <ChevronLeft size={16} /> Thẻ trước
          </button>
          <SuckerRow count={cards.length} filled={currentCardIndex + 1} />
          <button type="button" className={styles.ghostBtn} onClick={() => goCard(1)}>
            Thẻ sau <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
