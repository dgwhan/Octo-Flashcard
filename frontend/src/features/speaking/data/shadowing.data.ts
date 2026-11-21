import { VOA_LESSONS } from "@/src/features/voa/data/voa.data";
import { PHRASES } from "@/src/features/phrases/data";
import { plainExample } from "@/src/features/phrases/lib/text";

export interface ShadowSet {
  id: string;
  title: string;
  source: "VOA" | "Collocations & Idioms";
  level: string;
  sentences: string[];
}

const MIN_WORDS = 4;
const MAX_WORDS = 22;

/**
 * Split a paragraph into sentences and drop speaker labels ("Storyteller:").
 * shortcut: abbreviations like "Mr." split early; harmless for practice, use Intl.Segmenter if it matters.
 */
export function splitSentences(paragraph: string): string[] {
  return paragraph
    .replace(/^[A-Z][A-Za-z .']{0,30}:\s+/, "")
    .split(/(?<=[.!?]["”']?)\s+(?=["“']?[A-Z])/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter((s) => {
      const n = s.split(" ").length;
      return n >= MIN_WORDS && n <= MAX_WORDS;
    });
}

const VOA_LEVEL = ["", "Level 1", "Level 2", "Level 3"];

const voaSets: ShadowSet[] = VOA_LESSONS.map((l) => ({
  id: `voa-${l.slug}`,
  title: l.title.replace(/^American Stories:\s*/, ""),
  source: "VOA",
  level: VOA_LEVEL[l.levelNumber],
  sentences: l.paragraphs.flatMap(splitSentences),
}));

const phraseSet = (id: string, title: string, levels: string[]): ShadowSet => ({
  id,
  title,
  source: "Collocations & Idioms",
  level: levels.join("–"),
  sentences: PHRASES.filter((p) => levels.includes(p.level)).map((p) => plainExample(p.example)),
});

export const SHADOW_SETS: ShadowSet[] = [
  phraseSet("phrases-a", "Câu ví dụ cơ bản", ["A1", "A2"]),
  phraseSet("phrases-b1", "Câu ví dụ trung cấp", ["B1"]),
  phraseSet("phrases-b2", "Câu ví dụ khá", ["B2"]),
  phraseSet("phrases-c1", "Câu ví dụ nâng cao", ["C1"]),
  ...voaSets,
];

export const getShadowSet = (id: string) => SHADOW_SETS.find((s) => s.id === id);
