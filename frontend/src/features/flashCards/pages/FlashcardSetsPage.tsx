"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Layers,
  Plus,
  Search,
  Pencil,
  Trash2,
  Play,
  Lock,
  LogIn,
} from "lucide-react";
import { FlashcardSet } from "@/src/types/flashCard";
import { flashCardApi } from "../api/flashCard.api";
import { authApi } from "@/src/features/auth/api/auth.api";
import { useSignedIn } from "@/src/features/auth/hooks/useCurrentUser";
import { ROUTES } from "@/src/config/routes";
import { useTranslation } from "@/src/i18n";
import { EditFlashcardSetModal } from "../components/EditFlashcardSetModal";
import { SuckerRow } from "@/src/components/ui";
import { readMasteredCount } from "../lib/studyProgress";
import { dueCount } from "../lib/reviewQueue";
import styles from "./FlashcardSetsPage.module.css";

export const FlashcardSetsPage: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const signedIn = useSignedIn();
  const isAuthRequired = signedIn === false;

  // Edit / Add Items Modal state
  const [editingSet, setEditingSet] = useState<FlashcardSet | null>(null);
  const userId = typeof window !== "undefined" ? authApi.getStoredUser()?.userId : undefined;

  // 1. Kiểm tra đăng nhập và nạp danh sách bộ flashcard
  useEffect(() => {
    if (!signedIn) return;
    let isMounted = true;

    const loadSets = async () => {
      try {
        const data = await flashCardApi.getAll();
        if (isMounted) {
          setSets(data || []);
        }
      } catch {
        if (isMounted) setSets([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadSets();

    return () => {
      isMounted = false;
    };
  }, [signedIn]);

  // Filter sets by search query
  const filteredSets = useMemo(() => {
    if (!searchQuery.trim()) return sets;
    const q = searchQuery.toLowerCase();
    return sets.filter((s) => s.title.toLowerCase().includes(q));
  }, [sets, searchQuery]);

  // Total flashcards count across all sets
  const totalCardsCount = useMemo(() => {
    return sets.reduce((acc, s) => acc + (s.flashcards?.length || 0), 0);
  }, [sets]);

  const dueToday = useMemo(() => dueCount(sets), [sets]);

  // Handle Set updated from modal
  const handleSetUpdated = (updatedSet: FlashcardSet) => {
    setSets((prev) =>
      prev.map((s) => (s.id === updatedSet.id ? updatedSet : s))
    );
  };

  // Handle Delete Set
  const handleDeleteSet = async (id: string) => {
    if (!window.confirm(t("flashcards.deleteConfirm"))) {
      return;
    }

    try {
      await flashCardApi.delete(id);
      setSets((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert(t("flashcards.loadError"));
    }
  };

  // Trạng thái yêu cầu đăng nhập
  if (isAuthRequired) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.stateContainer}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary-light)",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lock size={32} />
          </div>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, margin: 0 }}>
            {t("auth.authRequiredTitle")}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "440px", margin: 0 }}>
            {t("auth.authRequiredDesc")}
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => router.push("/auth/login?redirect=/flashcards")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-inverse)",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              <LogIn size={18} />
              <span>{t("header.login")}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Trạng thái đang tải
  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.stateContainer}>
          <div className={styles.spinner} />
          <p style={{ color: "var(--color-text-secondary)" }}>
            {t("common.loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header Section */}
      <header className={styles.headerSection}>
        <div className={styles.headerTop}>
          <div className={styles.titleGroup}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowNum}>01</span>Flashcard
            </p>
            <h1 className={styles.pageTitle}>{t("flashcards.hubTitle")}</h1>
            <p className={styles.pageSubtitle}>
              {t("flashcards.hubSubtitle")}
            </p>
          </div>

          <Link href={ROUTES.FLASHCARDS_CREATE} className={styles.btnCreate}>
            <Plus size={18} />
            <span>{t("flashcards.createNewSet")}</span>
          </Link>
        </div>

        {/* Overview Metrics Row */}
        <div className={styles.metricsRow}>
          <div className={styles.metricCard}>
            <div>
              <div className={styles.metricValue}>{sets.length}</div>
              <div className={styles.metricLabel}>{t("flashcards.totalSets")}</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div>
              <div className={styles.metricValue}>{totalCardsCount}</div>
              <div className={styles.metricLabel}>{t("flashcards.totalCards")}</div>
            </div>
          </div>

          {totalCardsCount > 0 && (
            <Link href={ROUTES.FLASHCARDS_REVIEW} className={`${styles.metricCard} ${styles.metricLink}`}>
              <div>
                <div className={styles.metricValue}>{dueToday}</div>
                <div className={styles.metricLabel}>
                  Thẻ cần ôn hôm nay <span className={styles.metricCta}>Ôn ngay →</span>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Search & Filter Bar */}
        {sets.length > 0 && (
          <div className={styles.searchFilterBar}>
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={t("flashcards.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </header>

      {/* Grid Danh sách các bộ thẻ */}
      {sets.length === 0 ? (
        <div className={styles.emptyBox}>
          <div className={styles.emptyIconCircle}>
            <Layers size={32} />
          </div>
          <h3 className={styles.emptyTitle}>{t("flashcards.emptyTitle")}</h3>
          <p className={styles.emptyDesc}>
            {t("flashcards.emptyDesc")}
          </p>
          <Link href={ROUTES.FLASHCARDS_CREATE} className={styles.btnCreate}>
            <Plus size={18} />
            <span>{t("flashcards.createNewSet")}</span>
          </Link>
        </div>
      ) : filteredSets.length === 0 ? (
        <div className={styles.emptyBox}>
          <h3 className={styles.emptyTitle}>{t("flashcards.fetchEmpty")}</h3>
          <p className={styles.emptyDesc}>
            {searchQuery}
          </p>
          <button
            type="button"
            className={styles.btnCreate}
            onClick={() => setSearchQuery("")}
          >
            {t("common.all")}
          </button>
        </div>
      ) : (
        <div className={styles.setsGrid}>
          {filteredSets.map((set) => {
            const cardCount = set.flashcards?.length || 0;
            const previewCards = set.flashcards?.slice(0, 3) || [];
            const mastered = Math.min(readMasteredCount(userId, set.id), cardCount);

            return (
              <div key={set.id} className={styles.setCard}>
                <div className={styles.setCardBody}>
                  <div className={styles.setCardHeader}>
                    <span className={styles.cardCountBadge}>
                      {cardCount} {t("flashcards.cardsCount")}
                    </span>
                    {/* deck progress as 8 suckers: how much of the deck is already "mastered" in the study viewer */}
                    <span
                      className={styles.deckProgress}
                      aria-label={`Đã thuộc ${mastered}/${cardCount} thẻ`}
                      title={`Đã thuộc ${mastered}/${cardCount}`}
                    >
                      <SuckerRow count={8} filled={cardCount ? Math.round((mastered / cardCount) * 8) : 0} />
                    </span>
                  </div>

                  <h3 className={styles.setCardTitle}>{set.title}</h3>

                  {/* Preview 2-3 từ đầu tiên */}
                  {previewCards.length > 0 && (
                    <div className={styles.previewChips}>
                      {previewCards.map((c, i) => (
                        <span key={c.id || i} className={styles.previewChip}>
                          {c.question || c.term}
                        </span>
                      ))}
                      {cardCount > 3 && (
                        <span className={`${styles.previewChip} ${styles.previewMore}`}>
                          +{cardCount - 3} {t("flashcards.cardsCount")}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className={styles.setCardFooter}>
                  <Link
                    href={`/flashcards/${set.id}`}
                    className={styles.btnStudyQuick}
                    title={t("flashcards.studyNow")}
                  >
                    <Play size={15} />
                    <span>{t("flashcards.studyNow")}</span>
                  </Link>

                  <div className={styles.cardActionsGroup}>
                    <button
                      type="button"
                      className={styles.btnIconAction}
                      onClick={() => setEditingSet(set)}
                      title={t("flashcards.editSet")}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.btnIconAction} ${styles.btnDangerAction}`}
                      onClick={() => handleDeleteSet(set.id)}
                      title={t("flashcards.deleteSet")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Set & Add Items Modal */}
      {editingSet && (
        <EditFlashcardSetModal
          set={editingSet}
          isOpen={true}
          onClose={() => setEditingSet(null)}
          onUpdated={handleSetUpdated}
        />
      )}
    </div>
  );
};
