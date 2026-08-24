"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { CreateFlashCardRequest } from "@/src/types/flashCard";
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
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Term <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={`${styles.textInput} ${error?.term ? styles.inputError : ""}`}
              placeholder="e.g. Apple"
              value={card.term}
              onChange={(e) => onChange("term", e.target.value)}
            />
            {error?.term && <span className={styles.fieldError}>{error.term}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Language</label>
            <select
              className={styles.selectInput}
              value={card.termLanguage}
              onChange={(e) => onChange("termLanguage", e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Definition Column */}
        <div className={styles.cardColumn}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Definition <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={`${styles.textInput} ${error?.definition ? styles.inputError : ""}`}
              placeholder="e.g. A round red fruit"
              value={card.definition}
              onChange={(e) => onChange("definition", e.target.value)}
            />
            {error?.definition && (
              <span className={styles.fieldError}>{error.definition}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Language</label>
            <select
              className={styles.selectInput}
              value={card.definitionLanguage}
              onChange={(e) => onChange("definitionLanguage", e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
