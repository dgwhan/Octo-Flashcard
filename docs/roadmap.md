# Development Roadmap — Octo Flashcard

> This document tracks the implementation milestones, completed capabilities, and forward-looking roadmap for **Octo Flashcard**.

---

## 1. Project Status Overview

- **Current Version**: v1.0 (Core Learning Suite)
- **Status**: Stable & Active Development
- **Architecture**: Next.js 16 (App Router + Turbopack) + ASP.NET Core (.NET 10) + EF Core

---

## 2. Feature Completion Matrix

| Module | Feature | Status | Notes |
|--------|---------|--------|-------|
| **Security & Auth** | User Registration & Login (JWT) | Complete | Rate-limited, password hashed |
| | Sensitive Data Masking in Storage | Complete | Obfuscated with salt (`_octo_sec_p_enc`), auto-purge of plaintext keys |
| | Session Management (Remember Me) | Complete | Seamless tab/browser lifecycle sync |
| **Flashcards** | Flashcard Set Creation & Validation | Complete | Multi-card atomic validator (min. 2 cards) |
| | Flashcard Sets Hub & Management | Complete | Search, sort, delete, card count badge |
| | 3D Double-Sided Flashcard Study Viewer | Complete | Smooth 3D flip, Space/Arrow key navigation |
| | Active Recall Categorization | Complete | "Mastered" vs. "Need Review" with state persistence |
| | Text-to-Speech Pronunciation | Complete | Native Web Speech API integration |
| **VOA English** | 3-Level Graded Curriculum | Complete | Level 1 (Sơ cấp), Level 2 (Trung cấp), Level 3 (Nâng cao) |
| | Audio Player with Speed Control | Complete | Play/Pause, timeline seek, real timeupdate, auto-paragraph highlight |
| | Reading Pane with Tap-to-Lookup | Complete | Click any word to trigger dictionary modal |
| | Core Vocabulary with Flashcard Exporter | Complete | Direct one-click import into Flashcard creation |
| | Comprehension Quiz & Explanations | Complete | Interactive multiple-choice with pedagogical rationale |
| | VOA Archive API Gateway (`/api/voa`) | Complete | Internet Archive American Stories collection integration |
| **Vocabulary** | CEFR-J (A1 – C2) & Topics | Complete | Standardized graded wordlists with collocations & examples |
| | NGSL & AWL Core Wordlists | Complete | New General Service List (core) & Academic Word List |
| | Natural Pronunciation Engine | Complete | High-fidelity studio pronunciation replacing robot TTS |
| | Datamuse Dynamic Lexicon (`/api/vocabulary`)| Complete | Real-time topic search, corpus frequency to CEFR mapping |
| | Batch Flashcard Converter | Complete | One-click export of filtered wordlists into study cards |
| **LibriVox** | Public Domain Classic Audiobooks | Complete | Streaming from Archive.org/LibriVox with speed control |
| | LibriVox Live API Gateway (`/api/audiobooks`)| Complete | Dynamic search across LibriVox's 10,000+ catalog |
| | Dynamic Reader (`/audiobooks/[slug]`) | Complete | Resolves any book ID live with chapter selection & Gutenberg reader |
| | Synchronized Reading & Tap Lookup | Complete | Complete text transcripts paired with dictionary modal |
| **Tatoeba** | Tatoeba Live API Gateway (`/api/tatoeba`) | Complete | Live search across tens of thousands of authentic sentence pairs |
| | Real Native Speaker Audio (100% matched) | Complete | Direct native recordings paired with sentence IDs on audio.tatoeba.org |
| | English - Vietnamese Sentence Pairs | Complete | Searchable by keyword, level, topic, one-click flashcard save |
| **IPA Phonetics** | 44 English Phonemes Chart | Complete | Monophthongs (12), Diphthongs (8), Consonants (24) |
| | Free Public Domain Audio | Complete | Wikimedia Commons audio + Web Speech fallback |
| | Vietnamese Pronunciation Guide | Complete | Mouth shape, tongue placement, voicing instructions |
| | Ear-Training Reflex Quiz | Complete | Audio recognition game with score accumulation |
| **Dictionary** | Public Dictionary API Integration | Complete | Free Dictionary API with complete definitions & phonetics |
| | Server-Side API Proxy Route | Complete | Next.js `/api/dictionary` proxy eliminating browser CORS |
| | Voice Speed Selector | Complete | 0.5x, 0.75x, 1.0x, 1.25x, 1.5x with persistent preference |
| | Contextual Audio for Words & Examples | Complete | Pronunciation for primary headwords and example sentences |
| | Global Quick Lookup Modal | Complete | Available via header button and inline text interaction |
| **UI & UX** | Full Bilingual Support (i18n) | Complete | Vietnamese (`vi`) and English (`en`) |
| | Responsive Layout & Sidebar | Complete | Collapsible sidebar, mobile drawer, responsive cards |

---

## 3. Completed Milestones

### Milestone 1: Platform Foundation & Security (Completed)
- ASP.NET Core backend with JWT bearer authentication and SQLite storage.
- Client-side storage protection against plaintext exposure of user emails and usernames.
- Standardized UI component library (`Button`, `Modal`, `AppHeader`, `AppSidebar`).

### Milestone 2: Flashcard Learning Engine (Completed)
- Full CRUD workflows for Flashcard Sets.
- High-performance 3D study interface with keyboard controls and active recall categorization.
- Per-user study progress saved to local storage.

### Milestone 3: VOA Learning English by Levels (Completed)
- Graded reading & listening curriculum categorized into Levels 1, 2, and 3.
- Audio player with speed adjustments and interactive reading transcripts.
- Integrated comprehension checks and one-click vocabulary flashcard converter.

### Milestone 4: IPA International Phonetics Chart (Completed)
- Full 44-phoneme chart with Vietnamese guides and mouth shape diagrams.
- Public domain Wikimedia audio integration with audio fallback.
- Ear-training reflex testing mode.

### Milestone 5: Integrated In-App Dictionary (Completed)
- Server-side proxy resolving browser CORS restrictions.
- Pronunciation speed adjustments from 0.5x to 1.5x with persistent preferences.
- Global modal and dedicated page.

---

## 4. Future Roadmap (v1.1+)

### Version 1.1: Advanced Study Algorithms & AI
- [ ] **Spaced Repetition Algorithm**: Implementation of SuperMemo SM-2 or FSRS algorithm for mathematically optimal card review intervals.
- [ ] **AI Flashcard Generator**: Automatic flashcard set generation from user-pasted articles, PDF documents, or YouTube transcripts.
- [ ] **Speech Recognition & Pronunciation Scoring**: Utilizing the browser Web Speech Recognition API to evaluate user pronunciation against target IPA phonemes.

### Version 1.2: Gamification & Study Habits
- [ ] **Daily Study Streaks & Goals**: Daily card review targets and streak counter to foster consistent study habits.
- [ ] **Achievements & Milestones**: Badges for completing VOA levels, mastering 44 IPA sounds, or retaining 100+ vocabulary cards.
- [ ] **Learning Analytics Dashboard**: Graphs showing retention rates, words mastered over time, and daily study time.

### Version 1.3: Progressive Web App & Offline Sync
- [ ] **PWA Offline Support**: Service worker caching for offline flashcard study and cached VOA lessons.
- [ ] **Cloud Study Sync**: Syncing card mastery states across multiple devices via user profile API.
