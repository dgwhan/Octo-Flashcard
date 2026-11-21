import Link from "next/link";
import { MODULES } from "@/src/config/modules";
import styles from "./LandingFooter.module.css";

const SOURCE_LINKS = [
  { label: "VOA Learning English", href: "https://learningenglish.voanews.com" },
  { label: "Internet Archive", href: "https://archive.org" },
  { label: "Free Dictionary API", href: "https://dictionaryapi.dev" },
  { label: "Datamuse", href: "https://www.datamuse.com/api" },
];

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>Octo Flashcard</span>
          <p>Dự án học tiếng Anh phi lợi nhuận, dựng trên học liệu mở.</p>
        </div>

        <nav aria-label="Module">
          <h2 className={styles.footerColTitle}>Module</h2>
          <ul className={styles.footerList}>
            {MODULES.map((m) => (
              <li key={m.num}>
                <Link href={m.href} className={styles.footerLink}>
                  <span className={styles.footerNum}>{m.num}</span> {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Nguồn học liệu">
          <h2 className={styles.footerColTitle}>Nguồn</h2>
          <ul className={styles.footerList}>
            {SOURCE_LINKS.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className={styles.footerLink}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className={styles.footerBottom}>© {new Date().getFullYear()} Octo Flashcard</p>
    </footer>
  );
}
