"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useTranslation, Locale } from "@/src/i18n";
import styles from "./LanguageSwitcher.module.css";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.switcherContainer} ref={containerRef}>
      <button
        type="button"
        className={styles.toggleBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chọn ngôn ngữ / Select language"
        title="Chuyển đổi ngôn ngữ / Change language"
      >
        <span className={styles.flagIcon}>{currentLang.flag}</span>
        <span className={styles.localeLabel}>{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={14} style={{ opacity: 0.7 }} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => {
            const isActive = lang.code === locale;
            return (
              <button
                key={lang.code}
                type="button"
                className={`${styles.optionItem} ${isActive ? styles.optionActive : ""}`}
                onClick={() => handleSelect(lang.code)}
              >
                <span className={styles.flagIcon}>{lang.flag}</span>
                <span>{lang.label}</span>
                {isActive && <Check size={14} className={styles.checkMark} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
