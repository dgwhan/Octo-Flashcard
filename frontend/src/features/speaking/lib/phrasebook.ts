/** The speaking phrasebook: phrases and corrected sentences saved from role-play feedback, kept apart from flashcards. */
import { apiClient } from "@/src/lib/api";
import { TOPICS } from "../data/scenarios";
import type { TopicId } from "../types";

export interface SavedPhrase {
  id: string;
  text: string;
  meaning: string;
  /** "phrase": a useful expression; "sentence": a better version of what the learner said */
  kind: "phrase" | "sentence";
  topic: TopicId | string;
  scenarioId: string;
  scenarioTitle: string;
  createdAt: string;
}

export type NewSavedPhrase = Omit<SavedPhrase, "id" | "createdAt">;

const BASE = "/speaking/phrases";

export const phrasebookApi = {
  list: () => apiClient.get<SavedPhrase[]>(BASE),
  /** `duplicate`: the same text was already in the phrasebook (case-insensitive). */
  save: (phrase: NewSavedPhrase) => apiClient.post<{ phrase: SavedPhrase; duplicate: boolean }>(BASE, phrase),
  remove: (id: string) => apiClient.delete<unknown>(`${BASE}/${id}`),
};

export interface TopicGroup {
  topic: string;
  label: string;
  items: SavedPhrase[];
}

/** Groups phrases by topic in TOPICS order; topics with no phrases are left out, unknown topics go last as "Khác". */
export function groupByTopic(items: SavedPhrase[]): TopicGroup[] {
  const known: TopicGroup[] = TOPICS.map((t) => ({ topic: t.id, label: t.label, items: items.filter((p) => p.topic === t.id) }));
  const other = items.filter((p) => !TOPICS.some((t) => t.id === p.topic));
  return [...known, { topic: "other", label: "Khác", items: other }].filter((g) => g.items.length > 0);
}
