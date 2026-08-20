import { apiClient } from "@/src/lib/api";
import { CreateFlashCardRequest, FlashCardResponse, UpdateFlashCardRequest } from "@/src/types/flashCard";

export const flashCardApi = {
    async getAll(deckId: string): Promise<FlashCardResponse[]> {
        return apiClient<FlashCardResponse[]>(`/decks/${deckId}/flashcards`, {
            method: "GET"
        });
    },

    async create(deckId: string, data: CreateFlashCardRequest): Promise<FlashCardResponse> {
        return apiClient<FlashCardResponse>(`/decks/${deckId}/flashcards`, {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    async update(deckId: string, flashCardId: string, data: UpdateFlashCardRequest): Promise<FlashCardResponse> {
        return apiClient<FlashCardResponse>(`/decks/${deckId}/flashcards/${flashCardId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    },

    async delete(deckId: string, flashCardId: string): Promise<void> {
        return apiClient<void>(`/decks/${deckId}/flashcards/${flashCardId}`, {
            method: "DELETE"
        });
    }
};