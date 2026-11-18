import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { SuckerRow } from "@/src/components/ui";
import styles from "./landing.module.css";

export default function LandingCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaInner}>
        <SuckerRow count={8} filled={1} className={styles.ctaSuckers} />
        <h2 className={styles.ctaTitle}>
          Bắt đầu từ một từ
          <br />
          bạn vừa gặp hôm nay.
        </h2>
        <div className={styles.ctaSide}>
          <p>Tạo một bộ thẻ, thêm vài từ, rồi lật thử. Miễn phí, chạy ngay trên trình duyệt.</p>
          <Link href={ROUTES.FLASHCARDS_CREATE} className={styles.primaryBtnLg}>
            <span>Tạo bộ thẻ đầu tiên</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
