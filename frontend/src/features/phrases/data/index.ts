import type { Phrase, PhraseGroup, PhraseLevel } from "../types";
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
