import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { SpeakingHubPage } from "@/src/features/speaking";

export const metadata: Metadata = constructMetadata({
  title: "Luyện nói tiếng Anh: shadowing, phát âm, hội thoại AI, IELTS",
  description:
    "Bốn cách luyện nói: nghe và nói theo, sửa các âm người Việt hay sai, hội thoại nhập vai với AI và đề IELTS Speaking có bấm giờ.",
  path: "/speaking",
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói"
      title="Mở miệng nói mỗi ngày"
      lead="Bắt đầu bằng nghe và nói theo để quen nhịp, sửa vài âm khó, rồi thử hội thoại thật với AI. Thời gian luyện được cộng vào chuỗi ngày học."
      narrow
    >
      <SpeakingHubPage />
    </ModulePage>
  );
}
