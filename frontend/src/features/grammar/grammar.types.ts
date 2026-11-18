export type GrammarCEFR = "A1" | "A2" | "B1" | "B2" | "C1";

export interface GrammarFormula {
  type: "affirmative" | "negative" | "interrogative" | "special";
  label: string; // vd: "Khẳng định (+)", "Phủ định (-)", "Nghi vấn (?)"
  structure: string; // vd: "S + V(s/es) + O"
  exampleEn: string;
  exampleVi: string;
}

export interface GrammarUsage {
  id: string;
  title: string;
  explanation: string;
  exampleEn: string;
  exampleVi: string;
}

export interface GrammarSignal {
  category: string; // vd: "Trạng từ chỉ tần suất", "Dấu hiệu thời gian"
  words: string[]; // vd: ["always", "usually", "often", "sometimes"]
  explanation: string;
}

export interface GrammarMistake {
  incorrect: string;
  correct: string;
  explanation: string;
}

export interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface GrammarFlashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  category?: string;
}

export interface GrammarTopic {
  id: string;
  stage: 1 | 2 | 3;
  stageName: string;
  level: GrammarCEFR;
  order: number;
  title: string;
  vietnameseTitle: string;
  description: string;
  estimatedMinutes: number;
  badgeColor: string;
  theory: {
    summary: string;
    formulas: GrammarFormula[];
    usages: GrammarUsage[];
    signals: GrammarSignal[];
    commonMistakes: GrammarMistake[];
    proTips: string[];
  };
  practice: GrammarQuestion[];
  review: {
    flashcards: GrammarFlashcard[];
    masteryQuiz: GrammarQuestion[];
  };
}

export interface UserGrammarProgress {
  topicId: string;
  isTheoryCompleted: boolean;
  isPracticeCompleted: boolean;
  practiceScore: number;
  practiceTotalQuestions: number;
  practiceCorrectAnswers: number;
  isReviewCompleted: boolean;
  masteryScore: number;
  status: "NotStarted" | "InProgress" | "Completed";
  completedAt?: string | null;
  lastStudiedAt: string;
}

export interface GrammarRoadmapStats {
  totalTopicsCount: number;
  completedTopicsCount: number;
  inProgressTopicsCount: number;
  completionPercentage: number;
  averagePracticeScore: number;
  averageMasteryScore: number;
  nextRecommendedTopicId: string | null;
}
