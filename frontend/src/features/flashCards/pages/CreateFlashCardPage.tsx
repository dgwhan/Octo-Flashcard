"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Layers } from "lucide-react";
import { flashCardApi } from "../api/flashCard.api";
import { authApi } from "@/src/features/auth/api/auth.api";
import { ROUTES } from "@/src/config/routes";
import styles from "./CreateFlashCardPage.module.css";

interface CardInput {
  question: string;
  answer: string;
}

export const CreateFlashCardPage: React.FC = () => {
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const token = authApi.getStoredToken();
    if (!token) {
      router.push(`/auth/login?redirect=${encodeURIComponent(ROUTES.FLASHCARDS_CREATE)}`);
    }
  }, [router]);

  const [title, setTitle] = useState("");
  const [cards, setCards] = useState<CardInput[]>([
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCard = () => {
    setCards((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveCard = (index: number) => {
    if (cards.length <= 1) return;
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCardChange = (index: number, field: "question" | "answer", val: string) => {
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: val } : c))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bộ Flashcard.");
      return;
    }

    const validCards = cards.filter(
      (c) => c.question.trim() && c.answer.trim()
    );

    if (validCards.length === 0) {
      setError("Vui lòng nhập ít nhất 1 thẻ có đủ Câu hỏi (Thuật ngữ) và Câu trả lời (Định nghĩa).");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const created = await flashCardApi.create({
        title: title.trim(),
        flashcards: validCards,
      });

      router.push(`/flashcards?setId=${created.id}`);
    } catch (err: any) {
      setError(err?.message || "Không thể tạo bộ Flashcard. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.headerSection}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link
            href={ROUTES.FLASHCARDS}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--color-text-secondary)",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} />
            <span>Quay lại Flashcards</span>
          </Link>
          <h1 className={styles.pageTitle}>Tạo bộ Flashcard mới</h1>
        </div>
      </header>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "var(--color-danger-light)",
            color: "var(--color-danger)",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Title */}
        <div className={styles.formCard}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="flashcard-title">
              Tiêu đề bộ Flashcard *
            </label>
            <input
              id="flashcard-title"
              type="text"
              className={styles.fieldInput}
              placeholder="Ví dụ: Từ vựng Tiếng Anh chủ đề Du lịch..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Card Items */}
        <div className={styles.cardsSection}>
          {cards.map((card, idx) => (
            <div key={idx} className={styles.cardItemRow}>
              <div className={styles.cardItemHeader}>
                <span className={styles.cardItemIndex}>Thẻ số {idx + 1}</span>
                {cards.length > 1 && (
                  <button
                    type="button"
                    className={styles.btnDeleteCard}
                    onClick={() => handleRemoveCard(idx)}
                    title="Xóa thẻ này"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className={styles.cardFieldsGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    Mặt trước (Thuật ngữ / Câu hỏi)
                  </label>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    placeholder="Ví dụ: Departure"
                    value={card.question}
                    onChange={(e) =>
                      handleCardChange(idx, "question", e.target.value)
                    }
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    Mặt sau (Định nghĩa / Giải nghĩa)
                  </label>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    placeholder="Ví dụ: Sự khởi hành / Giờ bay"
                    value={card.answer}
                    onChange={(e) =>
                      handleCardChange(idx, "answer", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.btnAddCard}
            onClick={handleAddCard}
          >
            <Plus size={18} />
            <span>Thêm thẻ mới</span>
          </button>
        </div>

        {/* Actions */}
        <div className={styles.actionsBar}>
          <Link href={ROUTES.FLASHCARDS} className={styles.btnCancel}>
            Hủy
          </Link>
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={isSubmitting}
          >
            <Layers size={18} />
            <span>{isSubmitting ? "Đang tạo..." : "Hoàn tất & Tạo bộ thẻ"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
