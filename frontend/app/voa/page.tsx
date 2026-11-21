import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { VoaLessonsPage } from "@/src/features/voa";

export const metadata: Metadata = constructMetadata({
  title: "Học Tiếng Anh Theo Cấp Độ Với VOA Learning English",
  description:
    "Luyện kỹ năng Đọc và Nghe (Reading & Listening) tiếng Anh chia theo 3 cấp độ: Level 1 (Sơ cấp), Level 2 (Trung cấp), Level 3 (Nâng cao) từ VOA Learning English, tra từ điển một chạm và lưu Flashcard.",
  path: "/voa",
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.VOA}
      eyebrow="VOA Learning English"
      title="Truyện đọc chậm"
      lead="Truyện ngắn kinh điển do VOA đọc chậm, chia theo ba cấp. Transcript chạy theo giọng đọc, chạm vào từ để tra nghĩa, cuối bài có câu hỏi kiểm tra."
    >
      <VoaLessonsPage />
    </ModulePage>
  );
}
