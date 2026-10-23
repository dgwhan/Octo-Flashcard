import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import RegisterPage from "@/src/features/auth/pages/RegisterPage";

export const metadata: Metadata = constructMetadata({
  title: "Đăng Ký Tài Khoản Miễn Phí",
  description:
    "Đăng ký tài khoản Octo Flashcard miễn phí để bắt đầu học tập và tạo các bộ thẻ từ vựng của riêng bạn.",
  path: "/auth/register",
});

export default function Page() {
  return <RegisterPage />;
}
