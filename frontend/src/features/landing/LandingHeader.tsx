"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  BookOpen,
  User,
  ArrowRight,
} from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { authApi } from "@/src/features/auth/api/auth.api";
import { AuthModal } from "@/src/features/auth";
import LanguageSwitcher from "@/src/components/layout/LanguageSwitcher";
import styles from "./landing.module.css";

export default function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const storedUser = typeof window !== "undefined" ? authApi.getStoredUser() : null;

  const openLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* Brand Logo */}
          <Link href={ROUTES.HOME} className={styles.brand}>
            <div className={styles.brandBadge}>
              <Layers size={20} />
            </div>
            <span>Octo Flashcard</span>
          </Link>

          {/* Desktop Navigation Anchors */}
          <nav className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>
              Tính năng
            </a>
            <a href="#sources" className={styles.navLink}>
              Học liệu mở
            </a>
            <a href="#methodology" className={styles.navLink}>
              Phương pháp
            </a>
            <Link href={ROUTES.VOCABULARY} className={styles.navLink}>
              Từ vựng CEFR
            </Link>
            <Link href={ROUTES.VOA} className={styles.navLink}>
              VOA English
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className={styles.headerActions}>
            <LanguageSwitcher />

            {storedUser ? (
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <User size={15} />
                {storedUser.username}
              </span>
            ) : (
              <button
                type="button"
                onClick={openLogin}
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Đăng nhập
              </button>
            )}

            {/* Prominent Console Redirection */}
            <Link href={ROUTES.FLASHCARDS} className={styles.consoleBtn} title="Truy cập khu vực học tập Console">
              <span>Vào Console</span>
              <ArrowRight size={16} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className={styles.mobileDrawer}>
            <a
              href="#features"
              className={styles.navLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tính năng nổi bật
            </a>
            <a
              href="#sources"
              className={styles.navLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Nguồn học liệu mở minh bạch
            </a>
            <a
              href="#methodology"
              className={styles.navLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Phương pháp khoa học não bộ
            </a>
            <Link
              href={ROUTES.VOCABULARY}
              className={styles.navLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Từ vựng chuẩn CEFR (A1-C2)
            </Link>
            <Link
              href={ROUTES.VOA}
              className={styles.navLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              VOA Learning English
            </Link>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
              {!storedUser && (
                <button
                  type="button"
                  onClick={openLogin}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-bg-alt)",
                    color: "var(--color-text-primary)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Đăng nhập
                </button>
              )}
              <Link
                href={ROUTES.FLASHCARDS}
                className={styles.consoleBtn}
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Vào Console</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
