import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import RolePlay from "@/src/features/speaking/components/RolePlay";

export const metadata: Metadata = constructMetadata({
  title: "Hội thoại nhập vai với AI",
  description: "Luyện nói tiếng Anh qua 10 tình huống thực tế với AI: gọi món, sân bay, khám bệnh, phỏng vấn. Cuối buổi có nhận xét và câu sửa.",
  path: "/speaking/roleplay",
});

export default function RolePlayPage() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói · Nhập vai"
      title="Hội thoại nhập vai với AI"
      lead="Chọn một tình huống, AI đóng vai người đối diện. Bạn nói (hoặc gõ) câu trả lời; khi xong, AI chỉ ra câu nên sửa và cụm từ nên dùng."
      narrow
    >
      <RolePlay />
    </ModulePage>
  );
}
