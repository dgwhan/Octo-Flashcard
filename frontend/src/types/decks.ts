export enum DeckVisibility {
    Private = "private",
    Public = "public",
}

export interface CreateDeckRequest {
    name: string;
    description?: string | null;
    visibility: DeckVisibility;
}

export interface UpdateDeckRequest {
    name: string;
    description?: string | null;
    visibility: DeckVisibility;
}

export interface CreateDeckResponse {
    id: string;
    name: string;
    description: string | null;
    visibility: DeckVisibility;
    createdAt: string;
}

export interface DeckResponse {
    id: string;
    ownerId: string;
    ownerName: string;
    name: string;
    description: string | null;
    visibility: DeckVisibility;
    createdAt: string;
    updatedAt?: string;
}

export interface GetDeckResponse {
    id: string;
    ownerId: string;
    ownerName: string;
    name: string;
    description: string | null;
    visibility: DeckVisibility;
    createdAt: string;
    updatedAt: string;
}