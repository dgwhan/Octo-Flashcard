import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { GRAMMAR_ROADMAP_TOPICS } from "@/src/features/grammar/grammar.data"; // server component: data stays on the server
import HeroCard from "./HeroCard";
import shared from "../../landing.module.css";
import styles from "./LandingHero.module.css";

// Real counts taken from the app's own data files (ipa.data, grammar.data, voa.data).
const FACTS = [
  { value: "8", label: "module học trong một chỗ" },
  { value: "44", label: "âm IPA có audio" },
  { value: String(GRAMMAR_ROADMAP_TOPICS.length), label: "chủ điểm ngữ pháp A1–C1" },
  { value: "7", label: "truyện VOA đọc chậm" },
];

export default function LandingHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <p className={shared.eyebrow}>Học tiếng Anh cho người Việt · Học liệu mở</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}>Một con bạch tuộc,</span>
          <span className={styles.heroLine}>
            <em>tám</em> cách học
          </span>
          <span className={styles.heroLine}>tiếng Anh.</span>
        </h1>
        <p className={styles.heroLead}>
          Flashcard tự tạo, truyện VOA đọc chậm, 500 collocations và idioms, luyện nói có AI và bảng 44 âm IPA. Mọi
          thứ gom về một chỗ, nguồn nào cũng ghi rõ.
        </p>
        <div className={styles.heroActions}>
          <Link href={ROUTES.FLASHCARDS} className={shared.primaryBtnLg}>
            <span>Bắt đầu với Flashcard</span>
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
