import type { GrammarQuestion } from "../types";

/** An answer is an option index (choice) or the typed text (input). */
export type GrammarAnswer = number | string;

// Forgive case, extra spaces, curly apostrophes and a trailing full stop — not spelling.
export const normalizeAnswer = (s: string) =>
  s.toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, " ").trim().replace(/[.!]+$/, "").trim();

export function isAnswerCorrect(q: GrammarQuestion, answer: GrammarAnswer | undefined): boolean {
  if (answer === undefined) return false;
  if (q.type === "input") {
    const given = normalizeAnswer(String(answer));
    return given !== "" && q.answers.some((a) => normalizeAnswer(a) === given);
  }
  return answer === q.correctIndex;
}

export function scoreAnswers(qs: GrammarQuestion[], answers: Record<number, GrammarAnswer>) {
  const correct = qs.filter((q, i) => isAnswerCorrect(q, answers[i])).length;
  return { correct, total: qs.length, percent: qs.length ? Math.round((correct / qs.length) * 100) : 0 };
}

/** The answer to show after submitting. */
export const correctAnswerText = (q: GrammarQuestion) =>
  q.type === "input" ? q.answers[0] : `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`;

// Self-check (runs once at import; cheap): grading rules hold.
const _q: GrammarQuestion = { id: "t", type: "input", question: "I ___ here.", answers: ["don't live", "do not live"], explanation: "" };
if (!isAnswerCorrect(_q, "  Don’t   live. ") || isAnswerCorrect(_q, "dont live") || isAnswerCorrect(_q, "")) {
  throw new Error("grammar.grading self-check failed");
}
