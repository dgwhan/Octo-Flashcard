"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";
import { flipCard } from "@/src/lib/motion";
import styles from "./LandingHero.module.css";

/** The mascot card, flippable with the same signature motion the study viewer uses. */
export default function HeroCard() {
  const [flipped, setFlipped] = useState(false);
  const sceneRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const flip = () => {
    flipCard(innerRef.current, sceneRef.current, !flipped);
    setFlipped(!flipped);
  };

  return (
    <button
      ref={sceneRef}
      type="button"
      className={styles.stackFront}
      onClick={flip}
      aria-pressed={flipped}
      aria-label={flipped ? "Lật lại mặt trước" : "Lật thẻ để xem nghĩa của flashcard"}
    >
      <span ref={innerRef} className={`${styles.flipInner} ${flipped ? styles.flipped : ""}`}>
        <span className={`${styles.face} ${styles.faceFront}`}>
          <Image src="/mascot.png" alt="" width={206} height={262} priority className={styles.mascot} />
          <span className={styles.flipHint}>
            <RotateCw size={14} />
            Lật thẻ
          </span>
        </span>
        <span className={`${styles.face} ${styles.faceBack}`}>
          <span className={styles.cardWordLg}>flashcard</span>
          <span className={styles.cardIpa}>/ˈflæʃkɑːd/ · danh từ</span>
          <span className={styles.cardMeaningLg}>Thẻ ghi nhớ: mặt trước hỏi, mặt sau trả lời</span>
          <span className={styles.flipHint}>
            <RotateCw size={14} />
            Lật lại
          </span>
        </span>
      </span>
    </button>
  );
}
