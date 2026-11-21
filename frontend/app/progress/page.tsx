import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { GRAMMAR_TOPIC_SUMMARIES } from "@/src/features/grammar";
import ProgressPage from "@/src/features/progress/ProgressPage";

export const metadata: Metadata = constructMetadata({
  title: "Tiến độ của tôi",
  description: "Chuỗi ngày học, thời gian học, huy hiệu và thẻ cần ôn của bạn.",
  path: "/progress",
  noIndex: true,
});

const topicIds = GRAMMAR_TOPIC_SUMMARIES.map((t) => t.id);

export default function Page() {
  return <ProgressPage grammarTopicIds={topicIds} />;
}
