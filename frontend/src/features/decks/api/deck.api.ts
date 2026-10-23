import { apiClient } from "@/src/lib/api";
import {
  CreateDeckRequest,
  CreateDeckResponse,
  DeckResponse,
  GetDeckResponse,
  UpdateDeckRequest,
} from "@/src/types/decks";

export const deckApi = {
  async getAll(): Promise<DeckResponse[]> {
    return apiClient.get<DeckResponse[]>("/decks");
  },

  async getById(id: string): Promise<GetDeckResponse> {
    return apiClient.get<GetDeckResponse>(`/decks/${id}`);
  },

  async create(data: CreateDeckRequest): Promise<CreateDeckResponse> {
    return apiClient.post<CreateDeckResponse>("/decks/create", data);
  },

  async update(id: string, data: UpdateDeckRequest): Promise<GetDeckResponse> {
    return apiClient.put<GetDeckResponse>(`/decks/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/decks/${id}`);
  },
};
