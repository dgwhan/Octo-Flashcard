"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Library, X } from "lucide-react";
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

  const isNavActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/decks") {
      return pathname === "/decks" || pathname.startsWith("/decks/");
    }
    return pathname === href;
  };

  const navItems = [
    {
      label: "Explore",
      href: "/",
      icon: Home,
    },
    {
      label: "My Decks",
      href: "/decks",
      icon: Library,
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
