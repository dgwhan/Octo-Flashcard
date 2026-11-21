import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { IpaChart } from "@/src/features/ipa";

export const metadata: Metadata = constructMetadata({
  title: "Bảng Phiên Âm Quốc Tế IPA & Audio Phát Âm Chuẩn Miễn Phí",
  description:
    "Bảng phiên âm tiếng Anh IPA chuẩn quốc tế với 44 âm (nguyên âm đơn, nguyên âm đôi, phụ âm hữu thanh/vô thanh), audio phát âm từ domain công khai và bài luyện phản xạ tai nghe.",
  path: "/ipa",
});

export default function IpaPage() {
  return (
    <ModulePage
      href={ROUTES.IPA}
      eyebrow="Bảng phiên âm quốc tế"
      title="44 âm IPA"
      lead="12 nguyên âm đơn, 8 nguyên âm đôi và 24 phụ âm. Mỗi âm có audio, ví dụ và cách đặt khẩu hình; chế độ luyện nghe giúp bạn tự kiểm tra."
    >
      <IpaChart />
    </ModulePage>
  );
}
