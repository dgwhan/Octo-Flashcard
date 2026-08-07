# Architecture

> This document describes the current architectural direction of Octo Flashcard.
>
> The architecture will evolve as the project grows.
> This document should be updated whenever significant architectural decisions are made.

---

## Overview

Octo Flashcard is a full-stack web application consisting of three primary components.

```text
Frontend (Next.js)

↓

Backend (ASP.NET Core Web API)

↓

Database
```

The frontend and backend are developed independently and communicate through RESTful APIs.

---

## Technology Stack

### Backend

- ASP.NET Core (.NET 10)
- C#
- Entity Framework Core

### Frontend

- Next.js
- React
- TypeScript

### Database

- SQL Server (Current Provider)

---

## Current Architecture

### Backend

The backend currently follows a layered architecture.

```text
Controller -> Service -> DbContext -> Database
```

Business logic belongs to the Service layer.

---

### Frontend

The frontend follows a feature-based architecture using the Next.js App Router.

```text
app/

src/
    features/
    components/
    hooks/
    lib/
    utils/
```

The project structure may evolve as new features are introduced.

---

## Design Principles

Current architectural decisions are guided by the following principles.

- Separation of concerns
- Feature-based organization
- Maintainability
- Simplicity over unnecessary abstractions
- Clear layer boundaries

---

## Notes

This document intentionally focuses on high-level architecture.

Implementation details such as API conventions, authentication flow, folder organization, and coding standards are documented separately as the project evolves.