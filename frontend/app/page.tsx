import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import HomePageClient from "@/src/features/home/HomePageClient";

export const metadata: Metadata = constructMetadata({
  title: "Trang chủ - Học Từ Vựng Flashcard Thông Minh",
  description:
    "Nền tảng học từ vựng Flashcard tiếng Anh thông minh với phương pháp lật thẻ 2 mặt 3D, phát âm Audio AI bản xứ và kiểm tra phản xạ ghi nhớ spaced repetition.",
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
