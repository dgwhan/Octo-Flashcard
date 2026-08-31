# Business Logic & Specifications — Octo Flashcard

> This document provides a high-level overview of the business rules and functional specifications for **Octo Flashcard**.
> It is written clearly so that developers, teammates, and reviewers can easily understand how the system works.

---

## 1. Authentication & Security

- **Login Required**: Users must log in with a valid account (JWT token) to perform any operations on Decks and Flashcards.
- **Personal Ownership**: Users can only manage (create, view, update, delete) Decks and Flashcards that belong to themselves.
- **Secure Owner Identity (`ownerId`)**: The owner's identity is automatically extracted from the authenticated JWT user context on the backend (`User.GetUserId()`). The frontend **never** passes `ownerId` in request bodies or parameters.

---

## 2. Deck & Flashcard Relationships

- **Ownership**: A Deck belongs to exactly one Owner (`User`).
- **Hierarchy**: A Deck contains a list of Flashcards. Every Flashcard belongs to exactly one Deck.
- **Lifecycle**: Flashcards do not exist independently outside of a Deck.
- **Cascade Deletion**: Deleting a Deck automatically deletes all Flashcards contained within that Deck.

---

## 3. Deck Visibility

- **Two Visibility Options**: A Deck can be set to **Public** or **Private**.
- **Default Value**: When creating a new Deck, the default visibility is **Public**.
- **Mutability**: Users can switch a Deck between Public and Private at any time when updating it.

---

## 4. Deck & Flashcard Creation Rules

- **Minimum 2 Cards Required**: Creating a new Deck requires providing **at least 2 Flashcards**.
- **Atomic Validation**: All Flashcards in a creation request must be valid (non-empty Term and Definition). If even a single Flashcard is invalid, the entire creation request fails atomically and no partial data is saved.
- **Subsequent Modifications**: After a Deck is created, the owner can add new Flashcards, update existing ones, or delete Flashcards at any time.

---

## 5. Flashcard Attributes & Terminology

- **Four Standard Fields per Flashcard**:
  1. **Term**: The vocabulary, phrase, or concept to learn.
  2. **TermLanguage**: The language of the Term (e.g., English).
  3. **Definition**: The meaning, explanation, or translation.
  4. **DefinitionLanguage**: The language of the Definition (e.g., Vietnamese, English).
- **No Front/Back Terminology**: The system strictly uses `Term` and `Definition` instead of legacy `front` or `back` concepts.
