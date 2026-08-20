# Development Roadmap

> This document outlines the current development roadmap for Octo Flashcard.
>
> It reflects the project's priorities at the current stage and will evolve as the product grows.

---

## Current Stage

**Version:** MVP v0.1

**Status:** In Development

### Goal

Build a complete end-to-end flashcard learning workflow with a stable architecture that serves as the foundation for future development.

---

## MVP v0.1 Scope

The first milestone focuses on delivering the minimum set of features required for users to create and study flashcards.

### Backend

| Feature | Status |
|---------|--------|
| Authentication — Register, Login, JWT | Complete |
| Deck Management — CRUD | Complete |
| Request validation | Complete |
| Global exception handling | Complete |
| Entity Framework Core migrations | Complete |
| Flashcard Management — CRUD | Complete |
| Study Session API | Not started |

### Frontend

| Feature | Status |
|---------|--------|
| Project structure setup | In Progress |
| Authentication pages | Complete |
| Deck management interface | In Progress |
| Flashcard management interface | In Progress |
| Study interface | Not started |
| Responsive layout | Not started |
| API integration | Not started |

### Project Management

- GitHub Project & Issues tracking
- Documentation (`docs/`)

---

## Implementation Order

Development follows a backend-first, feature-complete approach.

```
Phase 1 — Auth (Backend - Done) → Auth UI
Phase 2 — Deck CRUD (Backend - Done) → Deck UI
Phase 3 — Flashcard CRUD (Backend - Not started) → Flashcard UI
Phase 4 — Study Session (Backend - Not started) → Study UI
```

Each phase is considered complete only when both the backend API and the frontend UI are integrated and working end-to-end.

---

## Out of Scope

The following features are intentionally excluded from MVP v0.1:

- AI-generated flashcards
- Search
- Folder organization
- Public libraries
- Progress tracking
- Learning statistics
- Notifications
- Mobile application
- Offline support
- Social features

These features will be evaluated after the MVP is completed.

---

## Success Criteria

MVP v0.1 is considered complete when:

- Users can register and log in successfully.
- Users can create, view, update, and delete Decks.
- Users can create, view, update, and delete Flashcards within a Deck.
- Users can complete a basic Study Session.
- Backend and frontend are fully integrated.
- The application is stable and deployable.

---

## Planning Principles

Development follows these principles:

- Complete one feature end-to-end before starting the next.
- Backend API must be ready before the corresponding frontend feature begins.
- Prioritize maintainability over rapid feature expansion.
- Deliver working software incrementally.
- Review priorities after each milestone.