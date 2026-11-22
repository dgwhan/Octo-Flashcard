import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { SCENARIOS } from "../data/scenarios";
import { SpeechNotice } from "../components/SpeechParts";
import styles from "../speaking.module.css";

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
    desc: `${SCENARIOS.length} tình huống từ A2 đến C1: gọi món, sân bay, khám bệnh, phỏng vấn… AI đóng vai, cuối buổi chỉ ra câu cần sửa.`,
    needs: "Cần API key Gemini của bạn",
  },
  {
    href: ROUTES.SPEAKING_IELTS,
    num: "D",
    title: "IELTS Speaking có bấm giờ",
    desc: "Part 1, 2, 3 với đồng hồ như phòng thi, bản ghi, tốc độ nói và band ước lượng.",
    needs: "Chấm band cần API key",
  },
  {
    href: ROUTES.SPEAKING_PHRASEBOOK,
    num: "E",
    title: "Sổ tay luyện nói",
    desc: "Cụm từ và câu nên nói lại bạn đã lưu sau mỗi buổi nhập vai, xếp theo chủ đề để ôn lại.",
    needs: "Cần đăng nhập",
  },
];

/** /speaking: the speaking tools and the phrasebook. */
export default function SpeakingHubPage() {
  return (
    <>
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
    </>
  );
}
