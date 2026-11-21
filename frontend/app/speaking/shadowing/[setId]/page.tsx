import type { Metadata } from "next";
import { constructMetadata } from "@/src/config/seo";
import ModulePage from "@/src/components/layout/ModulePage";
import { ROUTES } from "@/src/config/routes";
import { notFound } from "next/navigation";
import { SHADOW_SETS, getShadowSet, ShadowingPage } from "@/src/features/speaking";

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

export default async function Page({ params }: PageProps) {
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
      <ShadowingPage set={set} />
    </ModulePage>
  );
}
