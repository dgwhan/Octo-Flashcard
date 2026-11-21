"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, ArrowRight } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { AuthModal, useCurrentUser } from "@/src/features/auth";
import LanguageSwitcher from "@/src/components/layout/LanguageSwitcher";
import shared from "../../landing.module.css";
import styles from "./LandingHeader.module.css";

const NAV = [
  { href: "#modules", label: "8 module" },
  { href: "#sources", label: "Học liệu" },
  { href: "#method", label: "Phương pháp" },
];

export default function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const storedUser = useCurrentUser();

  const openLogin = () => {
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href={ROUTES.HOME} className={styles.brand}>
            <Image src="/octo-mascot.jpg" alt="" width={36} height={36} className={styles.brandMark} />
            <span>Octo Flashcard</span>
          </Link>

          <nav className={styles.navLinks} aria-label="Điều hướng trang">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={styles.navLink}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <LanguageSwitcher />
            {storedUser ? (
              <span className={styles.userName}>
                <User size={15} />
                {storedUser.username}
              </span>
            ) : (
              <button type="button" onClick={openLogin} className={`${shared.ghostBtn} ${styles.desktopOnly}`}>
                Đăng nhập
              </button>
            )}
            <Link href={ROUTES.FLASHCARDS} className={`${shared.primaryBtn} ${styles.desktopOnly}`}>
              <span>Vào học</span>
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={styles.mobileDrawer}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                {n.label}
              </a>
            ))}
            <div className={styles.mobileDrawerActions}>
              {!storedUser && (
                <button type="button" onClick={openLogin} className={shared.ghostBtn}>
                  Đăng nhập
                </button>
              )}
              <Link href={ROUTES.FLASHCARDS} className={shared.primaryBtn} onClick={() => setIsMobileMenuOpen(false)}>
                <span>Vào học</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} redirectUrl={ROUTES.FLASHCARDS} />
    </>
  );
}
