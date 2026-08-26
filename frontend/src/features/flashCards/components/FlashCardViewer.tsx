"use client";

import { FlashCardResponse } from "@/src/types/flashCard";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./FlashCardViewer.module.css"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

export interface FlashCardViewerProps {
    cards: FlashCardResponse[];
}

export const FlashCardViewer: React.FC<FlashCardViewerProps> = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const totalCards = cards.length;
    const currentCard = cards[currentIndex];

    const handleNext = useCallback(() => {
        if (currentIndex < totalCards - 1) {
            setIsFlipped(false);
            setCurrentIndex((prev) => prev + 1)
        }
    }, [currentIndex, totalCards]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setCurrentIndex((prev) => prev - 1)
        }
    }, [currentIndex]);

    const handleFlip = useCallback(() => {
        setIsFlipped((prev) => !prev)
    }, []);

    //điều khiển phím tắt
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
                e.preventDefault()
                handleNext();
            } else if (e.code === "ArrowLeft") {
                e.preventDefault();
                handlePrev();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleFlip, handleNext, handlePrev]);

    if (!cards || cards.length === 0 || !currentCard) {
        return null;
    }

    const progressPercent = ((currentIndex + 1) / totalCards) * 100;

    return (
        <div className={styles.viewerContainer}>
            <div className={styles.progressWrapper} role="progressbar">
                <div
                    className={styles.progressBar}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div
                className={styles.cardScene}
                onClick={handleFlip}
                role="button"
                tabIndex={0}
                aria-label="Flashcard - Click or press Space to flip"
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleFlip();
                }}
            >
                <div
                    className={`${styles.cardInner} ${isFlipped ? styles.flipped : ""}`}
                >
                    {/* Mặt trước: Term */}
                    <div className={`${styles.cardFace} ${styles.cardFront}`}>
                        <div className={styles.faceHeader}>
                            <span className={styles.faceTag}>Term</span>
                            <span className={styles.languageBadge}>
                                {currentCard.termLanguage || "English"}
                            </span>
                        </div>
                        <div className={styles.faceBody}>
                            <p className={styles.faceText}>{currentCard.term}</p>
                        </div>
                        <div className={styles.faceFooter}>
                            <span className={styles.hintText}>
                                Click card or press Space to flip
                            </span>
                        </div>
                    </div>
                    {/* Mặt sau: Definition */}
                    <div className={`${styles.cardFace} ${styles.cardBack}`}>
                        <div className={styles.faceHeader}>
                            <span className={styles.faceTag}>Definition</span>
                            <span className={styles.languageBadge}>
                                {currentCard.definitionLanguage || "English"}
                            </span>
                        </div>
                        <div className={styles.faceBody}>
                            <p className={styles.faceText}>{currentCard.definition}</p>
                        </div>
                        <div className={styles.faceFooter}>
                            <span className={styles.hintText}>
                                Click card or press Space to flip
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Thanh điều khiển */}
            <div className={styles.controlsBar}>
                <button
                    type="button"
                    className={styles.controlBtn}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous card"
                    title="Previous card (Left Arrow)"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className={styles.navGroup}>
                    <button
                        type="button"
                        className={styles.controlBtn}
                        onClick={handleFlip}
                        aria-label="Flip card"
                        title="Flip card (Space)"
                    >
                        <RotateCw size={18} />
                    </button>
                    <span className={styles.counter}>
                        {currentIndex + 1} / {totalCards}
                    </span>
                </div>
                <button
                    type="button"
                    className={styles.controlBtn}
                    onClick={handleNext}
                    disabled={currentIndex === totalCards - 1}
                    aria-label="Next card"
                    title="Next card (Right Arrow)"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};