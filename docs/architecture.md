# Architecture — Octo Flashcard

> This document describes the system architecture, component breakdown, data flow, and technical design decisions of **Octo Flashcard**.

---

## 1. System Overview

Octo Flashcard is a modern full-stack web application dedicated to smart English learning, vocabulary acquisition via flashcards, interactive phonetics (IPA), level-based reading & listening comprehension, and comprehensive dictionary lookups.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                                │
│   Next.js 16 (App Router + Turbopack) + React 19 + TypeScript + i18n   │
└──────────────┬──────────────────────────────────┬──────────────────────┘
               │                                  │
    (Client API Requests)             (Server Route Handlers)
               │                                  │
               ▼                                  ▼
┌──────────────────────────────┐   ┌─────────────────────────────────────┐
│  ASP.NET Core Web API        │   │  Next.js Server Proxy Handler       │
│  (.NET 10, C#, Rate Limiter) │   │  (/api/dictionary -> External API)  │
└──────────────┬───────────────┘   └──────────────────┬──────────────────┘
               │                                      │
               ▼                                      ▼
┌──────────────────────────────┐   ┌─────────────────────────────────────┐
│  Database (EF Core / SQLite) │   │  Public APIs & Free Media CDNs      │
│  (Users, Flashcard Sets)     │   │  (Free Dictionary API, Wikimedia)   │
└──────────────────────────────┘   └─────────────────────────────────────┘
```

The frontend and backend are decoupled and communicate through standard RESTful APIs with JSON payloads, protected by JWT authentication and rate limiting.

---

## 2. Technology Stack

### Backend
- **Framework**: ASP.NET Core (.NET 10)
- **Language**: C# 13
- **ORM**: Entity Framework Core
- **Database**: SQLite / SQL Server
- **Security**: JWT Bearer Authentication, Rate Limiting Policies, Password Hashing
- **API Architecture**: Controller-Service-Repository pattern with standardized `ApiResponse<T>` envelopes

### Frontend
- **Framework**: Next.js 16 (App Router with Turbopack)
- **Library**: React 19
- **Language**: TypeScript 5
- **Styling**: CSS Modules, Modern CSS Variables, Tailwind CSS
- **HTTP Client**: Axios with interceptors + Native Fetch API
- **Internationalization (i18n)**: Custom React Context provider supporting Vietnamese (`vi`) and English (`en`)
- **Icons**: Lucide React

### External Services & CDNs
- **Free Dictionary API**: Public REST API for definitions, phonetics, and native pronunciations
- **Wikimedia Commons**: Free public domain audio repository for authentic IPA phoneme recordings
- **Web Speech Synthesis API**: Browser-native speech engine for zero-latency audio fallbacks

---

## 3. High-Level Architecture

### Backend Architecture (Layered Architecture)

The backend follows clean separation of concerns:

```text
HTTP Request
     │
     ▼
Controllers           -> Route handling, model binding, authorization, rate limiting
     │
     ▼
Service Layer         -> Business logic, validation, user ownership checks
     │
     ▼
DbContext (EF Core)   -> ORM entity mappings, transactions, querying
     │
     ▼
Database (SQLite)     -> Persistent relational storage
```

- **Authentication**: Issued JWT access tokens containing claims (`UserId`, `Email`, `Username`).
- **Data Protection**: User ownership is strictly resolved from `HttpContext.User` claims, never accepted from user-supplied request bodies.

---

### Frontend Architecture (Feature-Driven App Router)

The frontend uses Next.js App Router combined with a feature-driven modular structure:

```text
frontend/
├── app/                              # Next.js App Router routes & layouts
│   ├── api/                          # Next.js server-side route handlers (CORS bypass & 3rd-party aggregators)
│   │   ├── audiobooks/route.ts       # LibriVox REST API proxy (direct Archive.org MP3 streams)
│   │   ├── dictionary/route.ts       # Free Dictionary API proxy with server-side caching
│   │   ├── tatoeba/route.ts          # Tatoeba open sentence search & native human audio API proxy
│   │   ├── voa/route.ts              # Internet Archive VOA American Stories collection proxy
│   │   └── vocabulary/route.ts       # Datamuse Lexical API proxy with frequency-based CEFR estimation
│   ├── audiobooks/                   # LibriVox public domain audiobooks & chapter reader
│   ├── auth/                         # Authentication pages (login, register)
│   ├── dictionary/                   # Standalone Dictionary lookup page
│   ├── flashcards/                   # Flashcards hub, creation, and study viewer
│   ├── ipa/                          # 44-phoneme IPA chart & interactive ear trainer
│   ├── sentences/                    # Tatoeba bilingual sentence pairs with human audio
│   ├── voa/                          # VOA Learning English (hub & [slug] lessons)
│   ├── vocabulary/                   # CEFR (A1-C2), NGSL & AWL vocabulary hub
│   ├── layout.tsx                    # Root layout with I18n & AppLayout providers
│   └── page.tsx                      # Explore & landing home page
│
└── src/
    ├── components/                   # Reusable UI & Layout components
    │   ├── layout/                   # AppHeader, AppSidebar, LanguageSwitcher
    │   └── ui/                       # Button, Modal, Spinners
    ├── config/                       # Routes, SEO configuration, API endpoints
    ├── features/                     # Feature modules (Domain logic + Components + APIs)
    │   ├── auth/                     # Auth forms, API calls, user session management
    │   ├── dictionary/               # Dictionary views, quick lookup modal, speed control
    │   ├── flashCards/               # Flashcard set creation, study 3D viewer, progress
    │   ├── home/                     # Landing page presentation components
    │   ├── ipa/                      # IPA phonemes dataset, audio controller, quiz
    │   └── voa/                      # VOA curated lessons by level, transcript, quiz
    ├── i18n/                         # Localization engine, locale dictionaries (vi, en)
    ├── lib/                          # Axios instance, response unwrap interceptors
    ├── types/                        # Core TypeScript models and DTO contracts
    └── utils/                        # Security utilities (obfuscated storage, formatting)
```

---

## 4. Key Architectural Patterns & Decisions

### 1. Client-Side Sensitive Data Protection (`secureStorage.ts`)
- **Problem**: Plaintext storage of `{"username": "...", "email": "..."}` in `localStorage` exposes user PII to anyone inspecting browser DevTools or potential XSS scrapers.
- **Solution**: User session metadata is obfuscated using salted reversible bit-shifting and base64 encoding (`_octo_sec_p_enc`). Legacy plaintext keys are purged automatically upon boot and logout.

### 2. Next.js Server-Side API Proxy for Dictionary
- **Problem**: Direct browser `fetch` to `https://api.dictionaryapi.dev/` from `http://localhost:3000` is blocked by browser CORS security policies.
- **Solution**: A Next.js server route handler (`/api/dictionary?word=...`) acts as a server-side gateway. Since server-to-server HTTP calls do not enforce CORS, the client calls its own domain and receives cached, normalized dictionary payloads.

### 3. Natural Audio Engine (`naturalAudio.ts`)
- **Problem**: Relying solely on browser `window.speechSynthesis` produces robotic, unnatural mechanical voices without proper phonetics, while static hardcoded audio URLs frequently 404/503.
- **Solution**: The `naturalAudio` service provides a triple-layer strategy:
  1. Direct verified public domain audio stream (Internet Archive, Tatoeba native human recordings, Free Dictionary phonetic MP3s).
  2. Google Natural Speech high-fidelity audio stream (`translate_tts`) delivering natural human pronunciation.
  3. Last-resort fallback to Web Speech API only if network connectivity is severed.

### 4. 3rd-Party Public Domain API Integrations
- **Tatoeba REST API (`/api/tatoeba`)**: Queries `tatoeba.org/en/api_v0/search` to retrieve authentic sentence pairs with real native speaker recordings and synchronized Vietnamese translations.
- **LibriVox Catalog API (`/api/audiobooks`)**: Queries `librivox.org/api/feed/audiobooks` with `extended=1` to stream hundreds of public domain literary masterpieces hosted on `archive.org`.
- **Datamuse Lexical API (`/api/vocabulary`)**: Dynamically queries `api.datamuse.com/words` across topics and calculates standardized CEFR levels (A1–C2) from corpus frequency scores.
- **VOA American Stories Archive (`/api/voa`)**: Delivers slow, clear broadcast English lessons with word-by-word synchronized audio streams from the Internet Archive.

### 4. Spaced Repetition & Study State Decoupling
- Study progress per deck (mastered cards vs. need-review cards) is managed per user. Guests and authenticated users have isolated local progress caches (`octo_flashcard_study_{userId}_{deckId}`), preserving offline responsiveness without blocking on round-trip network latency.

---

## 5. Security & Reliability Guidelines

1. **Token Storage**: Access tokens are kept in storage according to the "Remember Me" preference, and stripped of sensitive readable PII.
2. **Atomic Validation**: Multi-card sets require atomic validation: either all cards are valid or the entire batch request fails gracefully.
3. **Clean Code & TypeScript Strictness**: 100% strict type safety across all interfaces and routes with zero compilation warnings.
