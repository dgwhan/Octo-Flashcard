# Business Logic & Specifications — Octo Flashcard

> This document provides functional specifications, business rules, and domain constraints for **Octo Flashcard**.

---

## 1. Authentication & User Profile Security

- **Authentication Standard**: The system uses JSON Web Tokens (JWT) for user authorization.
- **Client Storage Data Masking**: Sensitive user fields such as `username` and `email` must **never** be stored as plaintext JSON in `localStorage` or `sessionStorage`.
  - Stored profiles are encrypted/obfuscated with salt (`_octo_sec_p_enc`).
  - Any legacy unencrypted keys (e.g., `"user"`) are purged automatically upon application initialization and logout.
- **Session Lifecycles**:
  - `rememberMe = true`: Secure credentials persist across browser restarts in `localStorage`.
  - `rememberMe = false`: Credentials are kept only for the active browser tab via `sessionStorage`.
- **Identity Integrity**: User operations (flashcard creation, deletion, study tracking) extract ownership from the authenticated token claims. The frontend never passes raw `userId` in modification request bodies.

---

## 2. Flashcard Sets & Active Recall Learning

### Flashcard Set Specifications
- **Minimum Cards**: Creating a new Flashcard Set requires **at least 2 valid cards**.
- **Field Nomenclature**:
  - **Question / Term**: The primary vocabulary item, sentence, or question.
  - **Answer / Definition**: The definition, Vietnamese translation, or concept explanation.
  - Supports optional phonetics metadata (e.g., `[ˈæpl]`).
- **Atomic Validation**: If any card in a set creation request contains empty fields, the entire creation fails atomically with validation feedback.

### Study Session & Active Recall Mechanics
- **3D Double-Sided Flip**: Users can flip between question and answer with smooth animations, spacebar, or arrow keys.
- **Binary Assessment**: Each card is evaluated by the user as either:
  - **Need Review (Cần ôn lại)**: Placed in a review queue for repeated reinforcement.
  - **Mastered (Đã thuộc)**: Marked as retained.
- **Progress Persistence**: User study progress is tracked per user and set (`octo_flashcard_study_{userId}_{deckId}`).
- **Audio Pronunciation**: Users can listen to native text-to-speech pronunciation of terms during study.

---

## 3. English Learning by Levels (VOA Learning English)

### Proficiency Level Categorization
To provide structured progression, lessons are categorized into three defined tiers:

| Level | CEFR Level | Speed (wpm) | Focus & Style |
|-------|------------|-------------|---------------|
| **Level 1 (Beginning / Sơ cấp)** | A1 – A2 | ~100 wpm | Short sentences, everyday greetings, foundational grammar, clear slow speech. |
| **Level 2 (Intermediate / Trung cấp)** | B1 – B2 | ~120 wpm | Science, Technology, Health, American Stories, compound sentences, broader vocabulary. |
| **Level 3 (Advanced / Nâng cao)** | C1 | ~135 wpm | Cultural idioms, critical analysis, space exploration, natural native intonation. |

### Lesson Components
1. **Interactive Audio Player**:
   - Audio playback streaming authentic VOA recordings with client-side Web Speech fallback.
   - Multi-speed playback controls: **0.75x**, **1.0x**, **1.25x**.
   - Seekable timeline and current time / total duration counter.
2. **Interactive Reading Pane**:
   - Full transcript segmented into readable paragraphs.
   - **One-Tap Dictionary Lookup**: Clicking or tapping any word in the reading text opens the Dictionary modal instantly.
3. **Core Vocabulary (Từ vựng trọng tâm)**:
   - Word, IPA phonetics, part of speech, Vietnamese meaning, English definition, example sentence, and native audio button.
   - **"Save to Flashcard"**: One-click export button pre-filling the Flashcard creation form.
4. **Comprehension Quiz (Kiểm tra hiểu bài)**:
   - Multiple-choice questions assessing reading & listening comprehension.
   - Immediate answer evaluation with comprehensive pedagogical explanations.

---

## 4. International Phonetic Alphabet (IPA) Standard Chart

- **44 English Phonemes**:
  - **12 Monophthongs**: Long vowels (`/iː/, /uː/, /ɜː/, /ɔː/, /ɑː/`) and short vowels (`/ɪ/, /ʊ/, /e/, /ə/, /æ/, /ʌ/, /ɒ/`).
  - **8 Diphthongs**: `/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/, /ɪə/, /eə/, /ʊə/`.
  - **24 Consonants**: 8 unvoiced (bật hơi) and 16 voiced (rung thanh quản).
- **Public Domain Audio Integration**:
  - Audio sources linked to authentic public domain recordings from Wikimedia Commons.
  - Automatic fallback to browser Web Speech API `en-US` ensures reliable playback under all network conditions.
- **Pronunciation Mechanics**:
  - Vietnamese guide explaining mouth shape, tongue position, and vocal cord vibration.
  - Real-world example words with audio playback.
- **Ear-Training Reflex Quiz (Luyện tai nghe phản xạ)**:
  - Generates random acoustic challenges where learners listen and identify the correct IPA symbol from 4 choices.

---

## 5. Comprehensive Dictionary & Vocabulary Exporter

- **Free Dictionary API Integration**:
  - Connects to public dictionary databases without third-party API keys.
  - Relayed through internal server route handler (`/api/dictionary?word=...`) to avoid browser CORS blocks.
- **Voice Speed Control**:
  - Learners can adjust pronunciation speed across **0.5x, 0.75x, 1.0x, 1.25x, 1.5x**.
  - Speed preference is saved locally (`_octo_dict_speed`) for a seamless persistent experience.
  - Audio pronunciation is available for primary words, definitions, and example sentences.
- **Direct Flashcard Conversion**:
  - Every dictionary entry provides a one-click *"Tạo thẻ Flashcard"* action pre-filling term, definition, and phonetics into the flashcard creation workflow.
- **Global Availability**:
  - Dedicated page at `/dictionary`.
  - Global header shortcut button and modal lookup accessible from anywhere in the application.

---

## 6. Internationalization (i18n)

- Complete bilingual interface supporting **Vietnamese (`vi`)** (default) and **English (`en`)**.
- User locale selection is saved in `localStorage` and persisted across sessions.
- All navigation links, headers, tooltips, validation messages, and buttons adapt dynamically to the active locale.
