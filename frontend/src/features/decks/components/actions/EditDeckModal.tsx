"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DeckVisibility, GetDeckResponse } from "@/src/types/decks";
import { Button } from "@/src/components/ui";
import { deckApi } from "../../api/deck.api";
import styles from "./EditDeckModal.module.css";

export interface EditDeckModalProps {
  deckId: string;
  initialData: {
    name: string;
    description?: string | null;
    visibility: DeckVisibility;
  };
  onClose: () => void;
  onUpdated: (updatedDeck: GetDeckResponse) => void;
}

export const EditDeckModal: React.FC<EditDeckModalProps> = ({
  deckId,
  initialData,
  onClose,
  onUpdated,
}) => {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description || "");
  const [visibility, setVisibility] = useState<DeckVisibility>(
    initialData.visibility
  );

  const [nameError, setNameError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitting, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError("Title is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setNameError(null);
      setGeneralError(null);

      const updated = await deckApi.update(deckId, {
        name: name.trim(),
        description: description.trim() || undefined,
        visibility,
      });

      onUpdated(updated);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError("Failed to update deck information.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-deck-title"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 id="edit-deck-title" className={styles.title}>
            Edit Study Set Info
          </h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {generalError && (
            <p className={styles.errorMessage}>{generalError}</p>
          )}

          {/* Title */}
          <div className={styles.formGroup}>
            <label htmlFor="edit-deck-name" className={styles.label}>
              Title <span className={styles.required}>*</span>
            </label>
            <input
              id="edit-deck-name"
              type="text"
              className={`${styles.input} ${nameError ? styles.inputError : ""}`}
              placeholder='Enter title, e.g. "Biology - Chapter 1"'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(null);
              }}
              disabled={isSubmitting}
              autoFocus
            />
            {nameError && <p className={styles.errorMessage}>{nameError}</p>}
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor="edit-deck-desc" className={styles.label}>
              Description
            </label>
            <textarea
              id="edit-deck-desc"
              className={styles.textarea}
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Visibility */}
          <div className={styles.formGroup}>
            <label htmlFor="edit-deck-visibility" className={styles.label}>
              Visibility
            </label>
            <select
              id="edit-deck-visibility"
              className={styles.select}
              value={visibility}
              onChange={(e) =>
                setVisibility(e.target.value as DeckVisibility)
              }
              disabled={isSubmitting}
            >
              <option value={DeckVisibility.Public}>Public (Everyone)</option>
              <option value={DeckVisibility.Private}>
                Private (Just you)
              </option>
            </select>
          </div>

          {/* Footer actions */}
          <div className={styles.footer}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              loadingText="Saving..."
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
