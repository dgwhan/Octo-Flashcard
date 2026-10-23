import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { VocabularyHub } from "@/src/features/vocabulary";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Bộ Từ Vựng Chuẩn Hóa Theo Cấp Độ (A1 - C2), NGSL & AWL",
  description:
    "Kho từ vựng tiếng Anh chuẩn hóa theo khung tham chiếu CEFR-J (A1, A2, B1, B2, C1, C2), New General Service List (NGSL) và Academic Word List (AWL) theo chủ đề, kèm phiên âm IPA và audio phát âm.",
  path: "/vocabulary",
});

export default function VocabularyPage() {
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
          <GraduationCap size={16} />
          <span>Standardized Vocabulary Frameworks • CEFR / NGSL / AWL</span>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "var(--color-text-primary)",
          }}
        >
          Bộ từ vựng chuẩn hóa theo cấp độ (A1 – C2) & Chủ đề
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--color-text-secondary)",
            margin: 0,
            lineHeight: 1.5,
            maxWidth: "780px",
          }}
        >
          Học từ vựng khoa học dựa trên các khung chuẩn quốc tế: CEFR-J (A1 đến C2), New General Service List (NGSL - từ vựng cốt lõi phổ biến nhất) và Academic Word List (AWL - từ vựng học thuật chuyên sâu). Bạn có thể bấm một nút để tạo ngay bộ thẻ Flashcard ôn tập.
        </p>
      </div>

      <VocabularyHub />
    </div>
  );
}
