import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { SHADOW_SETS, getShadowSet } from "@/src/features/speaking/shadowing.data";
import SentenceDrill from "@/src/features/speaking/components/SentenceDrill";
import { SpeechNotice } from "@/src/features/speaking/components/SpeechParts";
import styles from "@/src/features/speaking/speaking.module.css";

interface PageProps {
  params: Promise<{ setId: string }>;
}

export const generateStaticParams = () => SHADOW_SETS.map((s) => ({ setId: s.id }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const set = getShadowSet((await params).setId);
  return constructMetadata({
    title: set ? `Shadowing: ${set.title}` : "Shadowing",
    path: set ? ROUTES.SPEAKING_SHADOWING_SET(set.id) : ROUTES.SPEAKING_SHADOWING,
    noIndex: true,
  });
}

export default async function ShadowingSetPage({ params }: PageProps) {
  const set = getShadowSet((await params).setId);
  if (!set) notFound();
  return (
    <ModulePage
      href={ROUTES.SPEAKING}
      eyebrow={`Shadowing · ${set.source} · ${set.level}`}
      title={set.title}
      lead="Nghe mẫu (có thể chọn tốc độ chậm), bấm Nói theo, rồi xem từ nào cần luyện lại. Nói lại bao nhiêu lần cũng được; điểm cao nhất của mỗi câu được giữ."
      narrow
    >
      <Link href={ROUTES.SPEAKING_SHADOWING} className={styles.back}>
        <ArrowLeft size={15} aria-hidden="true" /> Chọn bộ câu khác
      </Link>
      <SpeechNotice />
      <SentenceDrill label={set.title} items={set.sentences.map((s) => ({ display: s, target: s }))} />
    </ModulePage>
  );
}
