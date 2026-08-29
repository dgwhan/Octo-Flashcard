"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/src/components/ui";
import { flashCardApi } from "../../api/flashCard.api";
import { FlashCardResponse } from "@/src/types/flashCard";
import styles from "./EditFlashCardModal.module.css";

export interface EditFlashCardModalProps {
    deckId: string;
    card: FlashCardResponse;
    onClose: () => void;
    onUpdated: (updatedCard: FlashCardResponse) => void;
}

export const EditFlashCardModal: React.FC<EditFlashCardModalProps> = ({
    deckId,
    card,
    onClose,
    onUpdated
}) => {
    const [term, setTerm] = useState(card.term);
    const [definition, setDefinition] = useState(card.definition);

    const [termError, setTermError] = useState<string | null>(null);
    const [definitionError, setDefinitionError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isSubmitting) onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isSubmitting, onClose]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let isValid = true;
        if (!term.trim()) {
            setTermError("Term is required.");
            isValid = false;
        }
        if (!definition.trim()) {
            setDefinitionError("Definition is required.");
            isValid = false;
        }

        if (!isValid) return;

        try {
            setIsSubmitting(true);
            setTermError(null);
            setDefinitionError(null);
            setGeneralError(null);

            const updated = await flashCardApi.update(deckId, card.id, {
                term: term.trim(),
                termLanguage: card.termLanguage || "English",
                definition: definition.trim(),
                definitionLanguage: card.definitionLanguage || "English"
            });

            onUpdated(updated);
            onClose();
        } catch (error) {
            if (error instanceof Error) {
                setGeneralError(error.message);
            } else {
                setGeneralError("Failed to update flashcard.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={styles.backdrop}
            onClick={(e) => e.target === e.currentTarget && !isSubmitting && onClose()}
        >
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>Edit Flashcard</h2>
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
                    {generalError && <p className={styles.errorMessage}>{generalError}</p>}

                    {/* Term */}
                    <div className={styles.formGroup}>
                        <label htmlFor="edit-term" className={styles.label}>
                            Term <span className={styles.required}>*</span>
                        </label>
                        <input
                            id="edit-term"
                            type="text"
                            className={`${styles.input} ${termError ? styles.inputError : ""}`}
                            value={term}
                            onChange={(e) => {
                                setTerm(e.target.value);
                                if (termError) setTermError(null);
                            }}
                            disabled={isSubmitting}
                            autoFocus
                        />
                        {termError && <p className={styles.errorMessage}>{termError}</p>}
                    </div>

                    {/* Definition */}
                    <div className={styles.formGroup}>
                        <label htmlFor="edit-definition" className={styles.label}>
                            Definition <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            id="edit-definition"
                            className={`${styles.textarea} ${definitionError ? styles.inputError : ""}`}
                            value={definition}
                            onChange={(e) => {
                                setDefinition(e.target.value);
                                if (definitionError) setDefinitionError(null);
                            }}
                            disabled={isSubmitting}
                        />
                        {definitionError && <p className={styles.errorMessage}>{definitionError}</p>}
                    </div>

                    {/* Footer Actions */}
                    <div className={styles.footer}>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" isLoading={isSubmitting} loadingText="Saving...">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
