"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Pencil, Plus, Layers, Lock, LogIn } from "lucide-react";
import { FlashcardSet } from "@/src/types/flashCard";
import { flashCardApi } from "../api/flashCard.api";
import { FlashCardViewer } from "../components/FlashCardViewer";
import { authApi } from "@/src/features/auth/api/auth.api";
import { ROUTES } from "@/src/config/routes";
import { useTranslation } from "@/src/i18n";
import { EditFlashcardSetModal } from "../components/actions/EditFlashcardSetModal";
import styles from "./FlashcardStudyDetailPage.module.css";

export const FlashcardStudyDetailPage: React.FC = () => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const params = useParams();
  const setId = (params?.id as string) || "";

  const [set, setSet] = useState<FlashcardSet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthRequired, setIsAuthRequired] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = authApi.getStoredToken();

    if (!token) {
      setIsAuthRequired(true);
      setIsLoading(false);
      return;
    }

    if (!setId) return;

    const loadSet = async () => {
      try {
        const data = await flashCardApi.getById(setId);
        if (isMounted) {
          setSet(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Không thể tải thông tin bộ Flashcard.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSet();

    return () => {
      isMounted = false;
    };
  }, [setId]);

  const handleSetUpdated = (updatedSet: FlashcardSet) => {
    setSet(updatedSet);
  };

  if (isAuthRequired) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loadingBox}>
          <Lock size={36} color="var(--color-primary)" />
          <h2>{t("auth.authRequiredTitle")}</h2>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {t("auth.authRequiredDesc")}
          </p>
          <button
            type="button"
            onClick={() => router.push(`/auth/login?redirect=/flashcards/${setId}`)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {t("header.login")}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loadingBox}>
          <div className={styles.spinner} />
          <p>{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !set) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loadingBox}>
          <h2>{t("flashcards.loadError")}</h2>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {error || t("flashcards.loadError")}
          </p>
          <Link
            href={ROUTES.FLASHCARDS}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {t("study.backToSets")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.headerSection}>
        <Link href={ROUTES.FLASHCARDS} className={styles.backBtn}>
          <ArrowLeft size={16} />
          <span>{t("study.backToSets")}</span>
        </Link>

        <div className={styles.headerSectionTop}>
          <div className={styles.titleArea}>
            <h1 className={styles.setTitle}>{set.title}</h1>
            <span className={styles.setMeta}>
              {set.flashcards.length} {t("flashcards.cardsCount")} • {t("flashcards.createdDate")}{" "}
              {new Date(set.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN")}
            </span>
          </div>

          <button
            type="button"
            className={styles.btnEditSet}
            onClick={() => setIsEditModalOpen(true)}
          >
            <Pencil size={15} />
            <span>{t("study.editSet")}</span>
          </button>
        </div>
      </header>

      {/* 2-Sided 3D Interactive Flashcard Viewer */}
      {set.flashcards.length > 0 ? (
        <section className={styles.viewerSection}>
          <FlashCardViewer
            cards={set.flashcards}
            deckId={set.id}
            deckTitle={set.title}
          />
        </section>
      ) : (
        <div className={styles.loadingBox}>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {t("study.noCardsNotice")}
          </p>
        </div>
      )}

      {/* Cards List in this Set */}
      <section className={styles.cardsListSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {t("study.cardListTitle")} ({set.flashcards.length})
          </h2>
        </div>

        <div className={styles.cardsGrid}>
          {set.flashcards.map((card, idx) => (
            <div key={card.id || idx} className={styles.cardRow}>
              <span className={styles.cardIndex}>{idx + 1}</span>
              <div className={styles.colQuestion}>
                {card.question || card.term}
              </div>
              <div className={styles.colAnswer}>
                {card.answer || card.definition}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditFlashcardSetModal
          set={set}
          isOpen={true}
          onClose={() => setIsEditModalOpen(false)}
          onUpdated={handleSetUpdated}
        />
      )}
    </div>
  );
};
