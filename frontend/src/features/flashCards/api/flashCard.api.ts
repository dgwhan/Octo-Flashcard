import { apiClient } from "@/src/lib/api";
import { API_ENDPOINTS } from "@/src/config/routes";
import {
  CreateFlashcardSetRequest,
  FlashcardItem,
  FlashcardSet,
} from "@/src/types/flashCard";

export interface UpdateFlashcardSetPayload {
  title?: string;
  newFlashcards?: {
    question: string;
    answer: string;
  }[];
}

function normalizeCard(raw: any, setId?: string): FlashcardItem {
  const q = raw.question || raw.term || "";
  const a = raw.answer || raw.definition || "";
  return {
    id: raw.id || `card_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    question: q,
    answer: a,
    term: q,
    definition: a,
    flashcardSetId: raw.flashcardSetId || setId,
    createdAt: raw.createdAt || new Date().toISOString(),
    termLanguage: raw.termLanguage || "English",
    definitionLanguage: raw.definitionLanguage || "Vietnamese",
  };
}

function normalizeSet(raw: any): FlashcardSet {
  const rawCards = raw.flashcards || raw.flashCards || [];
  return {
    id: raw.id,
    title: raw.title || raw.name || "Untitled Set",
    targetDocumentId: raw.targetDocumentId || null,
    createdAt: raw.createdAt || new Date().toISOString(),
    flashcards: Array.isArray(rawCards)
      ? rawCards.map((c: any) => normalizeCard(c, raw.id))
      : [],
  };
}

export const flashCardApi = {
  /**
   * GET /api/flashcards
   * Returns all flashcard sets of current user
   */
  async getAll(): Promise<FlashcardSet[]> {
    const data = await apiClient.get<any[]>(API_ENDPOINTS.FLASHCARDS.GET_ALL);
    if (Array.isArray(data)) {
      return data.map(normalizeSet);
    }
    return [];
  },

  /**
   * GET /api/flashcards/{id}
   * Returns a specific flashcard set by id including all cards
   */
  async getById(id: string): Promise<FlashcardSet> {
    const data = await apiClient.get<any>(
      API_ENDPOINTS.FLASHCARDS.GET_BY_ID(id)
    );
    return normalizeSet(data);
  },

  /**
   * POST /api/flashcards
   * Creates a new flashcard set with cards
   */
  async create(data: CreateFlashcardSetRequest): Promise<FlashcardSet> {
    const payload = {
      title: data.title,
      targetDocumentId: data.targetDocumentId || null,
      flashcards: data.flashcards.map((c) => ({
        question: c.question || c.term || "",
        answer: c.answer || c.definition || "",
      })),
    };

    const created = await apiClient.post<any>(
      API_ENDPOINTS.FLASHCARDS.CREATE,
      payload
    );
    return normalizeSet(created);
  },

  /**
   * PUT /api/flashcards/{id}
   * Updates flashcard set title and/or adds new flashcards
   */
  async update(id: string, data: UpdateFlashcardSetPayload): Promise<FlashcardSet> {
    const payload = {
      title: data.title,
      newFlashcards: data.newFlashcards?.map((c) => ({
        question: c.question,
        answer: c.answer,
      })) || [],
    };

    const updated = await apiClient.put<any>(`/flashcards/${id}`, payload);
    return normalizeSet(updated);
  },

  /**
   * POST /api/flashcards/{id}/items
   * Adds a single flashcard item to an existing set
   */
  async addItem(setId: string, item: { question: string; answer: string }): Promise<FlashcardItem> {
    const res = await apiClient.post<any>(`/flashcards/${setId}/items`, {
      question: item.question,
      answer: item.answer,
    });
    return normalizeCard(res, setId);
  },

  /**
   * DELETE /api/flashcards/{id}
   * Deletes a flashcard set by id
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete<void>(API_ENDPOINTS.FLASHCARDS.DELETE(id));
  },
};
