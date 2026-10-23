import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { DictionaryView } from "@/src/features/dictionary";
import { BookA } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Tra Từ Điển Anh - Anh Trực Tuyến & Phát Âm Chuẩn",
  description:
    "Tra cứu từ điển tiếng Anh với phiên âm IPA, audio bản xứ miễn phí, các lớp nghĩa và lưu trực tiếp vào Flashcard ôn luyện.",
  path: "/dictionary",
});

export default function DictionaryPage() {
  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "9999px",
            background: "rgba(16, 185, 129, 0.12)",
            color: "var(--color-primary)",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          <BookA size={16} />
          <span>English - English Comprehensive Dictionary</span>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "var(--color-text-primary)",
          }}
        >
          Tra cứu từ điển & Phiên âm IPA
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--color-text-secondary)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Khám phá định nghĩa chuẩn quốc tế, ví dụ thực tế và nghe phát âm audio chuẩn bản xứ. Bạn có thể bấm một nút để tạo thẻ Flashcard ngay lập tức.
        </p>
      </div>

      <DictionaryView />
    </div>
  );
}
