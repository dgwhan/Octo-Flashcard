import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/src/config/seo";
import { VOA_LESSONS, VoaLessonViewer } from "@/src/features/voa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = VOA_LESSONS.find((l) => l.slug === slug);

  if (!lesson) {
    return constructMetadata({
      title: "Bài học không tồn tại",
      path: "/voa",
    });
  }

  return constructMetadata({
    title: `${lesson.title} - VOA Learning English Level ${lesson.levelNumber}`,
    description: lesson.summary,
    path: `/voa/${slug}`,
  });
}

export default async function VoaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = VOA_LESSONS.find((l) => l.slug === slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div style={{ padding: "24px 16px" }}>
      <VoaLessonViewer lesson={lesson} />
    </div>
  );
}
