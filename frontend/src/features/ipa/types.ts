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
  audioUrl?: string; // Recording of the sound itself (Wikimedia Commons)
  /** Spelling a browser voice pronounces as this sound, used when there is no recording (diphthongs) */
  ttsHint?: string;
  examples: IpaExample[];
}
