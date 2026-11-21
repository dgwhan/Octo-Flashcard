export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type FrameworkType = "CEFR" | "NGSL" | "AWL";

export interface VocabularyItem {
  id: string;
  word: string;
  ipa: string;
  partOfSpeech: string;
  vietnamese: string;
  definition: string;
  example: string;
  level: CEFRLevel;
  frameworks: FrameworkType[];
  topic: string;
  collocations?: string[];
}

export interface VocabularySetSummary {
  id: string;
  title: string;
  subtitle: string;
  level: CEFRLevel;
  framework: FrameworkType;
  wordCount: number;
  description: string;
}
