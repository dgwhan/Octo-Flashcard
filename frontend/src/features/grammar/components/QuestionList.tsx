"use client";

import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { GrammarQuestion } from "../types";
import { GrammarAnswer, isAnswerCorrect, correctAnswerText } from "../lib/grading";
import styles from "../pages/GrammarTopicPage.module.css";

interface QuestionListProps {
  idPrefix: string;
  questions: GrammarQuestion[];
  answers: Record<number, GrammarAnswer>;
  submitted: boolean;
  onAnswer: (questionIdx: number, answer: GrammarAnswer) => void;
}

const letter = (i: number) => String.fromCharCode(65 + i);

/** Practice, advanced and mastery sets share this: radio groups or a typed blank, verdict + explanation after submit. */
export default function QuestionList({ idPrefix, questions, answers, submitted, onAnswer }: QuestionListProps) {
  return (
    <ol className={styles.questions}>
      {questions.map((q, qIdx) => {
        const given = answers[qIdx];
        const correct = isAnswerCorrect(q, given);
        const verdict = !submitted ? undefined : correct ? "correct" : "wrong";
        const name = `${idPrefix}-${q.id || qIdx}`;
        const empty = given === undefined || (typeof given === "string" && !given.trim());

        return (
          <li key={name} className={styles.question} data-verdict={verdict}>
            {q.type === "input" ? (
              <div className={styles.fieldset}>
                <label htmlFor={name} className={styles.questionText}>
                  <span className={styles.questionNum}>{String(qIdx + 1).padStart(2, "0")}</span>
                  {q.question}
                </label>
                <div className={styles.typed}>
                  <input
                    id={name}
                    type="text"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    lang="en"
                    className={styles.typedInput}
                    data-state={verdict}
                    value={typeof given === "string" ? given : ""}
                    onChange={(e) => onAnswer(qIdx, e.target.value)}
                    readOnly={submitted}
                    placeholder="Gõ đáp án…"
                  />
                </div>
              </div>
            ) : (
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
                        : given === optIdx
                          ? "wrong"
                          : undefined
                      : given === optIdx
                        ? "chosen"
                        : undefined;
                    return (
                      <label key={optIdx} className={styles.option} data-state={state}>
                        <input
                          type="radio"
                          name={name}
                          checked={given === optIdx}
                          onChange={() => onAnswer(qIdx, optIdx)}
                          className={styles.optionInput}
                        />
                        <span className={styles.optionLetter}>{letter(optIdx)}</span>
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {submitted && (
              <div className={styles.explain}>
                <p className={styles.verdict}>
                  {correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  {correct ? "Chính xác." : empty ? "Chưa trả lời." : "Chưa đúng."}{" "}
                  <span className={styles.verdictAnswer}>Đáp án: {correctAnswerText(q)}</span>
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
