/**
 * Flashcard Type Definitions
 * Matched 1:1 with ASP.NET Core StudyFlowBackend Flashcard DTOs
 */

export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  flashcardSetId?: string;
  createdAt?: string;

  // Aliases for compatibility
  term?: string;
  definition?: string;
  termLanguage?: string;
  definitionLanguage?: string;
}

export interface FlashcardSet {
  id: string;
  title: string;
  targetDocumentId?: string | null;
  createdAt: string;
  flashcards: FlashcardItem[];
}

export interface CreateFlashcardItemRequest {
  question: string;
  answer: string;
  // Aliases
  term?: string;
  definition?: string;
  termLanguage?: string;
  definitionLanguage?: string;
}

export interface CreateFlashcardSetRequest {
  title: string;
  targetDocumentId?: string | null;
  flashcards: CreateFlashcardItemRequest[];
}

// Backwards compatibility alias
export type FlashCardResponse = FlashcardItem;
export type CreateFlashCardRequest = CreateFlashcardItemRequest;
export type UpdateFlashCardRequest = CreateFlashcardItemRequest;
