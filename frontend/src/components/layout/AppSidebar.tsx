"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, PlusCircle, X, Headphones, Volume2, Search, GraduationCap, BookOpen, MessageSquare } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { useTranslation } from "@/src/i18n";
import styles from "./AppSidebar.module.css";

interface AppSidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AppSidebar({
  isCollapsed = false,
  isMobileOpen = false,
  onCloseMobile,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const isNavActive = (href: string) => {
    if (href === ROUTES.HOME) {
      return pathname === "/" || pathname === "/home";
    }
    if (href === ROUTES.FLASHCARDS) {
      return pathname === "/flashcards" || (pathname.startsWith("/flashcards/") && pathname !== "/flashcards/create");
    }
    if (href === ROUTES.FLASHCARDS_CREATE) {
      return pathname === "/flashcards/create";
    }
    if (href === ROUTES.VOA) {
      return pathname === "/voa" || pathname.startsWith("/voa/");
    }
    if (href === ROUTES.VOCABULARY) {
      return pathname === "/vocabulary";
    }
    if (href === ROUTES.AUDIOBOOKS) {
      return pathname === "/audiobooks" || pathname.startsWith("/audiobooks/");
    }
    if (href === ROUTES.TATOEBA) {
      return pathname === "/sentences";
    }
    if (href === ROUTES.IPA) {
      return pathname === "/ipa";
    }
    if (href === ROUTES.DICTIONARY) {
      return pathname === "/dictionary";
    }
    return pathname === href;
  };

  const navItems = [
    {
      label: t("nav.home"),
      href: ROUTES.HOME,
      icon: Home,
    },
    {
      label: t("nav.flashcards"),
      href: ROUTES.FLASHCARDS,
      icon: Layers,
    },
    {
      label: t("nav.createFlashcard"),
      href: ROUTES.FLASHCARDS_CREATE,
      icon: PlusCircle,
    },
    {
      label: t("nav.voa"),
      href: ROUTES.VOA,
      icon: Headphones,
    },
    {
      label: t("nav.vocabulary"),
      href: ROUTES.VOCABULARY,
      icon: GraduationCap,
    },
    {
      label: t("nav.audiobooks"),
      href: ROUTES.AUDIOBOOKS,
      icon: BookOpen,
    },
    {
      label: t("nav.sentences"),
      href: ROUTES.TATOEBA,
      icon: MessageSquare,
    },
    {
      label: t("nav.ipa"),
      href: ROUTES.IPA,
      icon: Volume2,
    },
    {
      label: t("nav.dictionary"),
      href: ROUTES.DICTIONARY,
      icon: Search,
    },
  ];

  return (
    <aside
      className={`${styles.sidebar} ${
        isCollapsed ? styles.sidebarCollapsed : ""
      } ${isMobileOpen ? styles.sidebarMobileOpen : ""}`}
    >
      {/* Mobile Close Button Header (only visible on mobile drawer) */}
      <div className={styles.mobileHeader}>
        <span className={styles.mobileTitle}>Octo Flashcard</span>
        {onCloseMobile && (
          <button
            type="button"
            className={styles.closeMobileBtn}
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <X className={styles.navIcon} />
          </button>
        )}
      </div>

      {/* Navigation list */}
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const active = isNavActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
              onClick={onCloseMobile}
              title={isCollapsed ? item.label : undefined}
            >
              {active && <div className={styles.activeIndicator} />}
              <div className={styles.iconWrapper}>
                <Icon className={styles.navIcon} />
              </div>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
