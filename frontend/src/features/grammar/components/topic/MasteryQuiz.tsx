"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { SuckerRow } from "@/src/components/ui";
import QuestionList from "../QuestionList";
import type { GrammarAnswer } from "../../lib/grading";
import type { GrammarQuestion } from "../../types";
import styles from "../../pages/GrammarTopicPage.module.css";

// UI-only threshold for the "mastered" message; saving/status rules live in api/grammar.api.ts
export const MASTERY_PASS = 80;

interface MasteryQuizProps {
  topicTitle: string;
  questions: GrammarQuestion[];
  answers: Record<number, GrammarAnswer>;
  answeredCount: number;
  submitted: boolean;
  /** Score of this attempt (progress keeps the best) */
  attempt: number;
  isSaving: boolean;
  onAnswer: (question: number, answer: GrammarAnswer) => void;
  onSubmit: () => void;
  onRetry: () => void;
}

/** Final short quiz; passing it completes the topic. */
export default function MasteryQuiz({
  topicTitle,
  questions,
  answers,
  answeredCount,
  submitted,
  attempt,
  isSaving,
  onAnswer,
  onSubmit,
  onRetry,
}: MasteryQuizProps) {
  return (
    <section className={styles.block}>
      <h2 className={styles.blockTitle}>Kiểm tra thuần thục</h2>
      <p className={styles.blockLead}>
        {questions.length} câu ngắn. Làm xong là hoàn thành chủ điểm này.
      </p>

      <QuestionList
        idPrefix="mastery"
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
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={onSubmit}
            disabled={isSaving || answeredCount === 0}
          >
            {isSaving ? "Đang lưu…" : "Nộp bài kiểm tra"}
          </button>
        </div>
      ) : attempt >= MASTERY_PASS ? (
        /* the gold moment: a topic mastered — only when it actually is */
        <div className={`${styles.result} ${styles.resultMastered}`}>
          <SuckerRow count={3} filled={3} className={styles.goldSuckers} />
          <span className={styles.resultScore}>{attempt}%</span>
          <p className={styles.resultText}>
            Bạn đã nắm vững “{topicTitle}”. Tiến độ đã được lưu.
          </p>
          <Link href={ROUTES.GRAMMAR} className={styles.primaryBtn}>
            Về lộ trình
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className={styles.result}>
          <span className={styles.resultScore}>{attempt}%</span>
          <p className={styles.resultText}>
            Chưa tới {MASTERY_PASS}%. Lật lại các thẻ ghi nhớ ở trên rồi làm lại bài kiểm tra.
          </p>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={onRetry}
          >
            <RotateCcw size={16} />
            Làm lại
          </button>
        </div>
      )}
    </section>
  );
}
