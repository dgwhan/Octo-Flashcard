import { NextRequest, NextResponse } from "next/server";
import { LIBRIVOX_AUDIOBOOKS } from "@/src/features/audiobooks/audiobook.data";
import { Audiobook, AudiobookChapter } from "@/src/features/audiobooks/audiobook.types";

export const dynamic = "force-dynamic";

interface LibriVoxRawSection {
  id: string;
  section_number: string;
  title: string;
  listen_url: string;
  language: string;
  playtime: string;
  readers?: Array<{ reader_id: string; display_name: string }>;
}

interface LibriVoxRawBook {
  id: string;
  title: string;
  description: string;
  url_text_source?: string;
  url_librivox?: string;
  url_iarchive?: string;
  copyright_year?: string;
  totaltimesecs?: number;
  authors?: Array<{ first_name: string; last_name: string }>;
  sections?: LibriVoxRawSection[];
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "12", 10), 30);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  try {
    const librivoxUrl = new URL("https://librivox.org/api/feed/audiobooks/");
    librivoxUrl.searchParams.set("format", "json");
    librivoxUrl.searchParams.set("extended", "1");
    librivoxUrl.searchParams.set("limit", String(limit));
    librivoxUrl.searchParams.set("offset", String(offset));

    if (query.trim()) {
      librivoxUrl.searchParams.set("title", `^${query.trim()}`);
    }

    const res = await fetch(librivoxUrl.toString(), {
      headers: {
        "User-Agent": "OctoFlashcard-LibriVox/1.0",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`LibriVox API returned status ${res.status}`);
    }

    const data = await res.json();
    const rawBooks: LibriVoxRawBook[] = data.books || [];

    const audiobooks: Audiobook[] = rawBooks
      .filter((b) => b.title && b.sections && b.sections.length > 0)
      .map((b) => {
        const author = b.authors && b.authors.length > 0
          ? b.authors.map((a) => `${a.first_name} ${a.last_name}`).join(", ")
          : "Tác giả cổ điển";

        const cleanDesc = stripHtml(b.description || "");

        const chapters: AudiobookChapter[] = (b.sections || []).map((s, idx) => {
          const durationSec = parseInt(s.playtime, 10) || 600;
          // Normalize listen_url to use archive.org direct host without www
          let audioUrl = s.listen_url ? s.listen_url.replace("www.archive.org", "archive.org") : "";

          return {
            id: `sec-${s.id || idx}`,
            chapterNumber: parseInt(s.section_number, 10) || idx + 1,
            title: s.title || `Chapter ${idx + 1}`,
            duration: formatDuration(durationSec),
            durationSeconds: durationSec,
            audioUrl: audioUrl,
            paragraphs: [
              cleanDesc.slice(0, 300) + (cleanDesc.length > 300 ? "..." : ""),
              `Nghe trực tiếp bản ghi âm nguyên gốc do tình nguyện viên LibriVox (${
                s.readers?.[0]?.display_name || "Volunteer"
              }) thực hiện từ tác phẩm gốc thuộc phạm vi công cộng (Public Domain).`,
            ],
          };
        });

        // Representative cover based on book id
        const coverImages = [
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
        ];
        const coverUrl = coverImages[parseInt(b.id, 10) % coverImages.length];

        return {
          id: `lb-${b.id}`,
          slug: `${slugify(b.title)}-${b.id}`,
          title: b.title,
          author: author,
          genre: "Văn học cổ điển LibriVox",
          year: b.copyright_year || "Public Domain",
          coverUrl: coverUrl,
          description: cleanDesc,
          librivoxId: b.id,
          chapters: chapters,
        };
      });

    return NextResponse.json({
      success: true,
      source: "librivox-api",
      total: audiobooks.length,
      audiobooks,
    });
  } catch (error) {
    console.error("[LibriVox API Route] Falling back to local catalog:", error);

    return NextResponse.json({
      success: true,
      source: "curated-fallback",
      total: LIBRIVOX_AUDIOBOOKS.length,
      audiobooks: LIBRIVOX_AUDIOBOOKS,
    });
  }
}
