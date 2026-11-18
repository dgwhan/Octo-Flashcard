import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { GrammarRoadmapHub, GRAMMAR_TOPIC_SUMMARIES } from "@/src/features/grammar";

export const metadata: Metadata = constructMetadata({
  title: `Lộ trình ngữ pháp tiếng Anh: ${GRAMMAR_TOPIC_SUMMARIES.length} chủ điểm từ A1 đến C1`,
  description:
    "Học ngữ pháp tiếng Anh theo lộ trình năm cấp A1–C1: lý thuyết, bài thực hành có đáp án tự gõ, bộ bài nâng cao, flashcard và bài kiểm tra, tự lưu tiến độ.",
  path: "/grammar",
});

export default function GrammarPage() {
  return <GrammarRoadmapHub topics={GRAMMAR_TOPIC_SUMMARIES} />;
}
