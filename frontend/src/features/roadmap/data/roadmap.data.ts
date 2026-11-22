import { ROUTES } from "@/src/config/routes";
import type { GrammarCEFR } from "@/src/features/grammar/types";

/**
 * A step is either ticked by hand ("manual") or derived from grammar progress ("grammar":
 * done when every grammar topic of the stage's level is completed).
 */
export type RoadmapStep =
  | { id: string; kind: "grammar"; title: string; desc: string }
  | { id: string; kind: "manual"; title: string; desc: string; href: string; cta: string };

export interface RoadmapStage {
  level: GrammarCEFR;
  name: string;
  goal: string;
  steps: RoadmapStep[];
}

const grammar = (level: GrammarCEFR, desc: string): RoadmapStep => ({
  id: `${level.toLowerCase()}-grammar`,
  kind: "grammar",
  title: `Ngữ pháp ${level}`,
  desc,
});

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    level: "A1",
    name: "Khởi đầu",
    goal: "Phát âm đúng các âm cơ bản, giới thiệu bản thân và hiểu câu ngắn.",
    steps: [
      {
        id: "a1-ipa",
        kind: "manual",
        title: "Làm quen bảng IPA",
        desc: "Nghe và đọc theo 44 âm, chú ý các cặp âm dễ nhầm.",
        href: ROUTES.IPA,
        cta: "Mở bảng IPA",
      },
      {
        id: "a1-vocab",
        kind: "manual",
        title: "Từ vựng A1",
        desc: "Học nhóm từ A1 và lưu những từ mới vào flashcard.",
        href: ROUTES.VOCABULARY,
        cta: "Học từ vựng",
      },
      grammar("A1", "Hiện tại đơn, mạo từ, đại từ, there is/are, hiện tại tiếp diễn, giới từ."),
      {
        id: "a1-review",
        kind: "manual",
        title: "Ôn flashcard 7 ngày liền",
        desc: "Ôn mỗi ngày để lặp lại ngắt quãng ghi nhớ từ lâu hơn.",
        href: ROUTES.FLASHCARDS_REVIEW,
        cta: "Ôn hôm nay",
      },
    ],
  },
  {
    level: "A2",
    name: "Sơ cấp",
    goal: "Xử lý tình huống hằng ngày: gọi món, hỏi đường, đặt phòng.",
    steps: [
      {
        id: "a2-vocab",
        kind: "manual",
        title: "Từ vựng A2",
        desc: "Mở rộng vốn từ chủ đề gia đình, mua sắm, du lịch.",
        href: ROUTES.VOCABULARY,
        cta: "Học từ vựng",
      },
      grammar("A2", "Quá khứ đơn và tiếp diễn, tương lai đơn, danh từ đếm được, câu hỏi, used to."),
      {
        id: "a2-pronunciation",
        kind: "manual",
        title: "Luyện phát âm theo nhóm âm",
        desc: "Ghi âm và so sánh với giọng mẫu.",
        href: ROUTES.SPEAKING_PRONUNCIATION,
        cta: "Luyện phát âm",
      },
      {
        id: "a2-roleplay",
        kind: "manual",
        title: "Hội thoại: quán cà phê, sân bay",
        desc: "Nhập vai các tình huống A2 cùng AI.",
        href: ROUTES.SPEAKING_ROLEPLAY,
        cta: "Nhập vai",
      },
    ],
  },
  {
    level: "B1",
    name: "Trung cấp",
    goal: "Nghe hiểu bài đọc ngắn, kể lại trải nghiệm và nêu ý kiến.",
    steps: [
      grammar("B1", "Các thì hoàn thành, so sánh, động từ khuyết thiếu, bị động, câu điều kiện 0–1."),
      {
        id: "b1-phrases",
        kind: "manual",
        title: "Collocations & idioms B1",
        desc: "Học cụm từ đi liền nhau để nói tự nhiên hơn.",
        href: ROUTES.SENTENCES,
        cta: "Học cụm từ",
      },
      {
        id: "b1-voa",
        kind: "manual",
        title: "Nghe VOA Level 1–2",
        desc: "Nghe trọn một bài, sau đó đọc lại transcript.",
        href: ROUTES.VOA,
        cta: "Nghe VOA",
      },
      {
        id: "b1-shadowing",
        kind: "manual",
        title: "Shadowing câu trung cấp",
        desc: "Nói đuổi theo giọng mẫu để luyện ngữ điệu.",
        href: ROUTES.SPEAKING_SHADOWING_SET("phrases-b1"),
        cta: "Shadowing",
      },
    ],
  },
  {
    level: "B2",
    name: "Trung cao",
    goal: "Thảo luận chủ đề trừu tượng, phỏng vấn, họp và phàn nàn lịch sự.",
    steps: [
      grammar("B2", "Câu điều kiện 2–3, mệnh đề quan hệ, câu tường thuật, thể sai khiến, từ nối."),
      {
        id: "b2-voa",
        kind: "manual",
        title: "Nghe VOA Level 3",
        desc: "Nghe không xem transcript, ghi lại ý chính.",
        href: ROUTES.VOA,
        cta: "Nghe VOA",
      },
      {
        id: "b2-roleplay",
        kind: "manual",
        title: "Hội thoại: phỏng vấn, cuộc họp",
        desc: "Nhập vai các tình huống B2 cùng AI.",
        href: ROUTES.SPEAKING_ROLEPLAY,
        cta: "Nhập vai",
      },
      {
        id: "b2-ielts",
        kind: "manual",
        title: "Thử IELTS Speaking Part 1–2",
        desc: "Trả lời trong thời gian giới hạn, nghe lại bài nói.",
        href: ROUTES.SPEAKING_IELTS,
        cta: "Luyện IELTS",
      },
    ],
  },
  {
    level: "C1",
    name: "Nâng cao",
    goal: "Diễn đạt linh hoạt, chính xác và giữ được bài nói dài.",
    steps: [
      grammar("C1", "Đảo ngữ, giả định, mệnh đề phân từ, câu chẻ, bị động khách quan."),
      {
        id: "c1-phrases",
        kind: "manual",
        title: "Idioms nâng cao",
        desc: "Học cụm từ C1 và dùng chúng trong bài nói.",
        href: ROUTES.SENTENCES,
        cta: "Học cụm từ",
      },
      {
        id: "c1-shadowing",
        kind: "manual",
        title: "Shadowing câu nâng cao",
        desc: "Giữ tốc độ và ngữ điệu với câu dài.",
        href: ROUTES.SPEAKING_SHADOWING_SET("phrases-c1"),
        cta: "Shadowing",
      },
      {
        id: "c1-ielts",
        kind: "manual",
        title: "IELTS Speaking đủ 3 phần",
        desc: "Làm trọn một bài thi thử Part 1, 2 và 3.",
        href: ROUTES.SPEAKING_IELTS,
        cta: "Luyện IELTS",
      },
    ],
  },
];
