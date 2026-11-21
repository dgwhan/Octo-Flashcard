import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { SpeechNotice } from "@/src/features/speaking/components/SpeechParts";
import styles from "@/src/features/speaking/speaking.module.css";

export const metadata: Metadata = constructMetadata({
  title: "Luyện nói tiếng Anh: shadowing, phát âm, hội thoại AI, IELTS",
  description:
    "Bốn cách luyện nói: nghe và nói theo, sửa các âm người Việt hay sai, hội thoại nhập vai với AI và đề IELTS Speaking có bấm giờ.",
  path: "/speaking",
});

const TOOLS = [
  {
    href: ROUTES.SPEAKING_SHADOWING,
    num: "A",
    title: "Nghe rồi nói theo",
    desc: "Câu từ truyện VOA và 500 cụm từ. Nói lại từng câu, máy đánh dấu từ nghe rõ và từ bị nuốt.",
    needs: "Không cần AI",
  },
  {
    href: ROUTES.SPEAKING_PRONUNCIATION,
    num: "B",
    title: "Những âm hay đọc sai",
    desc: "Âm cuối, đuôi -s và -ed, /θ ð/, /ʃ/, nguyên âm dài ngắn. Nghe âm mẫu, đọc cặp từ và câu.",
    needs: "Không cần AI",
  },
  {
    href: ROUTES.SPEAKING_ROLEPLAY,
    num: "C",
    title: "Hội thoại nhập vai",
    desc: "10 tình huống: gọi món, sân bay, khám bệnh, phỏng vấn… AI đóng vai, cuối buổi chỉ ra câu cần sửa.",
    needs: "Cần API key Gemini của bạn",
  },
  {
    href: ROUTES.SPEAKING_IELTS,
    num: "D",
    title: "IELTS Speaking có bấm giờ",
    desc: "Part 1, 2, 3 với đồng hồ như phòng thi, bản ghi, tốc độ nói và band ước lượng.",
    needs: "Chấm band cần API key",
  },
];

export default function SpeakingPage() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói"
      title="Mở miệng nói mỗi ngày"
      lead="Bắt đầu bằng nghe và nói theo để quen nhịp, sửa vài âm khó, rồi thử hội thoại thật với AI. Thời gian luyện được cộng vào chuỗi ngày học."
      narrow
    >
      <ul className={styles.toolGrid}>
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className={styles.tool}>
              <span className={styles.toolNum} aria-hidden="true">
                {t.num}
              </span>
              <span className={styles.toolTitle}>{t.title}</span>
              <span className={styles.toolDesc}>{t.desc}</span>
              <span className={styles.toolFoot}>
                {t.needs} <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <SpeechNotice />
    </ModulePage>
  );
}
