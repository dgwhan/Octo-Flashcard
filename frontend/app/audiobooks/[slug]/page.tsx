import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/src/config/seo";
import { AudiobookViewer } from "@/src/features/audiobooks";
import { getAudiobookBySlug } from "@/src/features/audiobooks/audiobook.api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getAudiobookBySlug(slug);

  if (!book) {
    return constructMetadata({
      title: "Sách nói không tồn tại",
      path: "/audiobooks",
    });
  }

  return constructMetadata({
    title: `${book.title} - Sách nói LibriVox (${book.author})`,
    description: book.description,
    path: `/audiobooks/${slug}`,
  });
}

export default async function AudiobookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = await getAudiobookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div style={{ padding: "24px 16px" }}>
      <AudiobookViewer book={book} />
    </div>
  );
}
