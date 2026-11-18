import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { LandingPage } from "@/src/features/landing";

export const metadata: Metadata = constructMetadata({
  title: "Một con bạch tuộc, tám cách học tiếng Anh",
  description:
    "Flashcard tự tạo, truyện VOA đọc chậm, sách nói LibriVox, câu Tatoeba có giọng người thật, bảng 44 âm IPA và 15 chủ đề ngữ pháp từ A1 đến C1. Miễn phí, nguồn học liệu nào cũng ghi rõ.",
  path: "/",
});

export default function HomePage() {
  return <LandingPage />;
}
