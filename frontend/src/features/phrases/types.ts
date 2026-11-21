export type PhraseKind = "collocation" | "idiom";
export type PhraseLevel = "A1" | "A2" | "B1" | "B2" | "C1";

/** [phrase, Vietnamese meaning, example with the phrase in [brackets], Vietnamese example, level] */
export type PhraseRow = [string, string, string, string, PhraseLevel];

export interface PhraseGroup {
  id: string;
  kind: PhraseKind;
  label: string;
  rows: PhraseRow[];
}

export interface Phrase {
  id: string;
  kind: PhraseKind;
  group: string;
  phrase: string;
  meaning: string;
  /** English example; the phrase as used is wrapped in [brackets] for highlighting. */
  example: string;
  exampleVi: string;
  level: PhraseLevel;
}
