import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
// Server component: these data files stay on the server, only the counts reach the page
import { GRAMMAR_ROADMAP_TOPICS } from "@/src/features/grammar/data";
import { PHRASES } from "@/src/features/phrases/data";
import { SCENARIOS } from "@/src/features/speaking/data/scenarios";
import HeroCard from "./HeroCard";
import shared from "../../landing.module.css";
import styles from "./LandingHero.module.css";

// Real counts taken from the app's own data files.
const FACTS = [
  { value: String(PHRASES.length), label: "cụm từ và thành ngữ có câu ví dụ" },
  { value: String(GRAMMAR_ROADMAP_TOPICS.length), label: "chủ điểm ngữ pháp A1–C1" },
  { value: String(SCENARIOS.length), label: "tình huống hội thoại với AI" },
  { value: "44", label: "âm IPA có bản thu người thật" },
];

export default function LandingHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <p className={shared.eyebrow}>Học tiếng Anh cho người Việt · Miễn phí, học liệu mở</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}>Nghe hiểu,</span>
          <span className={styles.heroLine}>nói được,</span>
          <span className={styles.heroLine}>
            <em>nhớ</em> thật lâu.
          </span>
        </h1>
        <p className={styles.heroLead}>
          Nghe truyện VOA đọc chậm, nói lại từng câu và được chấm từng từ, hội thoại với AI, rồi giữ mọi từ mới trong
          bộ thẻ tự nhắc ôn đúng lúc sắp quên. Tám kỹ năng trong một chỗ, miễn phí, nguồn học liệu nào cũng ghi rõ.
        </p>
        <div className={styles.heroActions}>
          <Link href={ROUTES.FLASHCARDS} className={shared.primaryBtnLg}>
            <span>Bắt đầu học</span>
            <ArrowRight size={18} />
          </Link>
          <a href="#modules" className={shared.textLink}>
            <span>Xem cả 8 module</span>
            <ArrowDown size={16} />
          </a>
        </div>
      </div>

      {/* Card stack: Octo is the front of the top card; the cards behind show real entries from vocabulary.data */}
      <div className={styles.heroStack}>
        <div className={`${styles.stackCard} ${styles.stackBack2}`} aria-hidden="true">
          <span className={styles.cardWord}>community</span>
          <span className={styles.cardIpa}>/kəˈmjuːnəti/</span>
          <span className={styles.cardMeaning}>Cộng đồng dân cư</span>
        </div>
        <div className={`${styles.stackCard} ${styles.stackBack1}`} aria-hidden="true">
          <span className={styles.cardWord}>available</span>
          <span className={styles.cardIpa}>/əˈveɪləbl/</span>
          <span className={styles.cardMeaning}>Có sẵn, rảnh rỗi để sử dụng</span>
        </div>
        <HeroCard />
      </div>

      <dl className={styles.facts}>
        {FACTS.map((f) => (
          <div key={f.label} className={styles.fact}>
            <dt className={styles.factValue}>{f.value}</dt>
            <dd className={styles.factLabel}>{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
