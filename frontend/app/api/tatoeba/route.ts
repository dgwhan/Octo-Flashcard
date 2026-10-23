import { NextRequest, NextResponse } from "next/server";
import { TATOEBA_SENTENCES } from "@/src/features/tatoeba/tatoeba.data";
import { TatoebaSentence } from "@/src/features/tatoeba/tatoeba.types";

export const dynamic = "force-dynamic";

interface TatoebaApiResponse {
  paging?: {
    Sentences?: {
      count: number;
      page: number;
      pageCount: number;
      limit: number;
    };
  };
  results?: Array<{
    id: number;
    text: string;
    audios?: Array<{
      id: number;
      author?: string;
      download_url?: string;
    }>;
    translations?: Array<
      Array<{
        id: number;
        text: string;
        lang: string;
      }>
    >;
  }>;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") || "15", 10), 30);

  try {
    const tatoebaUrl = new URL("https://tatoeba.org/en/api_v0/search");
    tatoebaUrl.searchParams.set("from", "eng");
    tatoebaUrl.searchParams.set("to", "vie");
    tatoebaUrl.searchParams.set("has_audio", "yes");
    tatoebaUrl.searchParams.set("sort", "relevance");
    tatoebaUrl.searchParams.set("page", String(page));
    tatoebaUrl.searchParams.set("limit", String(limit));
    if (query.trim()) {
      tatoebaUrl.searchParams.set("query", query.trim());
    }

    const res = await fetch(tatoebaUrl.toString(), {
      headers: {
        "User-Agent": "OctoFlashcard-EnglishLearning/1.0",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Tatoeba API responded with status ${res.status}`);
    }

    const data: TatoebaApiResponse = await res.json();
    const rawResults = data.results || [];

    const sentences: TatoebaSentence[] = rawResults
      .filter((r) => r.text && r.audios && r.audios.length > 0)
      .map((r) => {
        const audioObj = r.audios![0];
        // Direct download audio endpoint
        const audioUrl = audioObj.download_url
          ? `https://tatoeba.org${audioObj.download_url}`
          : `https://tatoeba.org/en/audio/download/${audioObj.id}`;

        // Find Vietnamese translation if available
        let viTranslation = "Chưa có bản dịch tiếng Việt";
        if (r.translations && r.translations.length > 0) {
          for (const transGroup of r.translations) {
            const vi = transGroup.find((t) => t.lang === "vie");
            if (vi && vi.text) {
              viTranslation = vi.text;
              break;
            }
          }
        }

        // Estimate level based on sentence word count
        const wordCount = r.text.split(/\s+/).length;
        const level: "Beginner" | "Intermediate" | "Advanced" =
          wordCount <= 6 ? "Beginner" : wordCount <= 12 ? "Intermediate" : "Advanced";

        return {
          id: `tat-api-${r.id}`,
          sentenceId: r.id,
          english: r.text,
          vietnamese: viTranslation,
          audioUrl: audioUrl,
          speaker: audioObj.author ? `${audioObj.author} (Native)` : "Native Speaker",
          level: level,
          topic: query.trim() ? `Chủ đề: ${query.trim()}` : "Giao tiếp hàng ngày",
          keywords: r.text.toLowerCase().split(/\s+/).slice(0, 3),
        };
      });

    return NextResponse.json({
      success: true,
      source: "tatoeba-api",
      page,
      limit,
      total: data.paging?.Sentences?.count || sentences.length,
      pageCount: data.paging?.Sentences?.pageCount || 1,
      sentences,
    });
  } catch (error) {
    console.error("[Tatoeba API Route] Fallback to curated data due to error:", error);

    // Fallback to local curated sentences
    let filtered = TATOEBA_SENTENCES;
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.english.toLowerCase().includes(q) ||
          s.vietnamese.toLowerCase().includes(q) ||
          (s.keywords && s.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    }

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      source: "curated-fallback",
      page,
      limit,
      total: filtered.length,
      pageCount: Math.ceil(filtered.length / limit),
      sentences: paginated,
    });
  }
}
