import type { FlashcardSet, FlashcardItem, CreateFlashcardSetRequest } from "@/src/types/flashCard";

/** One default deck collects everything saved from VOA, Dictionary, Sentences, Vocabulary… */
export const SAVED_DECK_TITLE = "Từ đã lưu";

export interface SavedDeckApi {
  getAll(): Promise<FlashcardSet[]>;
  create(data: CreateFlashcardSetRequest): Promise<FlashcardSet>;
  addItem(setId: string, item: { question: string; answer: string }): Promise<FlashcardItem>;
}

export type SaveResult = "created" | "added" | "duplicate";

const norm = (s: string) => s.trim().toLowerCase();

/** Add a card to the "Từ đã lưu" deck, creating the deck on first use; skips exact duplicates. */
export async function saveToDefaultDeck(card: { question: string; answer: string }, api: SavedDeckApi): Promise<SaveResult> {
  const question = card.question.trim();
  if (!question) throw new Error("Thẻ cần có mặt trước.");
  const item = { question, answer: card.answer.trim() };

  const deck = (await api.getAll()).find((s) => s.title === SAVED_DECK_TITLE);
  if (!deck) {
    await api.create({ title: SAVED_DECK_TITLE, flashcards: [item] });
    return "created";
  }
  if (deck.flashcards.some((c) => norm(c.question) === norm(question))) return "duplicate";
  await api.addItem(deck.id, item);
  return "added";
}
