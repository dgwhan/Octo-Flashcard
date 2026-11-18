import type { CSSProperties } from "react";
import styles from "./SuckerRow.module.css";

/** Brand motif: a row of tentacle suckers shrinking toward the tip. `filled` = suckers already "grabbed" (progress). */
export default function SuckerRow({ count = 8, filled = 0, className = "" }: { count?: number; filled?: number; className?: string }) {
  return (
    <span className={`${styles.row} ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`${styles.sucker} ${i < filled ? styles.filled : ""}`}
          style={{ "--s": 1 - (i / count) * 0.6 } as CSSProperties}
        />
      ))}
    </span>
  );
}
