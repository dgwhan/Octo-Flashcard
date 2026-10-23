export interface TatoebaSentence {
  id: string;
  sentenceId: number;
  english: string;
  vietnamese: string;
  audioUrl: string;
  speaker?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topic: string;
  keywords?: string[];
}
