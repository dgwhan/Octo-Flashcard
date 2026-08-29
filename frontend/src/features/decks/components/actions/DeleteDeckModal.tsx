"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui";
import { deckApi } from "../../api/deck.api";
import styles from "./DeleteDeckModal.module.css";

export interface DeleteDeckModalProps {
  deckId: string;
  deckName: string;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteDeckModal: React.FC<DeleteDeckModalProps> = ({
  deckId,
  deckName,
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
      await deckApi.delete(deckId);
      onDeleted();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete deck.");
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
      aria-labelledby="delete-deck-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="delete-deck-title" className={styles.title}>
            Delete Study Set
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
            Are you sure you want to delete <span className={styles.deckName}>&ldquo;{deckName}&rdquo;</span>? This action cannot be undone.
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
