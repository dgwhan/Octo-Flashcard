import type { CSSProperties } from "react";
import styles from "./SuckerRow.module.css";

/**
 * Brand motif: a row of tentacle suckers shrinking toward the tip.
 * `filled` = suckers already "grabbed" (progress). `reveal` = pop in on scroll (decorative rows only).
 */
export default function SuckerRow({
  count = 8,
  filled = 0,
  reveal = false,
  className = "",
}: {
  count?: number;
  filled?: number;
  reveal?: boolean;
  className?: string;
}) {
  return (
    <span className={`${styles.row} ${reveal ? styles.reveal : ""} ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`${styles.sucker} ${i < filled ? styles.filled : ""}`}
          style={{ "--s": 1 - (i / count) * 0.6, "--i": i } as CSSProperties}
        />
      ))}
    </span>
  );
}
