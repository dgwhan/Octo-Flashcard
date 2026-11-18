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

interface GrammarQuestionBase {
  id: string;
  question: string;
  explanation: string;
  hint?: string;
}

/** Multiple choice (default when `type` is omitted). */
export interface GrammarChoiceQuestion extends GrammarQuestionBase {
  type?: "choice";
  options: string[];
  correctIndex: number;
}

/** Typed answer: the question contains a "___" blank; any of `answers` is accepted (case/space-insensitive). */
export interface GrammarInputQuestion extends GrammarQuestionBase {
  type: "input";
  answers: string[];
}

export type GrammarQuestion = GrammarChoiceQuestion | GrammarInputQuestion;

export interface GrammarFlashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  category?: string;
}

/** What a topic file authors. Stage and order are derived from the curriculum in grammar.data.ts. */
export interface GrammarTopicInput {
  id: string;
  level: GrammarCEFR;
  title: string;
  vietnameseTitle: string;
  description: string;
  estimatedMinutes: number;
  theory: {
    summary: string;
    formulas: GrammarFormula[];
    usages: GrammarUsage[];
    signals: GrammarSignal[];
    commonMistakes: GrammarMistake[];
    proTips: string[];
  };
  /** Core practice (mixed choice + typed). Its score is what progress records. */
  practice: GrammarQuestion[];
  /** Harder set: tricky contrasts, typed transformations. */
  advanced: GrammarQuestion[];
  review: {
    flashcards: GrammarFlashcard[];
    masteryQuiz: GrammarQuestion[];
  };
}

export interface GrammarTopic extends GrammarTopicInput {
  stage: 1 | 2 | 3 | 4 | 5; // one stage per CEFR level
  order: number; // 1-based position in the whole curriculum
}

/** Light shape for lists (keeps theory/exercises out of client bundles). */
export type GrammarTopicSummary = Pick<
  GrammarTopic,
  "id" | "level" | "stage" | "order" | "title" | "vietnameseTitle" | "description" | "estimatedMinutes"
>;

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
