import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { FlashcardSetsPage } from "@/src/features/flashCards";

export const metadata: Metadata = constructMetadata({
  title: "Kho Bộ Thẻ Flashcard - Tổng Hợp",
  description:
    "Tổng hợp và quản lý toàn bộ các bộ thẻ ghi nhớ flashcards học từ vựng tiếng Anh cá nhân của bạn trên Octo Flashcard.",
  path: "/flashcards",
});

export default function Page() {
  return <FlashcardSetsPage />;
}
