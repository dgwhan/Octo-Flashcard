"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Globe, Lock, Calendar, User } from "lucide-react";
import { GetDeckResponse, DeckVisibility } from "@/src/types/decks";
import { FlashCardResponse } from "@/src/types/flashCard";
import { deckApi } from "../api/deck.api";
import { flashCardApi, FlashCardViewer } from "@/src/features/flashCards";
import styles from "./DeckDetailPage.module.css";

export interface DeckDetailPageProps {
  deckId: string;
}

export const DeckDetailPage: React.FC<DeckDetailPageProps> = ({ deckId }) => {
  const router = useRouter();

  const [deck, setDeck] = useState<GetDeckResponse | null>(null);
  const [flashCards, setFlashCards] = useState<FlashCardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [deckData, cardsData] = await Promise.all([
          deckApi.getById(deckId),
          flashCardApi.getAll(deckId),
        ]);

        if (isMounted) {
          setDeck(deckData);
          setFlashCards(cardsData || []);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Failed to load deck details.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [deckId]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      deckApi.getById(deckId),
      flashCardApi.getAll(deckId),
    ])
      .then(([deckData, cardsData]) => {
        setDeck(deckData);
        setFlashCards(cardsData || []);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load deck details.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loadingState}>
          <div className={styles.spinner} role="status" aria-label="Loading" />
          <p>Loading deck details...</p>
        </div>
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.errorState}>
          <h2 className={styles.errorTitle}>Deck Not Found</h2>
          <p className={styles.errorMsg}>
            {error || "Unable to find the requested deck."}
          </p>
          <button type="button" className={styles.retryBtn} onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isPrivate = deck.visibility === DeckVisibility.Private;

  return (
    <div className={styles.pageWrapper}>
      {/* Header & Meta Section */}
      <header className={styles.headerSection}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.push("/decks")}
        >
          <ArrowLeft size={16} />
          <span>Back to Decks</span>
        </button>

        <h1 className={styles.deckTitle}>{deck.name}</h1>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <User size={14} />
            <span className={styles.ownerBadge}>{deck.ownerName || "Unknown"}</span>
          </span>

          <span className={styles.metaItem}>
            <Calendar size={14} />
            <span>{new Date(deck.createdAt).toLocaleDateString()}</span>
          </span>

          <span className={styles.visibilityBadge}>
            {isPrivate ? <Lock size={12} /> : <Globe size={12} />}
            <span>{isPrivate ? "Private" : "Public"}</span>
          </span>

          <span className={styles.cardCountBadge}>
            {flashCards.length} {flashCards.length === 1 ? "card" : "cards"}
          </span>
        </div>

        {deck.description && (
          <p className={styles.deckDescription}>{deck.description}</p>
        )}
      </header>

      {/* Interactive Flashcard Viewer Section */}
      {flashCards.length > 0 && (
        <section className={styles.viewerSection}>
          <FlashCardViewer cards={flashCards} />
        </section>
      )}

      {/* Cards List Section */}
      <section className={styles.cardsListSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Cards in this set ({flashCards.length})
          </h2>
        </div>

        <div className={styles.cardsGrid}>
          {flashCards.map((card, index) => (
            <div key={card.id || index} className={styles.cardRow}>
              <div className={styles.cardIndex}>{index + 1}</div>

              <div className={styles.cardCol}>
                <span className={styles.colLabel}>
                  Term ({card.termLanguage || "English"})
                </span>
                <span className={styles.colValue}>{card.term}</span>
              </div>

              <div className={styles.cardCol}>
                <span className={styles.colLabel}>
                  Definition ({card.definitionLanguage || "English"})
                </span>
                <span className={styles.colValue}>{card.definition}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
