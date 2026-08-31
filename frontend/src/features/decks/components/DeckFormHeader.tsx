"use client";

import React, { useRef, useEffect } from "react";
import styles from "./DeckFormHeader.module.css";
import { DeckVisibility } from "@/src/types/decks";
import { ErrorMessage } from "@/src/components/ui";

interface DeckFormHeaderProps {
    name: string;
    description: string;
    visibility: DeckVisibility;
    nameError?: string | null;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onVisibilityChange: (value: DeckVisibility) => void;
}

export const DeckFormHeader: React.FC<DeckFormHeaderProps> = ({
    name,
    description,
    visibility,
    nameError,
    onNameChange,
    onDescriptionChange,
    onVisibilityChange,
}) => {
    const descRef = useRef<HTMLTextAreaElement>(null);

    const autoResize = (element: HTMLTextAreaElement | null) => {
        if (!element) return;
        element.style.height = "44px";
        if (element.scrollHeight > 44) {
            element.style.height = `${element.scrollHeight}px`;
        }
    };

    useEffect(() => {
        autoResize(descRef.current);
    }, [description]);

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        autoResize(e.target);
        onDescriptionChange(e.target.value);
    };

    return (
        <section className={styles.sectionCard}>
            {/* Visibility */}
            <div className={styles.visibilityRow}>
                <div className={styles.fieldGroup}>
                    <label htmlFor="deck-visibility" className={styles.label}>
                        Visibility
                    </label>
                    <select
                        id="deck-visibility"
                        className={styles.selectInput}
                        value={visibility}
                        onChange={(e) => onVisibilityChange(e.target.value as DeckVisibility)}
                    >
                        <option value={DeckVisibility.Public}>Public (Everyone)</option>
                        <option value={DeckVisibility.Private}>Private (Only you)</option>
                    </select>
                </div>
            </div>

            {/* Title */}
            <div className={styles.fieldGroup}>
                <label htmlFor="deck-name" className={styles.label}>
                    Title <span className={styles.required}>*</span>
                </label>
                <input
                    id="deck-name"
                    type="text"
                    className={`${styles.textInput} ${nameError ? styles.inputError : ""}`}
                    placeholder='Enter a title, like "Biology - Chapter 22: Evolution"'
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
                <ErrorMessage message={nameError} />
            </div>

            {/* Description */}
            <div className={styles.fieldGroup}>
                <label htmlFor="deck-description" className={styles.label}>
                    Description
                </label>
                <textarea
                    ref={descRef}
                    id="deck-description"
                    className={styles.textareaInput}
                    placeholder="Add a description (optional)..."
                    value={description}
                    onChange={handleDescChange}
                    rows={1}
                />
            </div>
        </section>
    );
};

export default DeckFormHeader;
