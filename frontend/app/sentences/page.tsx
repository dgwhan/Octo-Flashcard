import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { TatoebaExplorer } from "@/src/features/tatoeba";
import { MessageSquare } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Tatoeba: Câu Ví Dụ Tiếng Anh Đa Ngữ Với Audio Giọng Người Thật",
  description:
    "Tra cứu câu ví dụ tiếng Anh kèm bản dịch tiếng Việt và audio phát âm người thật bản ngữ từ cơ sở dữ liệu mở Tatoeba Project, hỗ trợ lưu ngay vào Flashcard.",
  path: "/sentences",
});

export default function SentencesPage() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 16px" }}>
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
          <MessageSquare size={16} />
          <span>Tatoeba Project • Open Multilingual Sentences & Real Human Voices</span>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "var(--color-text-primary)",
          }}
        >
          Câu ví dụ tiếng Anh với giọng đọc người thật bản ngữ
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--color-text-secondary)",
            margin: 0,
            lineHeight: 1.5,
            maxWidth: "760px",
          }}
        >
          Khám phá các mẫu câu giao tiếp tiếng Anh kèm bản dịch tiếng Việt tự nhiên và audio phát âm chân thực từ cộng đồng người bản xứ trên toàn thế giới thuộc dự án mở Tatoeba Project.
        </p>
      </div>

      <TatoebaExplorer />
    </div>
  );
}
