import { Layers, Headphones, GraduationCap, Compass, BookOpen, MessageSquare, Volume2, Search } from "lucide-react";
import { ROUTES } from "@/src/config/routes";

/** The eight learning modules = Octo's eight tentacles. Numbering is shared by landing + sidebar. */
export const MODULES = [
  { num: "01", icon: Layers, href: ROUTES.FLASHCARDS, title: "Flashcard", desc: "Tự tạo bộ thẻ, lật thẻ 3D, đánh dấu thẻ đã thuộc và thẻ cần ôn." },
  { num: "02", icon: Headphones, href: ROUTES.VOA, title: "Truyện VOA", desc: "7 truyện ngắn kinh điển do VOA đọc chậm, transcript chạy theo giọng đọc." },
  { num: "03", icon: GraduationCap, href: ROUTES.VOCABULARY, title: "Từ vựng CEFR", desc: "Từ vựng chia theo cấp A1–C2, đối chiếu NGSL và AWL, mở rộng bằng Datamuse." },
  { num: "04", icon: Compass, href: ROUTES.GRAMMAR, title: "Ngữ pháp", desc: "35 chủ điểm theo năm cấp A1–C1, có bài thực hành, bộ nâng cao và flashcard." }, // count: keep in sync with grammar.data.ts (this file ships to the client)
  { num: "05", icon: BookOpen, href: ROUTES.AUDIOBOOKS, title: "Sách nói", desc: "Nghe tác phẩm public domain từ LibriVox, tra từ ngay trên văn bản." },
  { num: "06", icon: MessageSquare, href: ROUTES.TATOEBA, title: "Câu mẫu", desc: "Câu song ngữ Anh – Việt từ Tatoeba, nhiều câu có giọng người bản xứ thu âm." },
  { num: "07", icon: Volume2, href: ROUTES.IPA, title: "Bảng IPA", desc: "Đủ 44 âm: 12 nguyên âm đơn, 8 nguyên âm đôi, 24 phụ âm, kèm cách đặt khẩu hình." },
  { num: "08", icon: Search, href: ROUTES.DICTIONARY, title: "Từ điển", desc: "Định nghĩa, phiên âm và từ đồng nghĩa từ Free Dictionary API và Datamuse." },
] as const;
