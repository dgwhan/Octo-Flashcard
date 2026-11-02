import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { GrammarRoadmapHub } from "@/src/features/grammar";

export const metadata: Metadata = constructMetadata({
  title: "Lộ Trình Học Ngữ Pháp Tiếng Anh Chuẩn Theo Cấp Độ (A1 - C1)",
  description:
    "Chinh phục ngữ pháp tiếng Anh từ cơ bản đến nâng cao theo Roadmap: có lý thuyết hướng dẫn, bài tập thực hành tương tác và flashcards ôn tập củng cố, lưu tiến độ học tập.",
  path: "/grammar",
});

export default function GrammarPage() {
  return <GrammarRoadmapHub />;
}
