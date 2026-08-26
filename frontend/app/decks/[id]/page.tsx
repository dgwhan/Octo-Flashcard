import { DeckDetailPage } from "@/src/features/decks";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <DeckDetailPage deckId={id} />;
}
