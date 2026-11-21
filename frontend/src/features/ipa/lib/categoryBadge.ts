import type { PhonemeCategory } from "../types";

/** Label and colours for a sound category tag. */
export function getCategoryBadge(category: PhonemeCategory) {
  switch (category) {
    case "monophthong_long":
      return { label: "Nguyên âm dài", color: "var(--color-primary)", bg: "var(--color-primary-light)" };
    case "monophthong_short":
      return { label: "Nguyên âm ngắn", color: "var(--color-info)", bg: "var(--color-info-light)" };
    case "diphthong":
      return { label: "Nguyên âm đôi", color: "var(--color-cefr-c1)", bg: "var(--color-cefr-c1-bg)" };
    case "consonant_unvoiced":
      return { label: "Vô thanh (bật hơi)", color: "var(--color-warning-hover)", bg: "var(--color-warning-light)" };
    case "consonant_voiced":
      return { label: "Hữu thanh (rung giọng)", color: "var(--color-cefr-c2)", bg: "var(--color-cefr-c2-bg)" };
  }
}
