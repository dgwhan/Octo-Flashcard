"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

function useSidebarCollapsed() {
  const isCollapsedRaw = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => localStorage.getItem("sidebar_collapsed") || "false",
    () => "false"
  );
  return isCollapsedRaw === "true";
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  const storedIsCollapsed = useSidebarCollapsed();
  const [localCollapsed, setLocalCollapsed] = useState<boolean | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isCollapsed = localCollapsed !== null ? localCollapsed : storedIsCollapsed;

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 767) {
      setIsMobileOpen((prev) => !prev);
    } else {
      const nextState = !isCollapsed;
      localStorage.setItem("sidebar_collapsed", String(nextState));
      setLocalCollapsed(nextState);
    }
  };

  // Skip AppShell for auth pages (login/register)
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layoutWrapper}>
      {/* Full width header at top with toggle menu button */}
      <AppHeader onToggleSidebar={handleToggleSidebar} />

      <div className={styles.bodyContainer}>
        {/* Sidebar below header with open/collapsed states */}
        <AppSidebar
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        {/* Mobile backdrop overlay */}
        {isMobileOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        <main
          className={`${styles.mainContent} ${
            isCollapsed ? styles.mainContentCollapsed : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
