# Cấu trúc frontend

Trạng thái: **đã áp dụng (22/11/2026).** Mọi route giữ nguyên URL; nội dung và giao diện không đổi.

## 1. Sơ đồ

```
frontend/
├── app/                       Routing: metadata, generateStaticParams, đọc params, header ModulePage, render 1 page của feature
└── src/
    ├── components/
    │   ├── ui/                Thành phần dùng chung (Button, AudioButton, SuckerRow…). Không import từ features/
    │   └── layout/            Khung app: header, sidebar, ModulePage
    ├── config/                routes, seo, modules (8 module)
    ├── i18n/
    ├── lib/                   Dùng chung nhiều feature: api client, motion, studyLog, secureStorage, utils,
    │                          userSettings (cài đặt theo tài khoản), ai (gọi AI qua server), voice/ (giọng đọc toàn app)
    ├── styles/                Token màu (colors.css)
    ├── types/                 Kiểu dữ liệu dùng chung ≥ 2 feature (auth, flashCard)
    └── features/<tên>/
        ├── pages/             Màn hình ứng với 1 route (XxxPage.tsx + XxxPage.module.css)
        ├── components/        Mảnh giao diện dùng trong pages; nhóm con theo màn hình khi nhiều (vd. flashcards/components/study/, grammar/components/topic/)
        ├── data/              Nội dung tĩnh (*.data.ts, data/index.ts)
        ├── api/               Gọi backend / dịch vụ ngoài (*.api.ts)
        ├── hooks/             React hooks
        ├── lib/               Logic thuần (chấm điểm, FSRS, so sánh, prompt AI…) + *.test.ts đặt cạnh
        ├── types.ts           Kiểu dữ liệu của feature
        └── index.ts           Những gì bên ngoài được dùng (pages, hàm, kiểu)
```

| Feature | Có |
|---|---|
| auth | api, components, hooks, pages |
| dictionary | api, components (SearchBar, SearchHistory, EntryCard), pages, types |
| flashcards | api, components (+ `study/`), lib (srs, reviewQueue, savedDeck, studyProgress), pages |
| grammar | api, components (+ `topic/`), data (35 chủ điểm), lib (grading), pages, types |
| ipa | components (IpaToolbar, IpaQuiz, PhonemeGrid, PhonemeDetail), data, lib, pages, types |
| landing | pages, sections (các khối của landing) |
| phrases | data (collocations, idioms), lib (text), pages, types |
| progress | lib (heatmap), pages |
| settings | components (VoicePicker, VoiceSpeed, GeminiKeySettings, AiKeyNotice), pages |
| speaking | components, data (shadowing, pronunciation, scenarios, ielts), hooks, lib (compare, prompts), pages, types |
| voa | components (LessonAudioBar, ReadingTab, VocabularyTab, QuizTab), data, pages, types |
| vocabulary | components (VocabularyFilters, WordCard), data, lib (levelBadge), pages, types |

## 2. Quy tắc

1. **`app/` mỏng.** `page.tsx` chỉ có metadata, đọc params, header `ModulePage` (nội dung tiêu đề của route) và `<XxxPage />` từ feature.
2. **Một chiều phụ thuộc:** `app → features → components / lib / config`. `src/components/ui` không import từ `features/`.
3. **Ra ngoài feature thì import qua `index.ts`** (`@/src/features/speaking`). Được phép import thẳng `data/` và `types` của feature khác (route API, sitemap, dữ liệu dùng chéo như phrases → speaking). Bên trong feature dùng đường dẫn tương đối; ra khỏi feature dùng alias `@/`.
4. **Client component không import barrel có dữ liệu lớn**, import thẳng file cần dùng để dữ liệu không vào bundle trình duyệt.
5. **Hook dùng API React chỉ chạy ở client** (`useSyncExternalStore`, `useState`…) phải có `"use client"`, vì barrel có thể bị import từ server component.
6. **Tên:** thư mục feature viết thường (`flashcards`). File page tên `XxxPage`, trùng tên component. Hàm mặc định trong `app/**/page.tsx` tên `Page`.
7. **File > ~300 dòng thì tách** thành component con theo phần giao diện (tab, panel, modal), state giữ ở page.

## 3. Còn để ngỏ

- `FlashCardViewer` (445 dòng), `IeltsPage` (418), `GrammarTopicPage` (406), `VoaLessonsPage` (388), `VoaLessonPage` (381) vẫn trên 300 dòng: phần còn lại chủ yếu là state và handler, tách tiếp nên đi kèm custom hook.
- Nhiều component còn style inline (VOA, từ vựng, từ điển, IPA); chuyển sang CSS module là việc riêng.
- 27 lỗi ESLint có từ trước (`set-state-in-effect`, `no-explicit-any`, `immutability`) chưa sửa.
