import type { Phrase, PhraseGroup, PhraseLevel } from "./phrases.types";
import { COLLOCATION_GROUPS } from "./collocations.data";
import { IDIOM_GROUPS } from "./idioms.data";

export const PHRASE_GROUPS: PhraseGroup[] = [...COLLOCATION_GROUPS, ...IDIOM_GROUPS];
export const PHRASE_LEVELS: PhraseLevel[] = ["A1", "A2", "B1", "B2", "C1"];

export const PHRASES: Phrase[] = PHRASE_GROUPS.flatMap((g) =>
  g.rows.map(([phrase, meaning, example, exampleVi, level], i) => ({
    id: `${g.id}-${i + 1}`,
    kind: g.kind,
    group: g.id,
    phrase,
    meaning,
    example,
    exampleVi,
    level,
  }))
);

/** "We need to [make a decision]." → ["We need to ", "make a decision", "."] (odd indexes are the phrase). */
export const splitExample = (example: string) => example.split(/\[|\]/);

export const plainExample = (example: string) => example.replace(/\[|\]/g, "");

/** Lowercase, no Vietnamese tone marks, so "quyet dinh" finds "quyết định". */
export const foldText = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
