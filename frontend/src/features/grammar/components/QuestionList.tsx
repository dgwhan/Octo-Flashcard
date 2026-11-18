"use client";

import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { GrammarQuestion } from "../grammar.types";
import styles from "./GrammarTopicDetail.module.css";

interface QuestionListProps {
  idPrefix: string;
  questions: GrammarQuestion[];
  answers: Record<number, number>;
  submitted: boolean;
  onSelect: (questionIdx: number, optionIdx: number) => void;
}

const letter = (i: number) => String.fromCharCode(65 + i);

/** Practice and mastery quiz share this: real radio groups, verdict + explanation after submit. */
export default function QuestionList({ idPrefix, questions, answers, submitted, onSelect }: QuestionListProps) {
  return (
    <ol className={styles.questions}>
      {questions.map((q, qIdx) => {
        const chosen = answers[qIdx];
        const verdict = !submitted ? undefined : chosen === q.correctIndex ? "correct" : "wrong";
        const name = `${idPrefix}-${q.id || qIdx}`;

        return (
          <li key={name} className={styles.question} data-verdict={verdict}>
            <fieldset className={styles.fieldset} disabled={submitted}>
              <legend className={styles.questionText}>
                <span className={styles.questionNum}>{String(qIdx + 1).padStart(2, "0")}</span>
                {q.question}
              </legend>

              <div className={styles.options}>
                {q.options.map((opt, optIdx) => {
                  const state = submitted
                    ? optIdx === q.correctIndex
                      ? "correct"
                      : chosen === optIdx
                        ? "wrong"
                        : undefined
                    : chosen === optIdx
                      ? "chosen"
                      : undefined;
                  return (
                    <label key={optIdx} className={styles.option} data-state={state}>
                      <input
                        type="radio"
                        name={name}
                        checked={chosen === optIdx}
                        onChange={() => onSelect(qIdx, optIdx)}
                        className={styles.optionInput}
                      />
                      <span className={styles.optionLetter}>{letter(optIdx)}</span>
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {submitted && (
              <div className={styles.explain}>
                <p className={styles.verdict}>
                  {verdict === "correct" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  {verdict === "correct" ? "Chính xác." : chosen === undefined ? "Chưa trả lời." : "Chưa đúng."}{" "}
                  <span className={styles.verdictAnswer}>
                    Đáp án: {letter(q.correctIndex)}. {q.options[q.correctIndex]}
                  </span>
                </p>
                <p className={styles.explainText}>
                  <Lightbulb size={14} aria-hidden="true" />
                  {q.explanation}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
