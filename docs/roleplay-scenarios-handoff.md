# Bàn giao: thêm tình huống Nhập vai (luyện nói với AI)

Tài liệu dành cho AI/lập trình viên nhận việc **thêm tình huống hội thoại** vào trang `/speaking/roleplay`.
Việc này chỉ là thêm dữ liệu: không cần sửa giao diện, prompt hay backend.

## 1. Phạm vi

**Được sửa:**

| File | Sửa gì |
|---|---|
| `frontend/src/features/speaking/data/scenarios.ts` | Thêm phần tử vào mảng `SCENARIOS` |
| `frontend/src/features/speaking/lib/speaking.test.ts` | Cập nhật số lượng: `expect(SCENARIOS.length).toBe(N)` |

**Chỉ sửa khi thêm một cấp độ mới** (ví dụ A1 hoặc C2), xem mục 6:
`frontend/src/features/speaking/types.ts` và hằng `LEVELS` trong `scenarios.ts`.

**Không sửa:** `lib/prompts.ts`, `pages/RolePlayPage.tsx`, `lib/searchScenarios.ts`, backend, `package.json`.
Không thêm thư viện. Không commit trừ khi người giao việc yêu cầu.

## 2. Mỗi tình huống được dùng thế nào

Giao diện tự hiển thị mọi phần tử trong `SCENARIOS`. Bộ lọc cấp độ, số đếm, ô tìm kiếm và con số trên trang chủ
cũng tự cập nhật. Các trường được ghép vào prompt gửi Gemini (`lib/prompts.ts`):

```text
You are role-playing as ${aiRole}. The learner plays ${learnerRole}; their goal is to ${learnerGoal}.
The learner is a Vietnamese learner of English at CEFR level ${level}. Use natural spoken English suited to ${level}.
```

Vì vậy phải viết **đúng dạng ngữ pháp** để câu ghép lại đọc tự nhiên (xem bảng dưới).

## 3. Các trường của `Scenario`

Định nghĩa ở `frontend/src/features/speaking/types.ts`.

| Trường | Ngôn ngữ | Ai thấy | Quy tắc |
|---|---|---|---|
| `id` | ASCII | Không ai (khóa nội bộ) | Chữ thường, liền nhau, không dấu, **duy nhất** (test sẽ báo nếu trùng). Ví dụ `carhire`, `aiedu` |
| `title` | Tiếng Việt | Người học (thẻ chọn) | 2–6 từ, viết hoa chữ đầu. Ví dụ `Thuê xe ô tô` |
| `level` | — | Người học + AI | Một trong `"A2" \| "B1" \| "B2" \| "C1"` |
| `topic` | — | Người học (nhóm trong Sổ tay luyện nói) | Một `id` trong `TOPICS` ở đầu `scenarios.ts`: `food`, `travel`, `services`, `health`, `home`, `social`, `work`, `study`. Các câu người học lưu từ phần nhận xét của tình huống này sẽ được xếp vào chủ đề đó. Test báo lỗi nếu thiếu hoặc sai |
| `goal` | Tiếng Việt | Người học | Một câu, kết thúc bằng dấu chấm, nêu 2–3 việc cụ thể phải làm được |
| `aiRole` | Tiếng Anh | AI | Cụm danh từ có mạo từ hoặc tên riêng: `a ticket seller at a cinema`, `Alex, an international student at a welcome party`. Thêm tính cách để tạo độ khó: `a landlord who is reluctant to spend money on repairs` |
| `learnerRole` | Tiếng Anh | AI | Cụm danh từ có mạo từ: `a passenger whose train was cancelled` |
| `learnerGoal` | Tiếng Anh | AI + phần nhận xét cuối | Cụm động từ nguyên mẫu, **không có "to" ở đầu, không có dấu chấm cuối**: `ask about the rent, deposit, bills and when you can move in` |
| `opening` | Tiếng Anh | Người học (được đọc to) | Câu mở đầu của AI, đúng vai, 1–2 câu, nên kết thúc bằng câu hỏi. Văn bản thuần: không emoji, không markdown, không mô tả hành động trong ngoặc |
| `hints` | Tiếng Anh | Người học (nút gợi ý) | 3–4 câu ngắn người học có thể nói. Chỗ cần tự điền dùng ký tự `…` (một ký tự, không phải `...`). Ví dụ `"I'd like to book a table for…"` |

Lưu ý khi viết chuỗi TypeScript: chuỗi dùng nháy kép `"`. Dấu nháy đơn (`I'd`, `G'day`) dùng thoải mái; nếu cần nháy kép
bên trong thì dùng nháy cong `“ ”`.

## 4. Định hướng theo cấp độ

| Cấp | Kiểu tình huống | Vai của AI | Câu gợi ý |
|---|---|---|---|
| **A2** | Giao dịch đời thường, ngắn: mua bán, hỏi đường, đặt chỗ | Thân thiện, dễ tính | Câu mẫu rất ngắn: `How much is that?` |
| **B1** | Việc có vài bước hoặc phải giải thích: thuê nhà, báo mất đồ, so sánh lựa chọn | Hợp tác nhưng hỏi lại chi tiết | Câu có mệnh đề: `Is it better to…or…?` |
| **B2** | Thuyết phục, thương lượng, phàn nàn, góp ý, công việc | Có chút cản trở: bận, nghi ngờ, ngại chi tiền | Cụm nối ý, nhượng bộ: `I see your point, but…` |
| **C1** | Tranh luận, hòa giải, trả lời câu hỏi khó, trình bày chuyên môn | Khó tính: chất vấn, ngắt lời, phản biện | Cụm học thuật/lập luận: `While I agree that…, it doesn't follow that…` |

Nguyên tắc chung:

- Mục tiêu phải **đo được**: AI cuối buổi chấm `goalReached` dựa trên `learnerGoal`, nên liệt kê việc cụ thể.
- Bối cảnh trung lập, phù hợp người học Việt Nam; tránh chủ đề nhạy cảm (chính trị, tôn giáo, y tế nghiêm trọng).
- Không trùng ý với tình huống đã có. Đọc hết `scenarios.ts` trước khi thêm.

## 5. Thêm vào đâu trong mảng

Mảng được sắp theo cấp độ: toàn bộ A2, rồi B1, B2, C1. Thêm tình huống mới vào **cuối nhóm cùng cấp độ**
(ngay trước phần tử đầu tiên của cấp kế tiếp; C1 thì thêm trước dấu `];`). Trang hiển thị theo đúng thứ tự này.

Mẫu một phần tử:

```ts
  {
    id: "carhire",
    title: "Thuê xe ô tô",
    level: "B1",
    topic: "travel",
    goal: "Thuê xe trong 3 ngày, hỏi bảo hiểm, xăng và nơi trả xe.",
    aiRole: "an agent at a car rental desk",
    learnerRole: "a customer renting a car",
    learnerGoal: "rent a car for three days and ask about insurance, fuel and where to return it",
    opening: "Hi there, do you have a booking with us?",
    hints: ["I'd like to rent a small car for…", "Is insurance included?", "Do I need to return it with a full tank?", "Can I drop it off at the airport?"],
  },
```

Danh sách `id` đang có: đọc trực tiếp `scenarios.ts` (đã có 90 tình huống khi cập nhật tài liệu này).

**Chọn `topic`:** gọi món, ăn uống → `food`; sân bay, khách sạn, đi lại, du lịch → `travel`; mua sắm, ngân hàng, sửa chữa,
dịch vụ khách hàng → `services`; khám bệnh, nha sĩ, thú y → `health`; thuê nhà, hàng xóm, bạn cùng phòng → `home`;
làm quen, mời bạn bè → `social`; công sở, thương lượng, quản lý → `work`; trường học, tranh luận, thuyết trình học thuật
→ `study`. Chỉ thêm chủ đề mới khi được yêu cầu: thêm vào kiểu `TopicId` trong `types.ts` và mảng `TOPICS`.

## 6. Thêm một cấp độ mới (chỉ khi được yêu cầu)

1. `types.ts`: thêm giá trị vào kiểu `level`, ví dụ `"A1" | "A2" | "B1" | "B2" | "C1"`.
2. `scenarios.ts`: thêm vào `LEVELS` theo đúng thứ tự tăng dần. Nút lọc sẽ tự xuất hiện.
3. Đặt nhóm tình huống mới đúng vị trí trong mảng (A1 trước A2, C2 sau C1).

Prompt không cần sửa vì nó chỉ chèn tên cấp độ.

## 7. Kiểm tra trước khi bàn giao lại

Chạy trong thư mục `frontend/`:

```bash
npx tsc --noEmit -p .
npx eslint src/features/speaking
npx vitest run src/features/speaking
```

Test `scenarios are complete` kiểm tra: đúng số lượng `N`, `id` không trùng, mỗi tình huống có đủ `opening`, `goal`,
`aiRole`, `learnerGoal`, `topic` hợp lệ, và prompt có chứa cấp độ. Test `scenario search` kiểm tra bộ lọc và tìm kiếm; nếu thêm tình huống
khiến một kỳ vọng trong test đó sai (ví dụ `"đặt bàn"` giờ khớp thêm tình huống mới), hãy cập nhật kỳ vọng cho đúng
chứ không xóa test.

Kiểm tra bằng mắt (cần `npm run dev` đang chạy): mở `http://localhost:3000/speaking/roleplay`

- Thẻ mới hiện đúng nhóm cấp độ, số trên nút lọc tăng đúng.
- Gõ một từ trong `title` (có dấu hoặc không dấu) vào ô tìm kiếm thì thẻ mới hiện ra.
- Nếu có tài khoản đã thêm Gemini key: mở tình huống, xem AI có nói đúng `opening` và giữ đúng vai không.

## 8. Báo cáo khi xong

Liệt kê: số tình huống đã thêm theo từng cấp, danh sách `id` + `title` mới, kết quả 3 lệnh kiểm tra, và những gì
chưa kiểm tra được (ví dụ chưa chạy thử hội thoại thật với AI).
