import type { Scenario } from "../types";

/** Lowercase and strip Vietnamese accents, so "thue nha" finds "Thuê nhà". */
export const foldText = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/đ/g, "d");

const words = (s: string) => foldText(s).split(/[^a-z0-9]+/).filter(Boolean);

/**
 * Scenarios at `level` ("" = all) where every query word starts a word of the Vietnamese or English text.
 * Matching word starts (not any substring) lets "phong" find "phỏng vấn" without "dat" matching "candidate".
 */
export function searchScenarios(list: Scenario[], level: Scenario["level"] | "", query: string): Scenario[] {
  const wanted = words(query);
  return list.filter((s) => {
    if (level && s.level !== level) return false;
    const text = words(`${s.title} ${s.goal} ${s.aiRole} ${s.learnerRole} ${s.learnerGoal}`);
    return wanted.every((w) => text.some((t) => t.startsWith(w)));
  });
}
