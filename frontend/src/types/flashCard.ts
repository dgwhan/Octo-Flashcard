export interface CreateFlashCardRequest{
    term: string;
    termLanguage: string;
    definition: string;
    definitionLanguage: string;
}

export interface UpdateFlashCardRequest {
    term: string;
    termLanguage: string;
    definition: string;
    definitionLanguage: string;
}

export interface FlashCardResponse {
    id: string;
    deckId: string;
    term: string;
    termLanguage: string;
    definition: string;
    definitionLanguage: string
    createAt: string;
    updateAt: string;
}