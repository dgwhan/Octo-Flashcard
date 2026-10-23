import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import LoginPage from "@/src/features/auth/pages/LoginPage";

export const metadata: Metadata = constructMetadata({
  title: "Đăng Nhập Tài Khoản",
  description:
    "Đăng nhập tài khoản Octo Flashcard để lưu trữ tiến độ học tập và đồng bộ các bộ thẻ từ vựng.",
  path: "/auth/login",
});

export default function Page() {
  return <LoginPage />;
}
