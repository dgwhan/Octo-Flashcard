import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { PhrasebookPage } from "@/src/features/speaking";

export const metadata: Metadata = constructMetadata({
  title: "Sổ tay luyện nói",
  description: "Cụm từ và câu nên nói lại bạn đã lưu từ các buổi hội thoại nhập vai với AI, xếp theo chủ đề.",
  path: "/speaking/phrasebook",
  noIndex: true,
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói · Sổ tay"
      title="Sổ tay luyện nói"
      lead="Những cụm từ và câu nên nói lại bạn đã lưu sau mỗi buổi nhập vai, xếp theo chủ đề. Nghe lại, tạo flashcard khi muốn ôn kỹ, hoặc xóa câu đã thuộc."
      narrow
    >
      <PhrasebookPage />
    </ModulePage>
  );
}
