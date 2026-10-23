import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { FlashcardStudyDetailPage } from "@/src/features/flashCards";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return constructMetadata({
    title: "Chế Độ Học Flashcard - Luyện Phản Xạ & Ghi Nhớ",
    description:
      "Chế độ học tập thẻ flashcard tương tác 2 mặt, hỗ trợ phát âm Audio chuẩn và tự đánh giá độ ghi nhớ để đạt phản xạ từ vựng tốt nhất.",
    path: `/flashcards/${id}`,
  });
}

export default function Page() {
  return <FlashcardStudyDetailPage />;
}
