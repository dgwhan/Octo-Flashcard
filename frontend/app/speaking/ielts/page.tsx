import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { IeltsPage } from "@/src/features/speaking";

export const metadata: Metadata = constructMetadata({
  title: "Luyện IELTS Speaking có bấm giờ",
  description: "Đề IELTS Speaking Part 1, 2, 3 có bấm giờ như thi thật, ghi âm, chép lời và chấm band ước lượng bằng AI.",
  path: "/speaking/ielts",
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói · IELTS"
      title="IELTS Speaking có bấm giờ"
      lead="Chọn Part 1, 2 hoặc 3. Đồng hồ chạy như phòng thi; bạn nghe lại bản ghi, xem tốc độ nói và có thể nhờ AI ước lượng band."
      narrow
    >
      <IeltsPage />
    </ModulePage>
  );
}
