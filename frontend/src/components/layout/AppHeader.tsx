"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, LogOut, Menu, User } from "lucide-react";
import { authApi } from "@/src/features/auth/api/auth.api";
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

function useCurrentUser() {
  const userJson = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    router.push("/auth/login");
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

        <Link href="/" className={styles.brandLink}>
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
            placeholder="Search decks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right section: Add deck action & User profile */}
      <div className={styles.rightSection}>
        <button type="button" className={styles.addDeckBtn} title="Add Deck">
          <Plus className={styles.headerIcon} />
          <span className={styles.addDeckText}>Add Deck</span>
        </button>

        <div className={styles.profileContainer} ref={dropdownRef}>
          <button
            type="button"
            className={styles.avatarBtn}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-label="User menu"
            aria-expanded={isDropdownOpen}
          >
            <User className={styles.avatarIcon} />
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {user ? (
                <>
                  <div className={styles.userInfo}>
                    <p className={styles.userName}>{user.username}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                  <button
                    type="button"
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                  >
                    <LogOut className={styles.logoutIcon} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className={styles.userInfo}>
                  <Link
                    href="/auth/login"
                    className={styles.logoutBtn}
                    style={{ color: "var(--color-primary)", fontWeight: 600 }}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span>Sign In</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
