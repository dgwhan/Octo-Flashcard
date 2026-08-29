"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreHorizontal,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { GetDeckResponse } from "@/src/types/decks";
import { FlashCardResponse } from "@/src/types/flashCard";
import { deckApi } from "../api/deck.api";
import {
  flashCardApi,
  FlashCardViewer,
  EditFlashCardModal,
  DeleteFlashCardModal,
} from "@/src/features/flashCards";
import { EditDeckModal } from "../components/actions/EditDeckModal";
import { DeleteDeckModal } from "../components/actions/DeleteDeckModal";
import styles from "./DeckDetailPage.module.css";

export interface DeckDetailPageProps {
  deckId: string;
}

export const DeckDetailPage: React.FC<DeckDetailPageProps> = ({ deckId }) => {
  const router = useRouter();

  const [deck, setDeck] = useState<GetDeckResponse | null>(null);
  const [flashCards, setFlashCards] = useState<FlashCardResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Deck level modals & menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditDeckOpen, setIsEditDeckOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Flashcard level modals & active menu
  const [activeCardMenuId, setActiveCardMenuId] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<FlashCardResponse | null>(null);
  const [deletingCard, setDeletingCard] = useState<FlashCardResponse | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleDeckUpdated = (updatedDeck: GetDeckResponse) => {
    setDeck(updatedDeck);
  };

  const handleCardUpdated = (updatedCard: FlashCardResponse) => {
    setFlashCards((prev) =>
      prev.map((c) => (c.id === updatedCard.id ? updatedCard : c))
    );
  };

  const handleCardDeleted = (deletedCardId: string) => {
    setFlashCards((prev) => prev.filter((c) => c.id !== deletedCardId));
    setDeletingCard(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }

      if (!target.closest(`.${styles.cardMenuWrapper}`)) {
        setActiveCardMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [deckId]);

  const handleRetry = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  if (isLoading) {
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
    const isAuthError =
      error?.includes("session has expired") ||
      error?.includes("not logged in") ||
      error?.includes("401");

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.errorState}>
          <h2 className={styles.errorTitle}>
            {isAuthError ? "Authentication Required" : "Deck Not Found"}
          </h2>
          <p className={styles.errorMsg}>
            {error || "Unable to find the requested deck."}
          </p>
          {isAuthError ? (
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() =>
                router.push(`/auth/login?redirect=/decks/${deckId}`)
              }
            >
              Log In to Continue
            </button>
          ) : (
            <button
              type="button"
              className={styles.retryBtn}
              onClick={handleRetry}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <header className={styles.headerSection}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.push("/decks")}
        >
          <ArrowLeft size={16} />
          <span>Back to Decks</span>
        </button>

        <div className={styles.headerSectionTop}>
          <h1 className={styles.deckTitle}>{deck.name}</h1>

          {/* Deck 3-dots Menu */}
          <div className={styles.menuWrapper} ref={menuRef}>
            <button
              type="button"
              className={`${styles.moreBtn} ${isMenuOpen ? styles.menuActive : ""}`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Options"
            >
              <MoreHorizontal size={18} />
            </button>

            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                {/* Edit Deck */}
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsEditDeckOpen(true);
                  }}
                >
                  <Pencil size={15} />
                  <span>Edit Set</span>
                </button>

                {/* Delete Deck */}
                <button
                  type="button"
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDeleteOpen(true);
                  }}
                >
                  <Trash2 size={15} />
                  <span>Delete Set</span>
                </button>
              </div>
            )}
          </div>
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

              {/* Nút 3 chấm dọc cho từng Flashcard */}
              <div className={styles.cardMenuWrapper}>
                <button
                  type="button"
                  className={`${styles.cardMenuBtn} ${
                    activeCardMenuId === card.id ? styles.menuActive : ""
                  }`}
                  onClick={() =>
                    setActiveCardMenuId(
                      activeCardMenuId === card.id ? null : card.id
                    )
                  }
                  title="Card options"
                  aria-label={`Options for card ${index + 1}`}
                >
                  <MoreVertical size={16} />
                </button>

                {activeCardMenuId === card.id && (
                  <div className={styles.cardDropdownMenu}>
                    <button
                      type="button"
                      className={styles.menuItem}
                      onClick={() => {
                        setActiveCardMenuId(null);
                        setEditingCard(card);
                      }}
                    >
                      <Pencil size={14} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.menuItem} ${styles.menuItemDanger}`}
                      onClick={() => {
                        setActiveCardMenuId(null);
                        setDeletingCard(card);
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Deck Info Modal */}
      {isEditDeckOpen && deck && (
        <EditDeckModal
          deckId={deckId}
          initialData={{
            name: deck.name,
            description: deck.description,
            visibility: deck.visibility,
          }}
          onClose={() => setIsEditDeckOpen(false)}
          onUpdated={handleDeckUpdated}
        />
      )}

      {/* Delete Deck Modal */}
      {isDeleteOpen && deck && (
        <DeleteDeckModal
          deckId={deckId}
          deckName={deck.name}
          onClose={() => setIsDeleteOpen(false)}
          onDeleted={() => {
            setIsDeleteOpen(false);
            router.push("/decks");
          }}
        />
      )}

      {/* Edit FlashCard Modal */}
      {editingCard && (
        <EditFlashCardModal
          key={editingCard.id}
          deckId={deckId}
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onUpdated={handleCardUpdated}
        />
      )}

      {/* Delete FlashCard Modal */}
      {deletingCard && (
        <DeleteFlashCardModal
          key={deletingCard.id}
          deckId={deckId}
          card={deletingCard}
          onClose={() => setDeletingCard(null)}
          onDeleted={handleCardDeleted}
        />
      )}
    </div>
  );
};
