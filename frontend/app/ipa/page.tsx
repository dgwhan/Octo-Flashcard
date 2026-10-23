import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { IpaChart } from "@/src/features/ipa";
import { Volume2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Bảng Phiên Âm Quốc Tế IPA & Audio Phát Âm Chuẩn Miễn Phí",
  description:
    "Bảng phiên âm tiếng Anh IPA chuẩn quốc tế với 44 âm (nguyên âm đơn, nguyên âm đôi, phụ âm hữu thanh/vô thanh), audio phát âm từ domain công khai và bài luyện phản xạ tai nghe.",
  path: "/ipa",
});

export default function IpaPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
      {/* Header section */}
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
          <Volume2 size={16} />
          <span>International Phonetic Alphabet (IPA) Standard</span>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "var(--color-text-primary)",
          }}
        >
          Bảng phiên âm IPA & Audio phát âm chuẩn
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
          Luyện phát âm chuẩn xác 44 âm trong tiếng Anh quốc tế với nguồn audio phát âm công khai miễn phí (Wikimedia Commons & Web Speech AI), hướng dẫn khẩu hình chi tiết và chế độ luyện tai nghe phản xạ âm.
        </p>
      </div>

      <IpaChart />
    </div>
  );
}
