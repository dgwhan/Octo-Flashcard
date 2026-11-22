/* Role-play */

export type TopicId = "food" | "travel" | "services" | "health" | "home" | "social" | "work" | "study";

export interface Scenario {
  id: string;
  title: string;
  level: "A2" | "B1" | "B2" | "C1";
  /** Groups the scenario and the phrases saved from it (see TOPICS in data/scenarios.ts) */
  topic: TopicId;
  /** Shown to the learner (Vietnamese) */
  goal: string;
  /** For the AI (English) */
  aiRole: string;
  learnerRole: string;
  learnerGoal: string;
  opening: string;
  hints: string[];
}

export interface RolePlayFeedback {
  summary: string;
  goalReached: boolean;
  scores: { fluency: number; grammar: number; vocabulary: number; interaction: number };
  corrections: { original: string; better: string; explanation: string }[];
  phrases: { phrase: string; meaning: string }[];
}

/* IELTS */

export type IeltsPart = 1 | 2 | 3;

export interface Part1Topic {
  id: string;
  title: string;
  questions: string[];
}

export interface CueCard {
  id: string;
  title: string;
  prompt: string;
  bullets: string[];
  /** Part 3 discussion questions that follow this card */
  discussion: string[];
}

export interface IeltsAnswer {
  question: string;
  transcript: string;
  seconds: number;
}

export interface IeltsScore {
  overall: number;
  criteria: {
    fluency: { band: number; comment: string };
    lexical: { band: number; comment: string };
    grammar: { band: number; comment: string };
  };
  strengths: string[];
  improvements: string[];
  sample: { question: string; answer: string };
}
