export type VoaLevel = "beginning" | "intermediate" | "advanced";

export interface VoaVocabularyItem {
  word: string;
  ipa: string;
  partOfSpeech: string;
  definition: string;
  vietnameseMeaning: string;
  example: string;
}

export interface VoaQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface VoaLesson {
  id: string;
  slug: string;
  title: string;
  level: VoaLevel;
  levelNumber: 1 | 2 | 3;
  category: string;
  duration: string;
  audioDurationSeconds: number;
  wordCount: number;
  summary: string;
  audioUrl: string;
  imageUrl?: string;
  paragraphs: string[];
  vocabulary: VoaVocabularyItem[];
  quiz: VoaQuizQuestion[];
}
