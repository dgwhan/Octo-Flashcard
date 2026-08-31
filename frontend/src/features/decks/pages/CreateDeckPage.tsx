"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { DeckVisibility } from "@/src/types/decks";
import { CreateFlashCardRequest } from "@/src/types/flashCard";
import { deckApi } from "../api/deck.api";
import { ApiError } from "@/src/lib/api";
import { FlashCardFormItem } from "@/src/features/flashCards";
import { ErrorMessage } from "@/src/components/ui";
import { DeckFormHeader } from "../components/DeckFormHeader";
import styles from "./CreateDeckPage.module.css";

const EMPTY_CARD: CreateFlashCardRequest = {
    term: "",
    definition: "",
    termLanguage: "English",
    definitionLanguage: "English",
};

import { authApi } from "@/src/features/auth/api/auth.api";

export const CreateDeckPage: React.FC = () => {
    const router = useRouter();

    React.useEffect(() => {
        const token = authApi.getStoredToken();
        if (!token) {
            router.push("/auth/login?redirect=/decks/create");
        }
    }, [router]);

    // Deck States
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const [visibility, setVisibility] = useState<DeckVisibility>(DeckVisibility.Public);

    // Cards State
    const [cards, setCards] = useState<CreateFlashCardRequest[]>([
        { ...EMPTY_CARD },
        { ...EMPTY_CARD },
    ]);

    // Validation & Loading States
    const [nameError, setNameError] = useState<string | null>(null);
    const [cardErrors, setCardErrors] = useState<
        Record<number, { term?: string; definition?: string }>
    >({});
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Card Handlers
    const handleAddCard = () => {
        setCards((prev) => [...prev, { ...EMPTY_CARD }]);
    };

    const handleRemoveCard = (index: number) => {
        if (cards.length <= 2) return;
        setCards((prev) => prev.filter((_, idx) => idx !== index));
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
        // Clear field error when user types
        if (cardErrors[index]?.[field as "term" | "definition"]) {
            setCardErrors((prev) => ({
                ...prev,
                [index]: {
                    ...prev[index],
                    [field]: undefined,
                },
            }));
        }
    };

    // Focus on first error element
    const focusFirstError = (targetId: string) => {
        setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
                element.focus();
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 50);
    };

    // Validation Function
    const validateForm = (): boolean => {
        let isValid = true;
        let firstErrorId: string | null = null;

        setNameError(null);
        setCardErrors({});
        setGeneralError(null);

        // 1. Validate Title / Deck Name
        const trimmedName = deckName.trim();
        if (!trimmedName) {
            setNameError("Title is required.");
            isValid = false;
            if (!firstErrorId) firstErrorId = "deck-name";
        } else if (trimmedName.length > 100) {
            setNameError("Title must not exceed 100 characters.");
            isValid = false;
            if (!firstErrorId) firstErrorId = "deck-name";
        }

        // 2. Validate Cards Count
        if (cards.length < 2) {
            setGeneralError("A study set must contain at least 2 flashcards.");
            isValid = false;
        }

        // 3. Validate Cards Fields
        const newCardErrors: Record<number, { term?: string; definition?: string }> = {};
        cards.forEach((card, index) => {
            const itemError: { term?: string; definition?: string } = {};
            if (!card.term.trim()) {
                itemError.term = "Term is required.";
                isValid = false;
                if (!firstErrorId) firstErrorId = `card-term-${index}`;
            }
            if (!card.definition.trim()) {
                itemError.definition = "Definition is required.";
                isValid = false;
                if (!firstErrorId) firstErrorId = `card-definition-${index}`;
            }

            if (Object.keys(itemError).length > 0) {
                newCardErrors[index] = itemError;
            }
        });

        setCardErrors(newCardErrors);

        if (!isValid && firstErrorId) {
            focusFirstError(firstErrorId);
        }

        return isValid;
    };

    // Submit Handler
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setGeneralError(null);

        try {
            await deckApi.create({
                name: deckName.trim(),
                description: deckDescription.trim() || undefined,
                visibility,
                flashCards: cards.map((c) => ({
                    term: c.term.trim(),
                    definition: c.definition.trim(),
                    termLanguage: c.termLanguage,
                    definitionLanguage: c.definitionLanguage,
                })),
            });

            router.push("/decks");
            router.refresh();
        } catch (err: unknown) {
            if (err instanceof ApiError) {
                const message = err.message || "Failed to create study set.";
                if (
                    message.toLowerCase().includes("exist") ||
                    message.toLowerCase().includes("already") ||
                    message.toLowerCase().includes("duplicate") ||
                    err.status === 409
                ) {
                    setNameError("A study set with this name already exists.");
                    focusFirstError("deck-name");
                } else {
                    setGeneralError(message);
                }
            } else if (err instanceof Error) {
                if (
                    err.message.toLowerCase().includes("exist") ||
                    err.message.toLowerCase().includes("already")
                ) {
                    setNameError("A study set with this name already exists.");
                    focusFirstError("deck-name");
                } else {
                    setGeneralError(err.message);
                }
            } else {
                setGeneralError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
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

            {/* General Error Message - No border, No background */}
            {generalError && (
                <div className={styles.generalErrorWrapper}>
                    <ErrorMessage message={generalError} />
                </div>
            )}

            {/* Deck Information Header */}
            <DeckFormHeader
                name={deckName}
                description={deckDescription}
                visibility={visibility}
                nameError={nameError}
                onNameChange={(val) => {
                    setDeckName(val);
                    if (nameError) setNameError(null);
                }}
                onDescriptionChange={setDeckDescription}
                onVisibilityChange={setVisibility}
            />

            {/* Flashcards List */}
            <section className={styles.flashcardsSection}>
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

export default CreateDeckPage;