"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { DeckVisibility } from "@/src/types/decks";
import { CreateFlashCardRequest } from "@/src/types/flashCard";
import { deckApi } from "../api/deck.api";
import { ApiError } from "@/src/lib/api";
import { FlashCardFormItem } from "@/src/features/flashCards";
import styles from "./CreateDeckPage.module.css";

const EMPTY_CARD: CreateFlashCardRequest = {
    term: "",
    definition: "",
    termLanguage: "English",
    definitionLanguage: "English",
};

const LANGUAGE_OPTIONS = [{ label: "English", value: "English" }];

export const CreateDeckPage: React.FC = () => {
    const router = useRouter();

    //Form States
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const [visibility, setVisibility] = useState<DeckVisibility>(DeckVisibility.Public);

    const [cards, setCards] = useState<CreateFlashCardRequest[]>([
        { ...EMPTY_CARD },
        { ...EMPTY_CARD },
    ]);

    //Error & Loading States
    const [nameError, setNameError] = useState<string | null>(null);
    const [cardErrors, setCardErrors] = useState<
        Record<number, { term?: string; definition?: string }>
    >({});
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //Card Handlers
    const handleAddCard = () => {
        setCards((prev) => [...prev, { ...EMPTY_CARD }]);
    };

    const handleRemoveCard = (index: number) => {
        if (cards.length <= 2) return;
        setCards((prev) => prev.filter((_, idx) => idx !== index));
        //Xóa lỗi tương ứng của thẻ bị xóa
        setCardErrors((prev) => {
            const next = { ...prev };
            delete next[index];
            return next;
        });
    };

    const handleCardChange = (
        index: number,
        field: keyof CreateFlashCardRequest,
        value: string
    ) => {
        setCards((prev) =>
            prev.map((card, idx) => (idx === index ? { ...card, [field]: value } : card))
        );
    };

    //Validation Function
    const validateForm = (): boolean => {
        let isValid = true;
        setNameError(null);
        setCardErrors({});
        setGeneralError(null);

        const trimmedName = deckName.trim();
        if (!trimmedName) {
            setNameError("Deck name is required.");
            isValid = false;
        } else if (trimmedName.length > 100) {
            setNameError("Deck name must not exceed 100 characters.");
            isValid = false;
        }

        if (cards.length < 2) {
            setGeneralError("Deck must contain at least 2 flashcards.");
            isValid = false;
        }

        const newCardErrors: Record<number, { term?: string; definition?: string }> = {};
        cards.forEach((card, index) => {
            const itemError: { term?: string; definition?: string } = {};
            if (!card.term.trim()) {
                itemError.term = "Term is required.";
                isValid = false;
            }
            if (!card.definition.trim()) {
                itemError.definition = "Definition is required.";
                isValid = false;
            }

            if (Object.keys(itemError).length > 0) {
                newCardErrors[index] = itemError;
            }
        });

        setCardErrors(newCardErrors);
        return isValid;
    };

    //Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            setGeneralError(null);

            await deckApi.create({
                name: deckName.trim(),
                description: deckDescription.trim() || null,
                visibility: visibility,
                flashCards: cards.map((card) => ({
                    term: card.term.trim(),
                    definition: card.definition.trim(),
                    termLanguage: card.termLanguage.trim(),
                    definitionLanguage: card.definitionLanguage.trim(),
                })),
            });

            //Thành công -> Điều hướng về danh sách Decks
            router.push("/decks");
            router.refresh();
        } catch (err: unknown) {
            let message = "Failed to create deck. Please try again.";

            if (err instanceof ApiError) {
                if (err.status === 401) {
                    message = "Your session has expired. Please log in again.";
                } else {
                    message = err.message || message;
                }
            } else if (err instanceof Error) {
                message = err.message;
            }

            setGeneralError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Sticky Top Bar with Title & Submit Button */}
            <div className={styles.topBar}>
                <h1 className={styles.pageTitle}>Create a new study set</h1>
                <button
                    type="button"
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className={styles.spinner} role="status" aria-label="Loading" />
                            <span>Creating...</span>
                        </>
                    ) : (
                        <span>Create</span>
                    )}
                </button>
            </div>

            {/* General Error Banner */}
            {generalError && <div className={styles.errorBanner}>{generalError}</div>}

            {/* Section 1: Deck Information */}
            <section className={styles.sectionCard}>
                <div className={styles.fieldGroup}>
                    <label htmlFor="deck-name" className={styles.label}>
                        Deck Name <span className={styles.required}>*</span>
                    </label>
                    <input
                        id="deck-name"
                        type="text"
                        className={`${styles.textInput} ${nameError ? styles.inputError : ""}`}
                        placeholder='e.g. English Vocabulary'
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                    />
                    {nameError && <span className={styles.fieldError}>{nameError}</span>}
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="deck-description" className={styles.label}>
                        Description
                    </label>
                    <textarea
                        id="deck-description"
                        className={styles.textareaInput}
                        placeholder="e.g. Daily English words (optional)"
                        value={deckDescription}
                        onChange={(e) => setDeckDescription(e.target.value)}
                        rows={2}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="deck-visibility" className={styles.label}>
                        Visibility
                    </label>
                    <select
                        id="deck-visibility"
                        className={styles.selectInput}
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value as DeckVisibility)}
                    >
                        <option value={DeckVisibility.Public}>Public (Everyone can see and study)</option>
                        <option value={DeckVisibility.Private}>Private (Only you can see)</option>
                    </select>
                </div>
            </section>

            {/* Section 2: Flashcards List */}
            <section className={styles.flashcardsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Cards</h2>
                    <span className={styles.cardCountBadge}>{cards.length} cards</span>
                </div>

                <div className={styles.cardList}>
                    {cards.map((card, index) => (
                        <FlashCardFormItem
                            key={index}
                            index={index}
                            card={card}
                            canDelete={cards.length > 2}
                            error={cardErrors[index]}
                            onChange={(field, value) => handleCardChange(index, field, value)}
                            onDelete={() => handleRemoveCard(index)}
                        />
                    ))}
                </div>

                {/* Add Card Button */}
                <button type="button" className={styles.addCardBtn} onClick={handleAddCard}>
                    <Plus size={18} />
                    <span>Add Card</span>
                </button>
            </section>
        </div>
    );
};