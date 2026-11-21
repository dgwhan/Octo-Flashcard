import { describe, expect, it } from "vitest";
import { isAnswerCorrect, normalizeAnswer, scoreAnswers, correctAnswerText } from "./grammar.grading";
import { GRAMMAR_ROADMAP_TOPICS, GRAMMAR_LEVELS } from "./grammar.data";
import type { GrammarQuestion } from "./grammar.types";

const input: GrammarQuestion = { id: "i", type: "input", question: "She ___ tea.", answers: ["drinks"], explanation: "" };
const choice: GrammarQuestion = { id: "c", question: "?", options: ["a", "b"], correctIndex: 1, explanation: "" };

describe("grammar grading", () => {
  it("forgives case, spacing, curly apostrophes and a final stop", () => {
    expect(normalizeAnswer("  Don’t   GO. ")).toBe("don't go");
    expect(isAnswerCorrect(input, " Drinks. ")).toBe(true);
  });

  it("does not forgive spelling or empty answers", () => {
    expect(isAnswerCorrect(input, "drink")).toBe(false);
    expect(isAnswerCorrect(input, "   ")).toBe(false);
    expect(isAnswerCorrect(input, undefined)).toBe(false);
  });

  it("grades choice by index and scores a set", () => {
    expect(isAnswerCorrect(choice, 1)).toBe(true);
    expect(isAnswerCorrect(choice, 0)).toBe(false);
    expect(scoreAnswers([input, choice], { 0: "drinks", 1: 0 })).toEqual({ correct: 1, total: 2, percent: 50 });
    expect(scoreAnswers([], {})).toEqual({ correct: 0, total: 0, percent: 0 });
    expect(correctAnswerText(choice)).toBe("B. b");
  });
});

describe("grammar curriculum", () => {
  it("has the full A1-C1 roadmap with unique ids in level order", () => {
    expect(GRAMMAR_ROADMAP_TOPICS.length).toBeGreaterThanOrEqual(35);
    const ids = GRAMMAR_ROADMAP_TOPICS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const levels = GRAMMAR_ROADMAP_TOPICS.map((t) => GRAMMAR_LEVELS.indexOf(t.level));
    expect(levels).toEqual([...levels].sort((a, b) => a - b));
  });

  it("every answer key points at a real option", () => {
    for (const t of GRAMMAR_ROADMAP_TOPICS) {
      for (const q of [...t.practice, ...t.advanced, ...t.review.masteryQuiz]) {
        if (q.type === "input") expect(q.answers.length, `${t.id}/${q.id}`).toBeGreaterThan(0);
        else expect(q.options[q.correctIndex], `${t.id}/${q.id}`).toBeDefined();
      }
    }
  });
});
