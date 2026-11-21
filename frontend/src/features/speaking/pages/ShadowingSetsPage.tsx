import Link from "next/link";
import { ROUTES } from "@/src/config/routes";
import { SHADOW_SETS } from "../data/shadowing.data";
import styles from "../speaking.module.css";

/** /speaking/shadowing: pick a sentence set. */
export default function ShadowingSetsPage() {
  return (
    <ul className={styles.setGrid}>
      {SHADOW_SETS.map((s) => (
        <li key={s.id}>
          <Link href={ROUTES.SPEAKING_SHADOWING_SET(s.id)} className={styles.setCard}>
            <span className={styles.setSource}>
              {s.source} · {s.level}
            </span>
            <span className={styles.setTitle}>{s.title}</span>
            <span className={styles.setCount}>{s.sentences.length} câu</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
