import { apiClient } from "@/src/lib/api";
import {
    CreateDeckRequest,
    CreateDeckResponse,
    DeckResponse,
    GetDeckResponse,
    UpdateDeckRequest
} from "@/src/types/decks";

export const deckApi = {
    async getAll(): Promise<DeckResponse[]> {
        return apiClient<DeckResponse[]>("/decks", {
            method: "GET"
        })
    },

    async getById(id: string): Promise<GetDeckResponse> {
        return apiClient<GetDeckResponse>(`/decks/${id}`, {
            method: "GET"
        })
    },

    async create(data: CreateDeckRequest): Promise<CreateDeckResponse> {
        return apiClient<CreateDeckResponse>("/decks/create", {
            method: "POST",
            body: JSON.stringify(data)
        })
    },

    async update(id: string, data: UpdateDeckRequest): Promise<GetDeckResponse> {
        return apiClient<GetDeckResponse>(`/decks/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        })
    },

    async delete(id: string): Promise<void> {
        return apiClient<void>(`/decks/${id}`, {
            method: "DELETE"
        })
    }

    
}