import type { ReactNode } from "react";
import { MODULES } from "@/src/config/modules";
import styles from "./ModulePage.module.css";

interface ModulePageProps {
  /** Module route; its 01–08 number comes from src/config/modules.ts. */
  href: string;
  eyebrow: string;
  title: string;
  lead: string;
  narrow?: boolean;
  children: ReactNode;
}

/** Shared page frame + header for the eight learning modules (server component). */
export default function ModulePage({ href, eyebrow, title, lead, narrow, children }: ModulePageProps) {
  const num = MODULES.find((m) => m.href === href)?.num;
  return (
    <div className={`${styles.page} ${narrow ? styles.narrow : ""}`}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          {num && <span className={styles.num}>{num}</span>}
          {eyebrow}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
      </header>
      {children}
    </div>
  );
}
