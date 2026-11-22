"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Layers,
  PlusCircle,
  X,
  Headphones,
  Volume2,
  Search,
  GraduationCap,
  MessageSquare,
  Compass,
  RotateCw,
  Flame,
  Mic,
  Settings,
  Map,
} from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { useTranslation } from "@/src/i18n";
import styles from "./AppSidebar.module.css";

interface AppSidebarProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Also active on sub-pages (e.g. /grammar/present-simple) */
  nested?: boolean;
}

interface NavGroup {
  /** No title for the first group: today's essentials */
  title?: string;
  items: NavItem[];
}

export default function AppSidebar({ isCollapsed = false, isMobileOpen = false, onCloseMobile }: AppSidebarProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const groups: NavGroup[] = [
    {
      items: [
        { label: t("nav.home"), href: ROUTES.HOME, icon: Home },
        { label: t("nav.review"), href: ROUTES.FLASHCARDS_REVIEW, icon: RotateCw },
        { label: t("nav.roadmap"), href: ROUTES.ROADMAP, icon: Map },
        { label: t("nav.progress"), href: ROUTES.PROGRESS, icon: Flame },
      ],
    },
    {
      title: t("nav.groupFlashcards"),
      items: [
        { label: t("nav.flashcards"), href: ROUTES.FLASHCARDS, icon: Layers, nested: true },
        { label: t("nav.createFlashcard"), href: ROUTES.FLASHCARDS_CREATE, icon: PlusCircle },
      ],
    },
    {
      title: t("nav.groupLearn"),
      items: [
        { label: t("nav.voa"), href: ROUTES.VOA, icon: Headphones, nested: true },
        { label: t("nav.vocabulary"), href: ROUTES.VOCABULARY, icon: GraduationCap },
        { label: t("nav.sentences"), href: ROUTES.SENTENCES, icon: MessageSquare },
        { label: t("nav.grammar"), href: ROUTES.GRAMMAR, icon: Compass, nested: true },
      ],
    },
    {
      title: t("nav.groupSpeak"),
      items: [
        { label: t("nav.speaking"), href: ROUTES.SPEAKING, icon: Mic, nested: true },
        { label: t("nav.ipa"), href: ROUTES.IPA, icon: Volume2 },
      ],
    },
    {
      title: t("nav.groupTools"),
      items: [{ label: t("nav.dictionary"), href: ROUTES.DICTIONARY, icon: Search }],
    },
  ];
  const settings: NavItem = { label: t("nav.settings"), href: ROUTES.SETTINGS, icon: Settings };

  // Exact match, or a sub-page of a "nested" section. /flashcards/create and /flashcards/review have their own items.
  const ownItems = new Set<string>([ROUTES.FLASHCARDS_CREATE, ROUTES.FLASHCARDS_REVIEW]);
  const isActive = ({ href, nested }: NavItem) =>
    pathname === href ||
    (href === ROUTES.HOME && pathname === "/home") ||
    (!!nested && pathname.startsWith(`${href}/`) && !ownItems.has(pathname));

  const renderItem = (item: NavItem) => {
    const active = isActive(item);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
        aria-current={active ? "page" : undefined}
        onClick={onCloseMobile}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon className={styles.navIcon} aria-hidden="true" />
        <span className={styles.navLabel}>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""} ${
        isMobileOpen ? styles.sidebarMobileOpen : ""
      }`}
    >
      {/* Mobile drawer header */}
      <div className={styles.mobileHeader}>
        <span className={styles.mobileTitle}>Octo Flashcard</span>
        {onCloseMobile && (
          <button type="button" className={styles.closeMobileBtn} onClick={onCloseMobile} aria-label="Đóng menu">
            <X className={styles.navIcon} aria-hidden="true" />
          </button>
        )}
      </div>

      <nav className={styles.nav} aria-label="Điều hướng chính">
        {groups.map((group, i) => (
          <div key={group.title ?? i} className={styles.group} role="group" aria-label={group.title}>
            {group.title && <p className={styles.groupTitle}>{group.title}</p>}
            {group.items.map(renderItem)}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>{renderItem(settings)}</div>
    </aside>
  );
}
