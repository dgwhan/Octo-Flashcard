"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft, Layers } from "lucide-react";
import { flashCardApi } from "../api/flashCard.api";
import { authApi } from "@/src/features/auth/api/auth.api";
import { ROUTES } from "@/src/config/routes";
import { useTranslation } from "@/src/i18n";
import AiCardsPanel from "../components/AiCardsPanel";
import styles from "./CreateFlashCardPage.module.css";

const noSubscribe = () => () => {};

interface CardInput {
  question: string;
  answer: string;
}

export const CreateFlashCardPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

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

  // Pre-fill once from query params (e.g. from Dictionary or VOA lessons). The query string is read on the
  // client only (null while server-rendering), and state is adjusted during render instead of in an effect.
  const search = useSyncExternalStore(noSubscribe, () => window.location.search, () => null);
  const [prefilled, setPrefilled] = useState(false);
  if (search !== null && !prefilled) {
    setPrefilled(true);
    // Two link styles exist: ?word=&definition=&phonetic= (VOA, Dictionary) and ?front=&back= (Vocabulary)
    const params = new URLSearchParams(search);
    const word = params.get("word");
    const phonetic = params.get("phonetic");
    const front = params.get("front") || (word && phonetic ? `${word} [${phonetic}]` : word);
    const back = params.get("back") ?? params.get("definition") ?? "";
    if (front) {
      setTitle(`Từ vựng mới: ${word || front}`);
      setCards([
        { question: front, answer: back },
        { question: "", answer: "" },
      ]);
    }
  }

  const handleAddCard = () => {
    setCards((prev) => [...prev, { question: "", answer: "" }]);
  };

  // AI cards go after the ones the user already filled; empty rows are dropped
  const handleAiCards = (generated: CardInput[], sourceTitle?: string) => {
    setCards((prev) => [...prev.filter((c) => c.question.trim() || c.answer.trim()), ...generated]);
    setTitle((prev) => prev || sourceTitle || "Từ vựng do AI gợi ý");
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
      setError(t("createSet.validationTitle"));
      return;
    }

    const validCards = cards.filter(
      (c) => c.question.trim() && c.answer.trim()
    );

    if (validCards.length === 0) {
      setError(t("createSet.validationCardFields"));
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
    } catch (err) {
      setError((err instanceof Error && err.message) || t("common.error"));
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
            <span>{t("createSet.backBtn")}</span>
          </Link>
          <h1 className={styles.pageTitle}>{t("createSet.pageTitle")}</h1>
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

      <AiCardsPanel onCards={handleAiCards} />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Title */}
        <div className={styles.formCard}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="flashcard-title">
              {t("createSet.setTitleLabel")} *
            </label>
            <input
              id="flashcard-title"
              type="text"
              className={styles.fieldInput}
              placeholder={t("createSet.setTitlePlaceholder")}
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
                <span className={styles.cardItemIndex}>{t("study.cardCount", { current: idx + 1, total: cards.length })}</span>
                {cards.length > 1 && (
                  <button
                    type="button"
                    className={styles.btnDeleteCard}
                    onClick={() => handleRemoveCard(idx)}
                    title={t("common.delete")}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className={styles.cardFieldsGrid}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    {t("study.front")}
                  </label>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    placeholder={t("createSet.termPlaceholder")}
                    value={card.question}
                    onChange={(e) =>
                      handleCardChange(idx, "question", e.target.value)
                    }
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    {t("study.back")}
                  </label>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    placeholder={t("createSet.definitionPlaceholder")}
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
            <span>{t("createSet.addCardBtn")}</span>
          </button>
        </div>

        {/* Actions */}
        <div className={styles.actionsBar}>
          <Link href={ROUTES.FLASHCARDS} className={styles.btnCancel}>
            {t("common.cancel")}
          </Link>
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={isSubmitting}
          >
            <Layers size={18} />
            <span>{isSubmitting ? t("createSet.creating") : t("createSet.createSetBtn")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
