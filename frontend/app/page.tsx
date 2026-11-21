import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { LandingPage } from "@/src/features/landing";

export const metadata: Metadata = constructMetadata({
  title: "Nghe hiểu, nói được, nhớ thật lâu",
  description:
    "Học tiếng Anh miễn phí cho người Việt: ôn flashcard theo lịch lặp lại ngắt quãng, nghe truyện VOA đọc chậm, luyện nói được chấm từng từ, hội thoại với AI, 500 cụm từ và 35 chủ điểm ngữ pháp A1–C1.",
  path: "/",
});

export default function Page() {
  return <LandingPage />;
}
