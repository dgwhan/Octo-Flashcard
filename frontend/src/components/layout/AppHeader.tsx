"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, LogOut, Menu, User, BookA } from "lucide-react";
import { authApi } from "@/src/features/auth/api/auth.api";
import { AuthModal } from "@/src/features/auth";
import { QuickLookupModal } from "@/src/features/dictionary";
import { ROUTES } from "@/src/config/routes";
import { useTranslation } from "@/src/i18n";
import { Button } from "@/src/components/ui";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

function useCurrentUser() {
  const userJson = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener("octo-auth-change", callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("octo-auth-change", callback);
      };
    },
    () => {
      const stored = authApi.getStoredUser();
      return stored ? JSON.stringify(stored) : "";
    },
    () => ""
  );

  return React.useMemo(() => {
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as { username: string; email: string };
    } catch {
      return null;
    }
  }, [userJson]);
}

export default function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDictModalOpen, setIsDictModalOpen] = useState(false);
  const user = useCurrentUser();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    authApi.logout();
    router.push(ROUTES.AUTH.LOGIN);
  };

  const handleAddFlashcardClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      router.push(ROUTES.FLASHCARDS_CREATE);
    }
  };

  return (
    <header className={styles.header}>
      {/* Left section: Hamburger button & Logo branding */}
      <div className={styles.leftSection}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu className={styles.headerIcon} />
        </button>

        <Link href={ROUTES.HOME} className={styles.brandLink}>
          <span className={styles.brandName}>Octo Flashcard</span>
        </Link>
      </div>

      {/* Center section: Search Bar */}
      <div className={styles.centerSection}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder={t("header.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right section: Action Buttons & User Menu */}
      <div className={styles.rightSection}>
        {/* Quick Dictionary Lookup Button */}
        <button
          type="button"
          onClick={() => setIsDictModalOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            borderRadius: "10px",
            background: "rgba(16, 185, 129, 0.1)",
            color: "var(--color-primary)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
          title="Tra từ điển nhanh"
        >
          <BookA size={16} />
          <span className="hidden sm:inline">Tra từ điển</span>
        </button>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* User Profile / Auth State */}
        {user ? (
          <div className={styles.userMenuContainer} ref={dropdownRef}>
            <button
              type="button"
              className={styles.avatarBtn}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-label={t("header.profile")}
            >
              <div className={styles.avatar}>
                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
              </div>
            </button>

            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{user.username}</div>
                  <div className={styles.userEmail}>{user.email}</div>
                </div>

                <div className={styles.dropdownDivider} />

                <button
                  type="button"
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>{t("header.logout")}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Button
              variant="outline"
              onClick={() => router.push(ROUTES.AUTH.LOGIN)}
              className={styles.loginBtn}
            >
              {t("header.login")}
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push(ROUTES.AUTH.REGISTER)}
              className={styles.registerBtn}
            >
              {t("header.register")}
            </Button>
          </div>
        )}
      </div>

      {/* Auth Modal for unauthenticated user */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title={t("auth.authRequiredTitle")}
        description={t("auth.authRequiredDesc")}
        redirectUrl={ROUTES.FLASHCARDS_CREATE}
      />

      {/* Global Quick Dictionary Lookup Modal */}
      <QuickLookupModal
        isOpen={isDictModalOpen}
        onClose={() => setIsDictModalOpen(false)}
      />
    </header>
  );
}
