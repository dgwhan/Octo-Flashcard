"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Library,
  Layers,
  ArrowRight,
  User,
  Zap,
  Repeat,
} from "lucide-react";
import { DeckResponse } from "@/src/types/decks";
import { deckApi } from "@/src/features/decks/api/deck.api";
import { authApi } from "@/src/features/auth/api/auth.api";
import { AuthModal } from "@/src/features/auth";
import styles from "./page.module.css";

function useIsLoggedIn() {
  return React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => !!authApi.getStoredToken(),
    () => false
  );
}

export default function HomePage() {
  const router = useRouter();
  const [decks, setDecks] = useState<DeckResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectUrl, setAuthRedirectUrl] = useState("/decks");

  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    let isMounted = true;
    const token = authApi.getStoredToken();

    const loadDecks = async () => {
      if (!token) {
        if (isMounted) {
          setIsLoading(false);
          setDecks([]);
        }
        return;
      }

      try {
        const data = await deckApi.getAll();
        if (isMounted && Array.isArray(data)) {
          setDecks(data.slice(0, 6)); // Lấy tối đa 6 bộ thẻ gần nhất
        }
      } catch {
        if (isMounted) setDecks([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadDecks();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      setAuthRedirectUrl("/decks/create");
      setIsAuthModalOpen(true);
    } else {
      router.push("/decks/create");
    }
  };

  const handleMyDecksClick = () => {
    if (!isLoggedIn) {
      setAuthRedirectUrl("/decks");
      setIsAuthModalOpen(true);
    } else {
      router.push("/decks");
    }
  };

  return (
    <div className={styles.container}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Master Any Subject with <span className={styles.gradientText}>Octo Flashcard</span>
          </h1>

          <p className={styles.heroDescription}>
            Create interactive 3D flashcard decks, memorize faster with active recall,
            and boost your study performance effortlessly.
          </p>
        </div>

        <div className={styles.heroActions}>
          <button
            type="button"
            onClick={handleCreateClick}
            className={styles.primaryActionBtn}
          >
            <Plus size={18} />
            <span>Create Study Set</span>
          </button>

          <button
            type="button"
            onClick={handleMyDecksClick}
            className={styles.secondaryActionBtn}
          >
            <Library size={18} />
            <span>My Study Sets</span>
          </button>
        </div>
      </section>

      {/* 2. Feature Highlights */}
      <section className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <Layers size={20} />
          </div>
          <h3 className={styles.featureTitle}>3D Card Flip</h3>
          <p className={styles.featureDesc}>
            Smooth 3D card flipping animations with keyboard arrow shortcuts and spacebar flip.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <Zap size={20} />
          </div>
          <h3 className={styles.featureTitle}>Instant Search</h3>
          <p className={styles.featureDesc}>
            Quickly filter, search, and jump to any term or definition across your study sets.
          </p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper}>
            <Repeat size={20} />
          </div>
          <h3 className={styles.featureTitle}>Active Recall</h3>
          <p className={styles.featureDesc}>
            Scientifically proven study methods designed to retain knowledge for long-term mastery.
          </p>
        </div>
      </section>

      {/* 3. Study Sets Section */}
      <section className={styles.decksSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleGroup}>
            <h2 className={styles.sectionTitle}>Recent Study Sets</h2>
            <p className={styles.sectionSubtitle}>
              Pick up where you left off or explore new flashcard sets
            </p>
          </div>

          {isLoggedIn && decks.length > 0 && (
            <Link href="/decks" className={styles.viewAllLink}>
              <span>View all</span>
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className={styles.decksGrid}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={styles.deckItemCard}
                style={{ opacity: 0.6 }}
              >
                <div style={{ height: "20px", background: "var(--color-bg-subtle)", borderRadius: "6px" }} />
                <div style={{ height: "14px", background: "var(--color-bg-subtle)", borderRadius: "4px", width: "70%" }} />
              </div>
            ))}
          </div>
        ) : decks.length > 0 ? (
          <div className={styles.decksGrid}>
            {decks.map((deck) => (
              <Link
                key={deck.id}
                href={`/decks/${deck.id}`}
                className={styles.deckItemCard}
              >
                <div className={styles.deckCardHeader}>
                  <h3 className={styles.deckCardTitle}>{deck.name}</h3>
                  {deck.description && (
                    <p className={styles.deckCardDesc}>{deck.description}</p>
                  )}
                </div>

                <div className={styles.deckCardFooter}>
                  <div className={styles.authorGroup}>
                    <div className={styles.authorAvatar}>
                      {deck.ownerName ? deck.ownerName[0].toUpperCase() : <User size={12} />}
                    </div>
                    <span>{deck.ownerName || "Creator"}</span>
                  </div>

                  <span>
                    {new Date(deck.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>Ready to start learning?</h3>
            <p className={styles.emptyDesc}>
              {isLoggedIn
                ? "You haven't created any study sets yet. Click Create Study Set above to make your first deck!"
                : "Sign in to create, organize, and study your own flashcard decks."}
            </p>
            <button
              type="button"
              onClick={handleCreateClick}
              className={styles.primaryActionBtn}
              style={{ marginTop: "8px" }}
            >
              <Plus size={16} />
              <span>{isLoggedIn ? "Create Study Set" : "Sign In to Get Started"}</span>
            </button>
          </div>
        )}
      </section>

      {/* Auth Modal Popup khi chưa đăng nhập */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title="Login or Register to Continue"
        description="Login or create an account to start creating your Flashcard sets."
        redirectUrl={authRedirectUrl}
      />
    </div>
  );
}