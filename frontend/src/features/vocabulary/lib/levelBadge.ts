import type { CEFRLevel } from "../types";

/** Colours and label for a CEFR level tag. */
export function getLevelBadge(level: CEFRLevel) {
  switch (level) {
    case "A1":
      return { bg: "var(--color-cefr-a1-bg)", color: "var(--color-cefr-a1)", desc: "A1 • Sơ cấp khởi đầu" };
    case "A2":
      return { bg: "var(--color-cefr-a2-bg)", color: "var(--color-cefr-a2)", desc: "A2 • Sơ cấp mở rộng" };
    case "B1":
      return { bg: "var(--color-cefr-b1-bg)", color: "var(--color-cefr-b1)", desc: "B1 • Trung cấp cơ bản" };
    case "B2":
      return { bg: "var(--color-cefr-b2-bg)", color: "var(--color-cefr-b2)", desc: "B2 • Trung cấp nâng cao" };
    case "C1":
      return { bg: "var(--color-cefr-c1-bg)", color: "var(--color-cefr-c1)", desc: "C1 • Cao cấp học thuật" };
    case "C2":
      return { bg: "var(--color-cefr-c2-bg)", color: "var(--color-cefr-c2)", desc: "C2 • Thành thạo bản ngữ" };
  }
}
