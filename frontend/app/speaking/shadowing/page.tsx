import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { ShadowingSetsPage } from "@/src/features/speaking";

export const metadata: Metadata = constructMetadata({
  title: "Shadowing: nghe và nói theo câu tiếng Anh",
  description: "Nghe câu mẫu từ truyện VOA và 500 cụm từ thông dụng, nói theo, máy chấm từng từ và chỉ ra âm cần luyện.",
  path: "/speaking/shadowing",
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói · Shadowing"
      title="Nghe rồi nói theo"
      lead="Chọn một bộ câu. Với mỗi câu: nghe mẫu, bấm micro và nói lại; máy đánh dấu từ nào nghe rõ, từ nào bị nuốt hoặc đọc sai."
      narrow
    >
      <ShadowingSetsPage />
    </ModulePage>
  );
}
