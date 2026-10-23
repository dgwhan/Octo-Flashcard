import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import { VoaLessonList } from "@/src/features/voa";
import { Headphones, Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Học Tiếng Anh Theo Cấp Độ Với VOA Learning English",
  description:
    "Luyện kỹ năng Đọc và Nghe (Reading & Listening) tiếng Anh chia theo 3 cấp độ: Level 1 (Sơ cấp), Level 2 (Trung cấp), Level 3 (Nâng cao) từ VOA Learning English, tra từ điển một chạm và lưu Flashcard.",
  path: "/voa",
});

export default function VoaHubPage() {
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
          <Headphones size={16} />
          <span>VOA Learning English • Reading & Listening by Level</span>
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "var(--color-text-primary)",
          }}
        >
          Học tiếng Anh theo cấp độ VOA Learning English
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
          Lựa chọn cấp độ phù hợp (Level 1 - Sơ cấp, Level 2 - Trung cấp, Level 3 - Nâng cao) để tích lũy từ vựng, luyện nghe audio bản xứ với tốc độ tùy chỉnh, tra từ điển nhanh bằng cách chạm vào từ và kiểm tra độ hiểu bài ngay lập tức.
        </p>
      </div>

      <VoaLessonList />
    </div>
  );
}
