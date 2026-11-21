import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { PhraseExplorer } from "@/src/features/phrases";

export const metadata: Metadata = constructMetadata({
  title: "500 Collocations và Idioms tiếng Anh thông dụng kèm ví dụ",
  description:
    "300 collocations theo mẫu kết hợp và 200 idioms theo chủ đề, mỗi cụm có nghĩa tiếng Việt, câu ví dụ có bản dịch, cấp độ CEFR, nghe phát âm và lưu thành flashcard.",
  path: "/sentences",
});

export default function SentencesPage() {
  return (
    <ModulePage
      href={ROUTES.SENTENCES}
      eyebrow="Collocations · Idioms"
      title="Cụm từ đi liền và thành ngữ"
      lead="500 cụm người bản ngữ dùng hằng ngày: 300 collocations (make a decision, heavy rain…) và 200 idioms (a piece of cake, break the ice…). Mỗi cụm có nghĩa, câu ví dụ, bản dịch và nút lưu thành flashcard."
      narrow
    >
      <PhraseExplorer />
    </ModulePage>
  );
}
