import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { VocabularyHub } from "@/src/features/vocabulary";

export const metadata: Metadata = constructMetadata({
  title: "Bộ Từ Vựng Chuẩn Hóa Theo Cấp Độ (A1 - C2), NGSL & AWL",
  description:
    "Kho từ vựng tiếng Anh chuẩn hóa theo khung tham chiếu CEFR-J (A1, A2, B1, B2, C1, C2), New General Service List (NGSL) và Academic Word List (AWL) theo chủ đề, kèm phiên âm IPA và audio phát âm.",
  path: "/vocabulary",
});

export default function VocabularyPage() {
  return (
    <ModulePage
      href={ROUTES.VOCABULARY}
      eyebrow="Từ vựng CEFR · NGSL · AWL"
      title="Từ vựng theo cấp độ"
      lead="Từ vựng xếp theo cấp A1–C2, đối chiếu NGSL (từ thông dụng) và AWL (từ học thuật). Tìm thêm từ theo chủ đề và tạo bộ flashcard chỉ với một nút."
    >
      <VocabularyHub />
    </ModulePage>
  );
}
