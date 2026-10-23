export type PhonemeCategory =
  | "monophthong_long"
  | "monophthong_short"
  | "diphthong"
  | "consonant_unvoiced"
  | "consonant_voiced";

export interface IpaExample {
  word: string;
  ipa: string;
  highlight: string;
}

export interface IpaPhoneme {
  id: string;
  symbol: string;
  name: string;
  category: PhonemeCategory;
  vietnameseGuide: string;
  mouthShape: string;
  audioUrl?: string; // Public domain / Wikimedia Commons audio
  examples: IpaExample[];
}
