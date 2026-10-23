import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { AudiobookList } from "@/src/features/audiobooks";
import { Headphones } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Kho Sách Nói Tiếng Anh LibriVox Miễn Phí (Public Domain)",
  description:
    "Luyện nghe và đọc tác phẩm văn học cổ điển tiếng Anh miễn phí từ kho sách nói công khai LibriVox (The Gift of the Magi, Sherlock Holmes, Alice in Wonderland).",
  path: "/audiobooks",
});

export default function AudiobooksPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
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
          <Headphones size={16} />
          <span>LibriVox • Free Public Domain Audiobooks</span>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "var(--color-text-primary)",
          }}
        >
          Kho sách nói tiếng Anh kinh điển LibriVox
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
          Thưởng thức các tác phẩm văn học thế giới kinh điển thuộc phạm vi công cộng (Public Domain) do tình nguyện viên toàn cầu thu âm giọng đọc bản xứ, kết hợp văn bản song hành và tra từ điển một chạm.
        </p>
      </div>

      <AudiobookList />
    </div>
  );
}
