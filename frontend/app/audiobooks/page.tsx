import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { AudiobookList } from "@/src/features/audiobooks";

export const metadata: Metadata = constructMetadata({
  title: "Kho Sách Nói Tiếng Anh LibriVox Miễn Phí (Public Domain)",
  description:
    "Luyện nghe và đọc tác phẩm văn học cổ điển tiếng Anh miễn phí từ kho sách nói công khai LibriVox (The Gift of the Magi, Sherlock Holmes, Alice in Wonderland).",
  path: "/audiobooks",
});

export default function AudiobooksPage() {
  return (
    <ModulePage
      href={ROUTES.AUDIOBOOKS}
      eyebrow="LibriVox · Public domain"
      title="Sách nói"
      lead="Tác phẩm văn học thuộc phạm vi công cộng do tình nguyện viên LibriVox thu âm. Nghe kèm văn bản và tra từ ngay trên trang."
    >
      <AudiobookList />
    </ModulePage>
  );
}
