import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MODULES } from "@/src/config/modules";
import shared from "../../landing.module.css";
import styles from "./LandingFeatures.module.css";

export default function LandingFeatures() {
  const [lead, ...rest] = MODULES;
  const LeadIcon = lead.icon;

  return (
    <section id="modules" className={shared.section}>
      <header className={shared.sectionHead}>
        <p className={shared.eyebrow}>Tám xúc tu</p>
        <h2 className={shared.sectionTitle}>Mỗi xúc tu là một kỹ năng.</h2>
      </header>

      <div className={styles.modulesLayout}>
        <Link href={lead.href} className={styles.leadModule}>
          <span className={styles.moduleNumBig}>{lead.num}</span>
          <LeadIcon size={28} strokeWidth={1.5} />
          <h3 className={styles.leadTitle}>{lead.title}</h3>
          <p className={styles.leadDesc}>
            {lead.desc} Từ gặp ở 7 module còn lại được lưu thành thẻ chỉ với một chạm, rồi quay lại đúng lúc bạn sắp quên.
          </p>
          <span className={shared.textLink}>
            <span>Mở Flashcard</span>
            <ArrowRight size={16} />
          </span>
        </Link>

        <ol className={styles.moduleList}>
          {rest.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.num}>
                <Link href={m.href} className={styles.moduleRow}>
                  <span className={styles.moduleNum}>{m.num}</span>
                  <Icon size={20} strokeWidth={1.5} className={styles.moduleIcon} />
                  <span className={styles.moduleBody}>
                    <span className={styles.moduleTitle}>{m.title}</span>
                    <span className={styles.moduleDesc}>{m.desc}</span>
                  </span>
                  <ArrowUpRight size={18} className={styles.moduleArrow} />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
