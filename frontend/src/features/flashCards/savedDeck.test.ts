import { describe, expect, it, vi } from "vitest";
import { saveToDefaultDeck, SAVED_DECK_TITLE, SavedDeckApi } from "./savedDeck";
import type { FlashcardSet } from "@/src/types/flashCard";

function fakeApi(sets: FlashcardSet[]): SavedDeckApi {
  return {
    getAll: vi.fn(async () => sets),
    create: vi.fn(async (d) => ({ id: "new", title: d.title, createdAt: "", flashcards: [] })),
    addItem: vi.fn(async (setId, item) => ({ id: "x", ...item, flashcardSetId: setId })),
  };
}

describe("saveToDefaultDeck", () => {
  it("creates the deck on first save", async () => {
    const api = fakeApi([]);
    expect(await saveToDefaultDeck({ question: " cat ", answer: " con mèo " }, api)).toBe("created");
    expect(api.create).toHaveBeenCalledWith({
      title: SAVED_DECK_TITLE,
      flashcards: [{ question: "cat", answer: "con mèo" }],
    });
  });

  it("adds to the existing deck and skips case-insensitive duplicates", async () => {
    const deck = { id: "d", title: SAVED_DECK_TITLE, createdAt: "", flashcards: [{ id: "1", question: "Cat", answer: "" }] };
    const api = fakeApi([deck]);
    expect(await saveToDefaultDeck({ question: "cat", answer: "x" }, api)).toBe("duplicate");
    expect(await saveToDefaultDeck({ question: "dog", answer: "con chó" }, api)).toBe("added");
    expect(api.addItem).toHaveBeenCalledWith("d", { question: "dog", answer: "con chó" });
  });

  it("rejects an empty front", async () => {
    await expect(saveToDefaultDeck({ question: "  ", answer: "x" }, fakeApi([]))).rejects.toThrow();
  });
});
