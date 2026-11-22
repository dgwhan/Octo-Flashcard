import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { GRAMMAR_TOPIC_SUMMARIES } from "@/src/features/grammar";
import { RoadmapPage } from "@/src/features/roadmap";

export const metadata: Metadata = constructMetadata({
  title: "Lộ trình học tiếng Anh A1–C1",
  description:
    "Lộ trình học tiếng Anh năm chặng A1–C1: phát âm IPA, từ vựng, ngữ pháp, nghe VOA, shadowing và luyện nói, có đánh dấu tiến độ.",
  path: "/roadmap",
});

export default function Page() {
  return <RoadmapPage grammarTopics={GRAMMAR_TOPIC_SUMMARIES} />;
}
