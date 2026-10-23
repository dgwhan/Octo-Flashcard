"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Check, Layers } from "lucide-react";
import { FlashcardSet } from "@/src/types/flashCard";
import { flashCardApi } from "../../api/flashCard.api";
import styles from "./EditFlashcardSetModal.module.css";

export interface EditFlashcardSetModalProps {
  set: FlashcardSet;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updatedSet: FlashcardSet) => void;
}

interface NewCardItem {
  question: string;
  answer: string;
}

export const EditFlashcardSetModal: React.FC<EditFlashcardSetModalProps> = ({
  set,
  isOpen,
  onClose,
  onUpdated,
}) => {
  const [title, setTitle] = useState(set.title);
  const [newCards, setNewCards] = useState<NewCardItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(set.title);
      setNewCards([]);
      setError(null);
    }
  }, [isOpen, set]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSaving) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSaving, onClose]);

  if (!isOpen) return null;

  const handleAddNewCardField = () => {
    setNewCards((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveNewCardField = (index: number) => {
    setNewCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNewCardChange = (
    index: number,
    field: "question" | "answer",
    val: string
  ) => {
    setNewCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: val } : c))
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Tiêu đề bộ Flashcard không được để trống.");
      return;
    }

    const validNewCards = newCards.filter(
      (c) => c.question.trim() && c.answer.trim()
    );

    setIsSaving(true);
    setError(null);

    try {
      const updated = await flashCardApi.update(set.id, {
        title: title.trim(),
        newFlashcards: validNewCards,
      });

      onUpdated(updated);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Không thể cập nhật bộ Flashcard. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSaving) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Layers size={20} color="var(--color-primary)" />
            <h3 className={styles.modalTitle}>Chỉnh sửa bộ Flashcard</h3>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            disabled={isSaving}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <div className={styles.modalBody}>
            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: "var(--color-danger-light)",
                  color: "var(--color-danger)",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            {/* Set Title */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="edit-set-title">
                Tên bộ Flashcard *
              </label>
              <input
                id="edit-set-title"
                type="text"
                className={styles.fieldInput}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tên bộ Flashcard..."
                required
              />
            </div>

            {/* Add New Cards Section */}
            <div className={styles.sectionDivider}>
              <span className={styles.sectionTitle}>Thêm thẻ mới vào bộ</span>
              <button
                type="button"
                className={styles.btnAddItem}
                onClick={handleAddNewCardField}
              >
                <Plus size={15} />
                <span>Thêm thẻ</span>
              </button>
            </div>

            {newCards.length > 0 && (
              <div className={styles.newItemsList}>
                {newCards.map((card, idx) => (
                  <div key={idx} className={styles.newItemBox}>
                    <div className={styles.newItemHeader}>
                      <span>Thẻ mới #{idx + 1}</span>
                      <button
                        type="button"
                        className={styles.btnRemoveItem}
                        onClick={() => handleRemoveNewCardField(idx)}
                      >
                        Xóa
                      </button>
                    </div>

                    <div className={styles.gridTwo}>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        placeholder="Mặt trước (Thuật ngữ / Câu hỏi)..."
                        value={card.question}
                        onChange={(e) =>
                          handleNewCardChange(idx, "question", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        className={styles.fieldInput}
                        placeholder="Mặt sau (Định nghĩa / Đáp án)..."
                        value={card.answer}
                        onChange={(e) =>
                          handleNewCardChange(idx, "answer", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Existing Cards Preview */}
            <div className={styles.existingListSection}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className={styles.fieldLabel}>Các thẻ hiện có trong bộ</span>
                <span className={styles.existingCountBadge}>
                  {set.flashcards?.length || 0} thẻ
                </span>
              </div>

              <div className={styles.existingScrollBox}>
                {set.flashcards && set.flashcards.length > 0 ? (
                  set.flashcards.map((c, i) => (
                    <div key={c.id || i} className={styles.existingRow}>
                      <span className={styles.existingQ}>{c.question || c.term}</span>
                      <span className={styles.existingA}>{c.answer || c.definition}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", fontStyle: "italic" }}>
                    Chưa có thẻ nào trong bộ này.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
              disabled={isSaving}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={isSaving}
            >
              <Check size={16} />
              <span>{isSaving ? "Đang lưu..." : "Lưu thay đổi"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
