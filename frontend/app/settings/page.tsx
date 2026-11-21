import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { SettingsPage } from "@/src/features/settings";

export const metadata: Metadata = constructMetadata({
  title: "Cài đặt",
  description: "Giọng đọc, tốc độ đọc và API key Gemini, lưu theo tài khoản.",
  path: "/settings",
  noIndex: true,
});

export default function Page() {
  return (
    <ModulePage
      href={ROUTES.SETTINGS}
      eyebrow="Tài khoản"
      title="Cài đặt"
      lead="Chọn giọng đọc dùng cho cả hệ thống và thêm API key Gemini cho các tính năng AI. Mọi thứ được lưu theo tài khoản."
      narrow
    >
      <SettingsPage />
    </ModulePage>
  );
}
