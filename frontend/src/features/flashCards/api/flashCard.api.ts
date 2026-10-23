import { apiClient } from "@/src/lib/api";
import {
  CreateFlashCardRequest,
  FlashCardResponse,
  UpdateFlashCardRequest,
} from "@/src/types/flashCard";

export const flashCardApi = {
  async getAll(deckId: string): Promise<FlashCardResponse[]> {
    return apiClient.get<FlashCardResponse[]>(`/decks/${deckId}/flashcards`);
  },

  async create(
    deckId: string,
    data: CreateFlashCardRequest
  ): Promise<FlashCardResponse> {
    return apiClient.post<FlashCardResponse>(`/decks/${deckId}/flashcards`, data);
  },

  async update(
    deckId: string,
    flashCardId: string,
    data: UpdateFlashCardRequest
  ): Promise<FlashCardResponse> {
    return apiClient.put<FlashCardResponse>(
      `/decks/${deckId}/flashcards/${flashCardId}`,
      data
    );
  },

  async delete(deckId: string, flashCardId: string): Promise<void> {
    return apiClient.delete<void>(`/decks/${deckId}/flashcards/${flashCardId}`);
  },
};
