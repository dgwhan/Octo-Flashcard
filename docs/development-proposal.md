# Đề xuất phát triển Octo Flashcard

> Viết ngày 21/11/2026, sau đợt thiết kế lại giao diện và mở rộng module Ngữ pháp.
> Bổ sung cho [roadmap.md](roadmap.md): tài liệu này sắp thứ tự ưu tiên dựa trên những gì đã đọc được trong code, không phải danh sách ý tưởng.
> Ước lượng công sức: **S** ≈ 1–3 ngày · **M** ≈ 1–2 tuần · **L** ≈ 3+ tuần (một người, rất thô).

---

## Trạng thái triển khai (21/11/2026)

Đã làm trong đợt này:

- **Lặp lại ngắt quãng FSRS**: trang `/flashcards/review` (ts-fsrs, chấm 4 mức, phím 1–4). Backend lưu `Due` + `ReviewState` (JSON) cho từng thẻ qua `PUT /api/flashcards/{setId}/items/{cardId}/review`; migration `AddFlashcardReviewState`.
- **Tiến độ của tôi**: trang `/progress` dùng `/gamification/summary`, `/gamification/badges`, `/focus/heatmap`, kèm số thẻ cần ôn và tiến độ ngữ pháp. Phiên ôn flashcard và mỗi lần nộp bài ngữ pháp được ghi vào `POST /focus/sessions` để cộng streak/XP.
- **Lưu vào bộ thẻ một chạm**: `SaveToDeckButton` dùng ở VOA, Từ điển, Câu mẫu, Từ vựng; gom vào bộ “Từ đã lưu”, bỏ qua thẻ trùng.
- **AI tạo thẻ từ đoạn văn**: `POST /api/ai/generate-flashcards-from-text` (40–8000 ký tự, cần `GEMINI_API_KEY`), bảng AI trên trang tạo bộ thẻ, nút “Tạo thêm thẻ từ cả bài bằng AI” trong tab Từ vựng của bài VOA.
- **Test & CI**: Vitest (`npm test`) cho chấm ngữ pháp, dữ liệu lộ trình, FSRS, hàng đợi ôn, lưu thẻ, heatmap; `node-ci.yml` chạy typecheck + test trước lint/build.

Còn lại: nút Đã nhớ/Cần ôn ở chế độ xem bộ thẻ chưa cập nhật FSRS; backend chưa kiểm tra độ dài phiên học; lint còn lỗi cũ; backend chưa có project test.

## 1. Hiện trạng sau đợt nâng cấp

**Đã có và đang chạy tốt**

- 8 module học dùng chung một hệ thiết kế (token màu, Fraunces + Be Vietnam Pro, motif giác hút, khung `ModulePage`), đạt WCAG AA ở chế độ sáng lẫn tối trên 10 trang đã quét.
- Ngữ pháp: 35 chủ điểm A1–C1, 560 câu hỏi (167 câu tự gõ), bộ nâng cao, flashcard; tiến độ đồng bộ backend khi đăng nhập.
- Flashcard: CRUD, trình học lật thẻ, đánh dấu Đã thuộc / Cần ôn, tiến độ từng bộ hiện trên trang danh sách.

**Khoảng trống quan trọng nhất (có bằng chứng trong code)**

| Khoảng trống | Bằng chứng |
|---|---|
| Backend có sẵn nhiều tính năng nhưng không có giao diện nào gọi tới | `GamificationController` (summary, badges, leaderboard), `FocusController` (sessions, heatmap), `UsersController/streak`, `NotificationsController`, `AiController/generate-flashcards`, `PetController`, `TasksController`, `ScannedDocumentsController` — frontend không gọi endpoint nào trong số này |
| Flashcard chưa có lặp lại ngắt quãng thật | Trình học chỉ lưu `masteredIds` / `reviewIds` vào `localStorage`; không có lịch ôn, không đồng bộ giữa thiết bị |
| Nội dung còn mỏng ở vài module | VOA Level 1 chỉ có **1** bài (cả hệ thống 7 bài); bộ từ vựng tuyển chọn **37** từ; sách nói 12 cuốn tuyển chọn |
| Chưa có kiểm thử | Không có file test nào ở frontend lẫn backend |
| Nội dung ngữ pháp chưa được người duyệt | 560 câu do AI soạn, đã tự rà một lượt và có self-check cấu trúc, nhưng chưa có giáo viên duyệt |

---

## 2. Nguyên tắc ưu tiên

1. **Dùng thứ đã có trước khi xây mới.** Backend đã làm sẵn gamification, streak, focus, AI — nối giao diện rẻ hơn nhiều so với viết tính năng mới.
2. **Một vòng học khép kín quan trọng hơn thêm module.** Người học cần: gặp từ → lưu → được nhắc ôn đúng lúc → thấy mình tiến bộ. Hiện vòng này đứt ở bước "nhắc ôn" và "thấy tiến bộ".
3. **Mọi tính năng mới đi qua hệ thiết kế hiện có** (token, `ModulePage`, `SuckerRow`, `flipCard`) để không quay lại cảnh mỗi trang một kiểu.

---

## 3. Lộ trình đề xuất

### Giai đoạn 1 — Khép vòng học (ưu tiên cao nhất, ~4–6 tuần)

**1.1. Lặp lại ngắt quãng cho flashcard (L)**
- Thay cặp Đã thuộc / Cần ôn bằng 4 mức đánh giá (Quên · Khó · Được · Dễ) và thuật toán **FSRS** (hoặc SM-2 nếu muốn đơn giản) để tính ngày ôn tiếp theo của từng thẻ.
- Lưu trạng thái thẻ ở backend theo đúng mẫu đã có của `UserGrammarProgress` (entity + repository + service + controller), localStorage chỉ còn là cache.
- Màn **"Hôm nay cần ôn"**: gom các thẻ đến hạn từ mọi bộ.
- Đo: tỉ lệ thẻ ôn đúng hạn, tỉ lệ nhớ sau 7 ngày.

**1.2. Trang "Tiến độ của tôi" dùng API có sẵn (M)**
- Gọi `GET /gamification/summary`, `/gamification/badges`, `/focus/heatmap`, `PUT /users/streak`.
- Hiển thị: chuỗi ngày học (streak), heatmap thời gian học, huy hiệu, tiến độ Ngữ pháp và Flashcard trên một trang.
- Gắn với thương hiệu: mỗi ngày học "lấp đầy" một giác hút; đủ 8 ngày là một xúc tu hoàn chỉnh.

**1.3. "Lưu vào bộ thẻ" một chạm ở mọi nơi (S–M)**
- Hiện VOA, Từ điển, Câu mẫu, Từ vựng đều dẫn sang trang tạo bộ thẻ mới, với hai kiểu tham số khác nhau (`?word=` và `?front=`). Kiểu `?front=` trước đây bị bỏ qua nên nút ở Câu mẫu và Từ vựng mở ra form trống; lỗi này **đã sửa** trong đợt nâng cấp.
- Bước tiếp theo: một nút dùng chung thêm thẳng thẻ vào bộ mặc định "Từ đã lưu" (không phải tạo bộ mới cho mỗi từ), kèm thông báo "Đã lưu" ngay tại chỗ. Sách nói hiện chưa có nút lưu từ.

**1.4. Tạo flashcard bằng AI (S)**
- `POST /ai/generate-flashcards` đã có. Thêm ô "Dán đoạn văn" ở trang tạo bộ thẻ và nút "Tạo thẻ từ bài này" ở cuối mỗi truyện VOA.
- Cần: giới hạn độ dài đầu vào, cho người dùng sửa trước khi lưu, ghi rõ nội dung do AI tạo.

### Giai đoạn 2 — Kỹ năng nghe & nói (~4 tuần)

**2.1. Nghe chép chính tả (M)** — dùng audio Tatoeba/VOA sẵn có: phát một câu, người học gõ lại, chấm bằng chính bộ chấm câu tự gõ của Ngữ pháp (`grammar.grading.ts`, đã có xử lý hoa/thường, khoảng trắng, dấu nháy).

**2.2. Luyện phát âm (M–L)** — Web Speech API (`SpeechRecognition`) cho từ/câu ngắn, so với văn bản mục tiêu; ở bảng IPA thêm nút "Thử nói". Lưu ý: độ chính xác phụ thuộc trình duyệt (tốt trên Chrome, hạn chế trên Firefox/Safari) — nên coi là phản hồi gợi ý, không phải điểm số.

**2.3. Shadowing cho VOA (S)** — lặp từng câu transcript với tốc độ chậm; trình phát đã có sẵn đồng bộ câu và chỉnh tốc độ.

### Giai đoạn 3 — Nội dung & cá nhân hoá (~liên tục)

**3.1. Bài kiểm tra xếp lớp CEFR (M)** — 20–30 câu trộn từ vựng + ngữ pháp, gợi ý chặng Ngữ pháp và cấp VOA phù hợp ngay lần đầu vào.

**3.2. Mở rộng nội dung (liên tục)** — ưu tiên VOA Level 1 (đang 1 bài), bộ từ vựng tuyển chọn theo chủ đề, câu Tatoeba có audio theo chủ đề Ngữ pháp (ví dụ thật cho từng chủ điểm).

**3.3. Duyệt nội dung (S, cần người)** — giáo viên/người bản ngữ duyệt 560 câu Ngữ pháp; thêm nút "Báo lỗi câu này" để người học góp ý.

**3.4. Quyết định về các tính năng StudyFlow cũ** — `StudyPet`, `StudyTask`, `ScannedDocument` có ở backend nhưng không thuộc trọng tâm học tiếng Anh. Đề xuất: giữ **Pet** và biến nó thành chính Octo (thú cưng được "cho ăn" bằng streak — khớp thương hiệu), tạm ẩn Tasks và Scanned Documents cho tới khi có lý do sản phẩm rõ ràng.

### Giai đoạn 4 — Nền tảng (song song, mỗi sprint một phần)

| Hạng mục | Công sức | Vì sao |
|---|---|---|
| Kiểm thử: unit cho `grammar.grading`, `studyProgress`, dữ liệu ngữ pháp; Playwright cho luồng học chính | M | Hiện không có test nào; các self-check runtime chỉ bắt lỗi dữ liệu, không bắt lỗi luồng |
| CI chạy `tsc`, `eslint`, `next build`, `dotnet build` | S | Build đang là bước kiểm tra dữ liệu ngữ pháp duy nhất |
| Dọn lỗi ESLint có sẵn (`setState` trong effect ở `FlashCardViewer`, `DictionaryView`; `any` trong `flashCard.api.ts`) | S | Đang là lỗi, không chỉ cảnh báo |
| Chuyển style inline còn lại (~300 chỗ trong VOA, Sách nói, Câu mẫu, IPA, Từ điển, Từ vựng) sang CSS module | M | Đã dùng token nên hiển thị đúng, nhưng khó bảo trì và không thể theme hoá thêm |
| PWA + học offline cho flashcard và bài VOA đã mở | M | Người học hay ôn trên điện thoại, lúc không có mạng |
| i18n đầy đủ (landing, Ngữ pháp, trang module đang viết cứng tiếng Việt) | M | Đã có hệ i18n nhưng chỉ phủ khung app |
| Đặt `NEXT_PUBLIC_SITE_URL` khi deploy | S | Nếu không, sitemap/canonical/ảnh OG trỏ về localhost |

---

## 4. Thứ tự đề xuất & chỉ số theo dõi

1. **1.2 Tiến độ của tôi** (API có sẵn, thấy kết quả nhanh) → 2. **1.1 Lặp lại ngắt quãng** → 3. **1.3 Lưu một chạm** → 4. **Kiểm thử + CI** → 5. **1.4 AI tạo thẻ** → 6. Giai đoạn 2.

| Chỉ số | Đo ở đâu |
|---|---|
| Số ngày học liên tiếp (trung vị) | `users/streak` |
| % thẻ được ôn đúng hạn | bảng tiến độ thẻ (sau 1.1) |
| % người học hoàn thành ≥1 chủ điểm Ngữ pháp trong tuần đầu | `grammar/progress` |
| Thời gian học / tuần | `focus/sessions` |

---

## 5. Rủi ro cần lưu ý

- **Đồng bộ tiến độ**: chuyển flashcard từ localStorage lên backend cần bước di chuyển dữ liệu cũ (đọc localStorage một lần, gửi lên, đánh dấu đã chuyển) để người học không mất tiến độ.
- **Chi phí AI**: `generate-flashcards` và `chat` gọi Gemini — cần giới hạn theo người dùng/ngày trước khi mở rộng.
- **Bản quyền nội dung**: tiếp tục chỉ dùng nguồn public domain / CC BY và giữ ghi nguồn như trang chủ đang làm.
