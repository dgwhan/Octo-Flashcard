"use client";

import React, { useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { CreateFlashCardRequest } from "@/src/types/flashCard";
import { ErrorMessage } from "@/src/components/ui";
import styles from "./FlashCardFormItem.module.css";

const LANGUAGE_OPTIONS = [{ label: "English", value: "English" }];

export interface FlashCardFormItemProps {
  index: number;
  card: CreateFlashCardRequest;
  canDelete: boolean;
  error?: {
    term?: string;
    definition?: string;
  };
  onChange: (field: keyof CreateFlashCardRequest, value: string) => void;
  onDelete: () => void;
}

export const FlashCardFormItem: React.FC<FlashCardFormItemProps> = ({
  index,
  card,
  canDelete,
  error,
  onChange,
  onDelete,
}) => {
  const termRef = useRef<HTMLTextAreaElement>(null);
  const definitionRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (element: HTMLTextAreaElement | null) => {
    if (!element) return;
    element.style.height = "44px";
    if (element.scrollHeight > 44) {
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize(termRef.current);
  }, [card.term]);

  useEffect(() => {
    autoResize(definitionRef.current);
  }, [card.definition]);

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof CreateFlashCardRequest
  ) => {
    autoResize(e.target);
    onChange(field, e.target.value);
  };

  return (
    <div className={styles.cardItem}>
      {/* Header: Số thứ tự thẻ & Nút xóa */}
      <div className={styles.cardHeader}>
        <span className={styles.cardNumber}>{index + 1}</span>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={onDelete}
          disabled={!canDelete}
          title={canDelete ? "Remove card" : "A deck requires at least 2 cards"}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>

      <div className={styles.cardGrid}>
        {/* Term Column */}
        <div className={styles.cardColumn}>
          <div className={styles.columnHeader}>
            <label htmlFor={`card-term-${index}`} className={styles.label}>
              Term <span className={styles.required}>*</span>
            </label>
            <select
              className={styles.languageSelect}
              value={card.termLanguage}
              onChange={(e) => onChange("termLanguage", e.target.value)}
              aria-label={`Language for term ${index + 1}`}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            ref={termRef}
            id={`card-term-${index}`}
            rows={1}
            className={`${styles.textareaInput} ${error?.term ? styles.inputError : ""}`}
            placeholder="e.g. Apple"
            value={card.term}
            onChange={(e) => handleTextareaChange(e, "term")}
          />
          <ErrorMessage message={error?.term} />
        </div>

        {/* Definition Column */}
        <div className={styles.cardColumn}>
          <div className={styles.columnHeader}>
            <label htmlFor={`card-definition-${index}`} className={styles.label}>
              Definition <span className={styles.required}>*</span>
            </label>
            <select
              className={styles.languageSelect}
              value={card.definitionLanguage}
              onChange={(e) => onChange("definitionLanguage", e.target.value)}
              aria-label={`Language for definition ${index + 1}`}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            ref={definitionRef}
            id={`card-definition-${index}`}
            rows={1}
            className={`${styles.textareaInput} ${error?.definition ? styles.inputError : ""}`}
            placeholder="e.g. A round red fruit"
            value={card.definition}
            onChange={(e) => handleTextareaChange(e, "definition")}
          />
          <ErrorMessage message={error?.definition} />
        </div>
      </div>
    </div>
  );
};
