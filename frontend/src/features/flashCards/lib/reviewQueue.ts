import type { FlashcardSet, FlashcardItem } from "@/src/types/flashCard";
import { isDue } from "./srs";

export interface QueueItem {
  setId: string;
  setTitle: string;
  card: FlashcardItem;
}

/** Cap on never-reviewed cards per session so a big new deck doesn't flood the first day. */
export const NEW_PER_SESSION = 20;

/** Due cards across all decks: overdue first (oldest due first), then up to NEW_PER_SESSION new cards. */
export function buildQueue(sets: FlashcardSet[], now = new Date()): QueueItem[] {
  const all = sets.flatMap((s) => s.flashcards.map((card) => ({ setId: s.id, setTitle: s.title, card })));
  const due = all
    .filter((i) => i.card.due && isDue(i.card.due, now))
    .sort((a, b) => new Date(a.card.due!).getTime() - new Date(b.card.due!).getTime());
  const fresh = all.filter((i) => !i.card.due).slice(0, NEW_PER_SESSION);
  return [...due, ...fresh];
}

/** Soonest future due date (for "next review at…" when nothing is due now). */
export function nextDueAt(sets: FlashcardSet[], now = new Date()): Date | null {
  const times = sets
    .flatMap((s) => s.flashcards)
    .map((c) => (c.due ? new Date(c.due).getTime() : NaN))
    .filter((t) => t > now.getTime());
  return times.length ? new Date(Math.min(...times)) : null;
}

/** How many cards are waiting today (due + capped new). */
export const dueCount = (sets: FlashcardSet[], now = new Date()) => buildQueue(sets, now).length;
