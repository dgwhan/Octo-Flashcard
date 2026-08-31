"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui";
import { FlashCardResponse } from "@/src/types/flashCard";
import { flashCardApi } from "../../api/flashCard.api";
import styles from "./DeleteFlashCardModal.module.css";

export interface DeleteFlashCardModalProps {
  deckId: string;
  card: FlashCardResponse;
  onClose: () => void;
  onDeleted: (cardId: string) => void;
}

export const DeleteFlashCardModal: React.FC<DeleteFlashCardModalProps> = ({
  deckId,
  card,
  onClose,
  onDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDeleting, onClose]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await flashCardApi.delete(deckId, card.id);
      onDeleted(card.id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete flashcard.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-card-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="delete-card-title" className={styles.title}>
            Delete Flashcard
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.message}>
            Are you sure you want to delete <span className={styles.cardTerm}>&ldquo;{card.term}&rdquo;</span>? This action cannot be undone.
          </p>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

        <div className={styles.footer}>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
            loadingText="Deleting..."
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
