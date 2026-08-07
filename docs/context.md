# Product Context

> This document defines the current product context for Octo Flashcard.
>
> It provides a shared understanding of the product's purpose, users, and current direction.
>
> As the project evolves, this document should be updated to reflect significant product decisions.

---

## Project Status

**Current Phase**

- MVP v0.1

**Current Focus**

- Establish a solid project foundation.
- Deliver a complete end-to-end flashcard learning workflow.
- Build a maintainable architecture for future development.

---

## Vision

Octo Flashcard is a modern flashcard learning platform designed to help learners study more effectively and improve long-term knowledge retention.

The platform focuses on creating a simple, intuitive, and structured learning experience through flashcards. Rather than serving only as a place to store information, Octo Flashcard encourages active learning, consistent review, and sustainable study habits.

---

## Target Users

Octo Flashcard is intended for learners who want a simple and effective way to organize and retain knowledge.

Primary users include:

- Students
- Language learners
- Self-learners
- Professionals preparing for certifications

The platform should remain accessible to beginners while being flexible enough for long-term learners.

---

## Current Scope

The current MVP focuses on delivering the core learning workflow.

Current features include:

- User Authentication
- Deck Management
- Flashcard Management
- Study Sessions

Future versions may introduce additional capabilities as the product evolves.

---

## Terminology

The following terms should be used consistently across the project.

| Term | Definition |
|------|------------|
| **Deck** | A named collection of flashcards created by a user. |
| **Flashcard** | A study item containing a front side and a back side. |
| **Study Session** | A learning session where users review flashcards within a deck. |
| **Library** | The page displaying all decks owned by the current user. It is a UI concept rather than a database entity. |

---

## User Journey

A typical learning flow:

```text
Register -> Login -> Open Library -> Create Deck -> Add Flashcards -> Study -> Review -> Repeat
```

The learning experience should minimize unnecessary actions and allow users to focus on learning.

---

## Current Technology Stack

### Backend

- ASP.NET Core (.NET 10)
- C#
- Entity Framework Core
- JWT Authentication

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Database

- SQL Server (Current Provider)
- Entity Framework Core Migrations

---

## Product Principles

Product decisions should be guided by the following principles.

- Keep the learning experience simple.
- Prioritize usability over complexity.
- Encourage consistent learning habits.
- Minimize unnecessary interactions.
- Build features that directly support learning.

---

## Scope

This document reflects the current scope of Octo Flashcard.

New features, workflows, or major architectural changes outside the current scope should be discussed and reviewed before implementation.

As the product evolves, this document should be updated to reflect those changes.

---

## Long-term Direction

Octo Flashcard aims to evolve into a scalable learning platform while maintaining a clean, intuitive, and maintainable user experience.

Future development should expand learning capabilities without compromising simplicity, usability, or maintainability.

---

This document intentionally focuses on the product rather than implementation details.

Architecture, coding conventions, and engineering decisions are documented separately and will evolve alongside the project.
Register -> Login -> Open Library -> Create Deck -> Add Flashcards -> Study -> Review -> Repeat
```

The learning experience should minimize unnecessary actions and allow users to focus on learning.

---

## Current Technology Stack

### Backend

- ASP.NET Core (.NET 10)
- C#
- Entity Framework Core
- JWT Authentication

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Database

- SQL Server (Current Provider)
- Entity Framework Core Migrations

---

## Product Principles

Product decisions should be guided by the following principles.

- Keep the learning experience simple.
- Prioritize usability over complexity.
- Encourage consistent learning habits.
- Minimize unnecessary interactions.
- Build features that directly support learning.

---

## Scope

This document reflects the current scope of Octo Flashcard.

New features, workflows, or major architectural changes outside the current scope should be discussed and reviewed before implementation.

As the product evolves, this document should be updated to reflect those changes.

---

## Long-term Direction

Octo Flashcard aims to evolve into a scalable learning platform while maintaining a clean, intuitive, and maintainable user experience.

Future development should expand learning capabilities without compromising simplicity, usability, or maintainability.

---

This document intentionally focuses on the product rather than implementation details.

Architecture, coding conventions, and engineering decisions are documented separately and will evolve alongside the project.