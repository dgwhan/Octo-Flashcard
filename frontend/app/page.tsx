import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { LandingPage } from "@/src/features/landing";

export const metadata: Metadata = constructMetadata({
  title: "Octo Flashcard - Nền tảng học tiếng Anh dựa trên Khoa học Não bộ & Học liệu Mở",
  description:
    "Chinh phục tiếng Anh toàn diện với Flashcard 3D thông minh (Active Recall & Spaced Repetition), kết hợp học liệu mở chất lượng cao từ VOA Learning English, LibriVox Audiobooks và Tatoeba Project.",
  path: "/",
});

export default function HomePage() {
  return <LandingPage />;
}
