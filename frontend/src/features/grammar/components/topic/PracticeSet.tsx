"use client";

import { ChevronRight } from "lucide-react";
import QuestionList from "../QuestionList";
import type { GrammarAnswer } from "../../lib/grading";
import type { GrammarQuestion } from "../../types";
import styles from "../../pages/GrammarTopicPage.module.css";

interface PracticeSetProps {
  idPrefix: string;
  questions: GrammarQuestion[];
  answers: Record<number, GrammarAnswer>;
  answeredCount: number;
  submitted: boolean;
  attempt: { correct: number; total: number; percent: number };
  /** Disables submit while the result is being saved */
  busy?: boolean;
  submitLabel: string;
  resultText: string;
  nextLabel: string;
  onAnswer: (question: number, answer: GrammarAnswer) => void;
  onSubmit: () => void;
  onNext: () => void;
}

/** One exercise set (basic or advanced): questions, submit, then score and a next step. */
export default function PracticeSet({
  idPrefix,
  questions,
  answers,
  answeredCount,
  submitted,
  attempt,
  busy,
  submitLabel,
  resultText,
  nextLabel,
  onAnswer,
  onSubmit,
  onNext,
}: PracticeSetProps) {
  return (
    <>
      <QuestionList
        idPrefix={idPrefix}
        questions={questions}
        answers={answers}
        submitted={submitted}
        onAnswer={(q, a) => !submitted && onAnswer(q, a)}
      />

      {!submitted ? (
        <div className={styles.submitRow}>
          <span className={styles.answered}>
            Đã trả lời {answeredCount}/{questions.length}
          </span>
          <button type="button" className={styles.primaryBtn} onClick={onSubmit} disabled={busy || answeredCount === 0}>
            {submitLabel}
          </button>
        </div>
      ) : (
        <div className={styles.result}>
          <span className={styles.resultScore}>{attempt.percent}%</span>
          <p className={styles.resultText}>{resultText}</p>
          <button type="button" className={styles.primaryBtn} onClick={onNext}>
            {nextLabel}
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
