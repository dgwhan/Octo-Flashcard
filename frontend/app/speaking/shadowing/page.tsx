import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { SHADOW_SETS } from "@/src/features/speaking/shadowing.data";
import styles from "@/src/features/speaking/speaking.module.css";

export const metadata: Metadata = constructMetadata({
  title: "Shadowing: nghe và nói theo câu tiếng Anh",
  description: "Nghe câu mẫu từ truyện VOA và 500 cụm từ thông dụng, nói theo, máy chấm từng từ và chỉ ra âm cần luyện.",
  path: "/speaking/shadowing",
});

export default function ShadowingPage() {
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow="Luyện nói · Shadowing"
      title="Nghe rồi nói theo"
      lead="Chọn một bộ câu. Với mỗi câu: nghe mẫu, bấm micro và nói lại; máy đánh dấu từ nào nghe rõ, từ nào bị nuốt hoặc đọc sai."
      narrow
    >
      <ul className={styles.setGrid}>
        {SHADOW_SETS.map((s) => (
          <li key={s.id}>
            <Link href={ROUTES.SPEAKING_SHADOWING_SET(s.id)} className={styles.setCard}>
              <span className={styles.setSource}>
                {s.source} · {s.level}
              </span>
              <span className={styles.setTitle}>{s.title}</span>
              <span className={styles.setCount}>{s.sentences.length} câu</span>
            </Link>
          </li>
        ))}
      </ul>
    </ModulePage>
  );
}
