import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { ReviewPage } from "@/src/features/flashcards";

export const metadata: Metadata = constructMetadata({
  title: "Ôn tập hôm nay",
  description: "Ôn các thẻ flashcard đến hạn theo lịch lặp lại ngắt quãng FSRS.",
  path: "/flashcards/review",
  noIndex: true,
});

export default function Page() {
  return <ReviewPage />;
}
