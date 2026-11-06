"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import LanguageSwitcher from "@/src/components/layout/LanguageSwitcher";
import styles from "./LandingHeader.module.css";

export default function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    root.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Brand Logo */}
        <Link href={ROUTES.HOME} className={styles.brand}>
          <span>Octo Study</span>
        </Link>

        {/* Desktop Navigation Anchors */}
        <nav className={styles.navLinks} aria-label="Main Navigation">
          <a href="#features" className={styles.navLink}>
            Tính năng
          </a>
          <a href="#methodology" className={styles.navLink}>
            Phương pháp
          </a>
        </nav>

        {/* Action Area: Language Switcher & Dark/Light Switch Button */}
        <div className={styles.headerActions}>
          <LanguageSwitcher />

          {/* Theme Switch Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeToggleBtn}
            aria-label={theme === "dark" ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
            title={theme === "dark" ? "Giao diện Sáng" : "Giao diện Tối"}
          >
            {mounted && theme === "dark" ? (
              <Sun size={18} className={styles.themeIcon} />
            ) : (
              <Moon size={18} className={styles.themeIcon} />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Drawer */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawer} role="dialog" aria-label="Mobile Navigation">
          <a
            href="#features"
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tính năng
          </a>
          <a
            href="#methodology"
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Phương pháp
          </a>

          <div className={styles.mobileDrawerFooter}>
            <button
              type="button"
              onClick={toggleTheme}
              className={styles.mobileThemeToggleBtn}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === "dark" ? "Giao diện Sáng" : "Giao diện Tối"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
