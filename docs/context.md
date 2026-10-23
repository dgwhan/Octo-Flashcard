# Product Context — Octo Flashcard

> This document defines the product vision, target audience, core capabilities, and functional context of **Octo Flashcard**.

---

## 1. Product Vision

**Octo Flashcard** is a modern, comprehensive English learning platform engineered to help learners master English vocabulary, pronunciation, listening, and reading comprehension effectively through science-backed methodologies:

1. **Active Recall & Spaced Repetition**: Flipping flashcards to test memory rather than passively reading lists.
2. **Standardized Phonetics (IPA 44 Sounds)**: Building phonetic awareness with authentic pronunciation and mouth shape guides before memorizing complex vocabulary.
3. **Graded Comprehension (VOA Learning English)**: Progressing from beginner (Level 1) to advanced (Level 3) through structured reading and listening material.
4. **Contextual In-App Dictionary**: Instant lookup without leaving the learning context, paired with direct conversion from dictionary words into flashcards.

---

## 2. Target Users

- **English Language Learners**: From A1 beginners learning foundational IPA phonetics to C1 advanced learners mastering idioms.
- **Students & Test Takers (IELTS, TOEIC, TOEFL)**: Students needing rapid vocabulary acquisition and listening comprehension.
- **Self-Directed Learners**: Professionals seeking structured daily English reading, listening, and vocabulary retention.

---

## 3. Core Product Modules

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   OCTO FLASHCARD                                       │
├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬─────────────┤
│  Flashcards  │  VOA English │  Vocabulary  │   LibriVox   │   Tatoeba    │  Dictionary │
│ (3D Recall)  │ (Levels 1-3) │  (CEFR/NGSL) │ (Audiobooks) │ (Human Voice)│ (IPA & Audio│
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┴─────────────┘
```

### Module 1: Flashcard Learning Engine
- 3D card-flip animations with keyboard shortcuts (Space to flip, Arrow keys to navigate).
- Categorization into *"Need Review"* vs. *"Mastered"*.
- Integrated native audio pronunciation via browser Web Speech Synthesis.
- Multi-card creator with real-time validation.

### Module 2: VOA Learning English (Phân cấp Level 1, 2, 3)
- Curated authentic lessons across three distinct CEFR-aligned levels:
  - **Level 1 (Beginning - A1/A2)**: Everyday communication, foundational grammar, slow cadence (~100 wpm).
  - **Level 2 (Intermediate - B1/B2)**: Technology, health, science, American culture (~120 wpm).
  - **Level 3 (Advanced - C1)**: Theater idioms, space exploration, deep analysis (~135 wpm).
- Integrated player with playback speed selector (**0.75x**, **1.0x**, **1.25x**).
- One-tap word lookup directly inside reading paragraphs.
- Key vocabulary cards with one-click *"Lưu vào Flashcard"* action.
- Comprehension quizzes with instant scoring and detailed explanations.

### Module 3: International Phonetic Alphabet (IPA) Chart
- Comprehensive interactive chart featuring all 44 English phonemes:
  - Monophthongs (12 sounds: 5 long, 7 short)
  - Diphthongs (8 sounds)
  - Consonants (24 sounds: 8 unvoiced, 16 voiced)
- Public domain audio recordings from Wikimedia Commons + speech engine fallback.
- Vietnamese guidance on mouth shapes, tongue placement, and voicing.
- Ear-training reflex quiz (*Luyện tai nghe phản xạ âm*).

### Module 4: Integrated English Dictionary & Speed Control
- Public Free Dictionary API integration without external API key requirements.
- Proxied through internal Next.js Server Route Handler to eliminate browser CORS blocks.
- Adjustable speech rates: **0.5x, 0.75x, 1.0x, 1.25x, 1.5x**.
- Audio playback for headwords, definitions, and contextual example sentences.
- Available as a standalone page (`/dictionary`) and a global header modal accessible anywhere.

### Module 5: Standardized Vocabulary Suite (CEFR A1–C2, NGSL & AWL)
- Complete vocabulary collections aligned with the **CEFR-J** framework across all 6 tiers: A1, A2, B1, B2, C1, and C2.
- Integrated **New General Service List (NGSL)** for high-frequency general English words.
- Integrated **Academic Word List (AWL)** for academic and certification exams (IELTS, TOEFL).
- Curated by key topics: Technology, Business, Environment, Healthcare, Academic, and Culture.
- One-click batch exporter to create Flashcard study sets directly from filtered wordlists.

### Module 6: LibriVox Public Domain Audiobooks
- Integration with the world's largest open-source public domain audiobook collection (LibriVox & Archive.org).
- Masterpieces including *The Gift of the Magi*, *Sherlock Holmes*, *Alice in Wonderland*, and *Aesop's Fables*.
- Multi-speed audio streaming paired with synchronized readable text and one-tap dictionary lookup.

### Module 7: Tatoeba Project Multilingual Sentence Database
- Direct connection to the collaborative Tatoeba Project with authentic native speaker human audio recordings.
- Searchable English - Vietnamese sentence pairs across diverse real-world contexts and difficulty levels.
- One-click flashcard conversion saving full sentences and their translations.

---

## 4. User Journey

```text
1. Explore
   └── Browse VOA articles, open IPA chart, or search words in Dictionary

2. Learn & Listen
   └── Read VOA articles with multi-speed audio, tap unfamiliar words for instant definitions

3. Convert & Practice
   └── Add learned vocabulary directly to Flashcard Sets with one click

4. Review & Retain
   └── Study flashcard sets using 3D active recall, categorize mastered vs. review cards
```

---

## 5. Security & Privacy Philosophy

- **Zero Plaintext Credentials in Storage**: Sensitive user information (`username`, `email`) is encrypted and masked before entering client storage.
- **Session Privacy**: Plaintext legacy keys are purged upon launch, protecting shared workstation users from casual DevTools exposure.
- **Isolated User State**: Learning progress is partitioned strictly by user ID.

---

## 6. Product Principles

1. **Frictionless Learning**: Instant word lookups and one-click flashcard creation eliminate copy-paste friction.
2. **Reliable Audio Everywhere**: Audio is dual-layered (CDN streaming + browser speech synthesis) so pronunciation never fails, even offline or on restricted networks.
3. **Structured Progression**: Learners can select their exact comfort level (Levels 1 to 3) without being overwhelmed.
4. **Bilingual Inclusivity**: Fully localized in Vietnamese and English, allowing learners to understand complex grammatical concepts easily.
