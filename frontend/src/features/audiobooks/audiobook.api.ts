import { Audiobook, AudiobookChapter } from "./audiobook.types";
import { LIBRIVOX_AUDIOBOOKS } from "./audiobook.data";

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

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export async function getAudiobookBySlug(slug: string): Promise<Audiobook | null> {
  // 1. Check local curated books
  const local = LIBRIVOX_AUDIOBOOKS.find((b) => b.slug === slug);
  if (local) return local;

  // 2. Extract LibriVox ID from slug (e.g. "count-of-monte-cristo-47" -> "47")
  const idMatch = slug.match(/(\d+)$/);
  const librivoxId = idMatch ? idMatch[1] : null;

  if (!librivoxId) return null;

  try {
    const res = await fetch(`https://librivox.org/api/feed/audiobooks/?id=${librivoxId}&format=json&extended=1`, {
      headers: {
        "User-Agent": "OctoFlashcard-LibriVox/1.0",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const raw = data.books?.[0];
    if (!raw) return null;

    const author = raw.authors && raw.authors.length > 0
      ? raw.authors.map((a: { first_name: string; last_name: string }) => `${a.first_name} ${a.last_name}`).join(", ")
      : "Tác giả cổ điển";

    const cleanDesc = stripHtml(raw.description || "");

    const chapters: AudiobookChapter[] = (raw.sections || []).map((s: {
      id: string;
      section_number: string;
      title: string;
      playtime: string;
      listen_url: string;
      readers?: Array<{ display_name: string }>;
    }, idx: number) => {
      const dur = parseInt(s.playtime, 10) || 600;
      const audioUrl = s.listen_url ? s.listen_url.replace("www.archive.org", "archive.org") : "";

      return {
        id: `sec-${s.id || idx}`,
        chapterNumber: parseInt(s.section_number, 10) || idx + 1,
        title: s.title || `Chapter ${idx + 1}`,
        duration: formatDuration(dur),
        durationSeconds: dur,
        audioUrl: audioUrl,
        paragraphs: [
          cleanDesc.slice(0, 320) + (cleanDesc.length > 320 ? "..." : ""),
          `Nghe trực tiếp bản đọc truyền cảm từ tình nguyện viên LibriVox (${
            s.readers?.[0]?.display_name || "Volunteer"
          }) thu âm từ nguyên tác văn học công cộng. Nhấn vào bất kỳ từ nào để tra cứu từ điển tức thì.`,
        ],
      };
    });

    return {
      id: `lb-${raw.id}`,
      slug: slug,
      title: raw.title,
      author: author,
      genre: "Văn học cổ điển LibriVox",
      year: raw.copyright_year || "Public Domain",
      coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      description: cleanDesc,
      librivoxId: raw.id,
      chapters: chapters,
    };
  } catch (error) {
    console.error(`[Audiobook API] Failed to fetch book ${slug} from LibriVox:`, error);
    return null;
  }
}
