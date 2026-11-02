import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/src/config/seo";
import { GRAMMAR_ROADMAP_TOPICS, GrammarTopicDetail } from "@/src/features/grammar";

interface PageProps {
  params: Promise<{ topicId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topicId } = await params;
  const topic = GRAMMAR_ROADMAP_TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    return constructMetadata({
      title: "Chủ điểm ngữ pháp không tồn tại",
      path: "/grammar",
    });
  }

  return constructMetadata({
    title: `${topic.title} (${topic.vietnameseTitle}) - Lộ trình Ngữ pháp ${topic.level}`,
    description: topic.description,
    path: `/grammar/${topicId}`,
  });
}

export default async function GrammarDetailPage({ params }: PageProps) {
  const { topicId } = await params;
  const topic = GRAMMAR_ROADMAP_TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    notFound();
  }

  return <GrammarTopicDetail topic={topic} />;
}
