import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { DictionaryPage } from "@/src/features/dictionary";

export const metadata: Metadata = constructMetadata({
  title: "Tra Từ Điển Anh - Anh Trực Tuyến & Phát Âm Chuẩn",
  description:
    "Tra cứu từ điển tiếng Anh với phiên âm IPA, audio bản xứ miễn phí, các lớp nghĩa và lưu trực tiếp vào Flashcard ôn luyện.",
  path: "/dictionary",
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.DICTIONARY}
      eyebrow="Từ điển Anh – Anh"
      title="Từ điển"
      lead="Định nghĩa, phiên âm, ví dụ và từ đồng nghĩa từ Free Dictionary API và Datamuse, kèm phát âm ở nhiều tốc độ."
      narrow
    >
      <DictionaryPage />
    </ModulePage>
  );
}
