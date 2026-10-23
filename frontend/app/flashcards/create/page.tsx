import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { CreateFlashCardPage } from "@/src/features/flashCards";

export const metadata: Metadata = constructMetadata({
  title: "Tạo Bộ Thẻ Flashcard Mới",
  description:
    "Tạo nhanh bộ thẻ flashcard học từ vựng tiếng Anh với giao diện trực quan, hỗ trợ thêm nhiều thẻ cùng lúc.",
  path: "/flashcards/create",
});

export default function Page() {
  return <CreateFlashCardPage />;
}
