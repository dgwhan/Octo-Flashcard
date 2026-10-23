import { NextRequest, NextResponse } from "next/server";
import { STANDARDIZED_VOCABULARY } from "@/src/features/vocabulary/vocabulary.data";
import { VocabularyItem, CEFRLevel, FrameworkType } from "@/src/features/vocabulary/vocabulary.types";

export const dynamic = "force-dynamic";

interface DatamuseRawWord {
  word: string;
  score?: number;
  tags?: string[];
  defs?: string[];
}

function estimateCefrLevel(frequencyPerMillion: number): CEFRLevel {
  if (frequencyPerMillion >= 75) return "A1";
  if (frequencyPerMillion >= 40) return "A2";
  if (frequencyPerMillion >= 18) return "B1";
  if (frequencyPerMillion >= 8) return "B2";
  if (frequencyPerMillion >= 2) return "C1";
  return "C2";
}

function extractPartOfSpeech(tags: string[] = []): string {
  if (tags.includes("v")) return "verb";
  if (tags.includes("n")) return "noun";
  if (tags.includes("adj")) return "adj";
  if (tags.includes("adv")) return "adv";
  return "noun";
}

function cleanDefinition(rawDef?: string): string {
  if (!rawDef) return "Từ vựng tiếng Anh theo chuẩn ngữ cảnh quốc tế.";
  // Datamuse format is often "n\t(uncountable) definition text..."
  return rawDef.replace(/^[a-z]+\t/, "").trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const topic = searchParams.get("topic") || "";
  const levelFilter = searchParams.get("level") || "all";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 40);

  const searchTerm = query.trim() || topic.trim() || "communication";

  try {
    const datamuseUrl = new URL("https://api.datamuse.com/words");
    datamuseUrl.searchParams.set("ml", searchTerm);
    datamuseUrl.searchParams.set("max", String(limit));
    datamuseUrl.searchParams.set("md", "dpf");

    const res = await fetch(datamuseUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Datamuse API failed with status ${res.status}`);
    }

    const data: DatamuseRawWord[] = await res.json();

    const vocabulary: VocabularyItem[] = data
      .filter((item) => item.word && /^[a-zA-Z\s-]+$/.test(item.word) && item.word.length > 2)
      .map((item, idx) => {
        // Extract frequency
        let freq = 15;
        if (item.tags) {
          const freqTag = item.tags.find((t) => t.startsWith("f:"));
          if (freqTag) {
            freq = parseFloat(freqTag.replace("f:", "")) || 15;
          }
        }

        const calculatedLevel = estimateCefrLevel(freq);
        const pos = extractPartOfSpeech(item.tags);
        const def = cleanDefinition(item.defs?.[0]);

        const frameworks: FrameworkType[] = ["CEFR"];
        if (calculatedLevel === "A1" || calculatedLevel === "A2" || calculatedLevel === "B1") {
          frameworks.push("NGSL");
        }
        if (calculatedLevel === "B2" || calculatedLevel === "C1" || calculatedLevel === "C2") {
          frameworks.push("AWL");
        }

        return {
          id: `v-api-${idx}-${item.word}`,
          word: item.word,
          ipa: `/${item.word}/`,
          partOfSpeech: pos,
          vietnamese: `(Nghĩa) ${def.slice(0, 80)}...`,
          definition: def,
          example: `In academic and daily communication, the term "${item.word}" is widely used.`,
          level: calculatedLevel,
          frameworks: frameworks,
          topic: topic.trim() ? `Chủ đề: ${topic.trim()}` : "Từ điển mở Datamuse",
          collocations: [`essential ${item.word}`, `${item.word} practice`],
        };
      });

    let filtered = vocabulary;
    if (levelFilter !== "all") {
      filtered = filtered.filter((v) => v.level === levelFilter);
    }

    return NextResponse.json({
      success: true,
      source: "datamuse-api",
      searchTerm,
      total: filtered.length,
      vocabulary: filtered,
    });
  } catch (error) {
    console.error("[Vocabulary API] Datamuse fetch error, fallback to curated:", error);

    let filtered = STANDARDIZED_VOCABULARY;
    if (levelFilter !== "all") {
      filtered = filtered.filter((v) => v.level === levelFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.vietnamese.toLowerCase().includes(q) ||
          v.definition.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      source: "curated-fallback",
      searchTerm,
      total: filtered.length,
      vocabulary: filtered,
    });
  }
}
