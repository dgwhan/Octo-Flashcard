"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  RotateCcw,
  Check,
} from "lucide-react";
import { GrammarTopic, UserGrammarProgress } from "../types";
import { grammarService } from "../api/grammar.api";
import { ROUTES } from "@/src/config/routes";
import { Badge, SuckerRow } from "@/src/components/ui";
import type { BadgeVariant } from "@/src/components/ui";
import TheoryTab from "../components/topic/TheoryTab";
import PracticeSet from "../components/topic/PracticeSet";
import TopicFlashcards from "../components/topic/TopicFlashcards";
import MasteryQuiz from "../components/topic/MasteryQuiz";
import { GrammarAnswer, scoreAnswers } from "../lib/grading";
import { logStudySession } from "@/src/lib/studyLog";
import styles from "./GrammarTopicPage.module.css";

interface GrammarTopicDetailProps {
  topic: GrammarTopic;
}

type Tab = "theory" | "practice" | "review";



const emptyProgress = (topic: GrammarTopic): UserGrammarProgress => ({
  topicId: topic.id,
  isTheoryCompleted: false,
  isPracticeCompleted: false,
  practiceScore: 0,
  practiceTotalQuestions: topic.practice.length,
  practiceCorrectAnswers: 0,
  isReviewCompleted: false,
  masteryScore: 0,
  status: "NotStarted",
  lastStudiedAt: new Date().toISOString(),
});

export default function GrammarTopicPage({ topic }: GrammarTopicDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>("theory");
  const [progress, setProgress] = useState<UserGrammarProgress>(() => emptyProgress(topic));
  const [isSaving, setIsSaving] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Practice: core set (saved to progress) + advanced set (scored, not saved)
  const [practiceSet, setPracticeSet] = useState<"basic" | "advanced">("basic");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, GrammarAnswer>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [practiceAttempt, setPracticeAttempt] = useState({ correct: 0, total: 0, percent: 0 });
  const [advancedAnswers, setAdvancedAnswers] = useState<Record<number, GrammarAnswer>>({});
  const [isAdvancedSubmitted, setIsAdvancedSubmitted] = useState(false);
  const [advancedAttempt, setAdvancedAttempt] = useState({ correct: 0, total: 0, percent: 0 });

  // Flashcards (same signature flip as the study viewer)

  // Mastery quiz
  const [masteryAnswers, setMasteryAnswers] = useState<Record<number, GrammarAnswer>>({});
  const [isMasterySubmitted, setIsMasterySubmitted] = useState(false);
  const [masteryAttempt, setMasteryAttempt] = useState(0); // this attempt's score; progress keeps the best

  useEffect(() => {
    async function loadProgress() {
      try {
        const data = await grammarService.getRoadmapProgress();
        if (data.progressMap[topic.id]) setProgress(data.progressMap[topic.id]);
      } catch (err) {
        console.error("[GrammarTopicPage] Error loading progress:", err);
      }
    }
    loadProgress();
  }, [topic.id]);

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // 1. Theory done
  const handleCompleteTheory = async () => {
    setIsSaving(true);
    try {
      const updated = await grammarService.saveTopicProgress({ topicId: topic.id, isTheoryCompleted: true });
      setProgress(updated);
      showToast("Đã lưu: hoàn thành lý thuyết. Tiếp theo là bài thực hành.");
      setActiveTab("practice");
    } catch (err) {
      console.error("[GrammarTopicPage] Save theory error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Each graded set counts the time since the page opened (or the last graded set) toward streak + heatmap
  const studyStart = useRef<Date | null>(null);
  useEffect(() => {
    studyStart.current = new Date();
  }, []);
  const logGrammarTime = () => {
    if (studyStart.current) logStudySession("Grammar", studyStart.current);
    studyStart.current = new Date();
  };

  // 2. Practice
  const handleSubmitPractice = async () => {
    logGrammarTime();
    const questions = topic.practice;
    const attempt = scoreAnswers(questions, selectedAnswers);
    const { correct: correctCount, percent: score } = attempt;
    setPracticeAttempt(attempt);
    setIsSubmitted(true);
    setIsSaving(true);
    try {
      const updated = await grammarService.saveTopicProgress({
        topicId: topic.id,
        isPracticeCompleted: true,
        practiceScore: score,
        practiceTotalQuestions: questions.length,
        practiceCorrectAnswers: correctCount,
      });
      setProgress(updated);
      showToast(`Thực hành: đúng ${correctCount}/${questions.length} câu (${score}%).`);
    } catch (err) {
      console.error("[GrammarTopicPage] Save practice error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPractice = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // 2b. Advanced set: scored on the spot; progress keeps recording the core set only
  const handleSubmitAdvanced = () => {
    logGrammarTime();
    const attempt = scoreAnswers(topic.advanced, advancedAnswers);
    setAdvancedAttempt(attempt);
    setIsAdvancedSubmitted(true);
    showToast(`Nâng cao: đúng ${attempt.correct}/${attempt.total} câu (${attempt.percent}%).`);
  };

  const handleResetAdvanced = () => {
    setAdvancedAnswers({});
    setIsAdvancedSubmitted(false);
  };

  // 3. Mastery quiz
  const handleSubmitMasteryQuiz = async () => {
    logGrammarTime();
    const score = scoreAnswers(topic.review.masteryQuiz, masteryAnswers).percent;
    setMasteryAttempt(score);
    setIsMasterySubmitted(true);
    setIsSaving(true);
    try {
      const updated = await grammarService.saveTopicProgress({
        topicId: topic.id,
        isReviewCompleted: true,
        masteryScore: score,
      });
      setProgress(updated);
      showToast(`Độ thuần thục: ${score}%. Đã lưu tiến độ.`);
    } catch (err) {
      console.error("[GrammarTopicPage] Save review error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetEntireTopic = async () => {
    if (!window.confirm("Đặt lại toàn bộ tiến độ của chủ điểm này? Điểm thực hành và ôn tập sẽ bị xoá.")) return;
    setIsSaving(true);
    try {
      await grammarService.resetTopicProgress(topic.id);
      setProgress(emptyProgress(topic));
      handleResetPractice();
      handleResetAdvanced();
      setMasteryAnswers({});
      setIsMasterySubmitted(false);
      showToast("Đã đặt lại tiến độ chủ điểm.");
    } catch (err) {
      console.error("[GrammarTopicPage] Reset topic error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Flashcards
  const cards = topic.review.flashcards;

  // Tabs (WAI-ARIA tabs: arrow keys move between tabs)
  const tabs: { id: Tab; label: string; done: boolean }[] = [
    { id: "theory", label: "Lý thuyết", done: progress.isTheoryCompleted },
    { id: "practice", label: "Thực hành", done: progress.isPracticeCompleted },
    { id: "review", label: "Ôn tập", done: progress.isReviewCompleted },
  ];
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = tabs.findIndex((t) => t.id === activeTab);
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    setActiveTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  const doneSteps = tabs.filter((t) => t.done).length;
  const hasProgress = doneSteps > 0;
  const answered = (a: Record<number, GrammarAnswer>) =>
    Object.values(a).filter((v) => typeof v === "number" || v.trim() !== "").length;
  const answeredPractice = answered(selectedAnswers);
  const answeredAdvanced = answered(advancedAnswers);
  const answeredMastery = answered(masteryAnswers);

  return (
    <div className={styles.page}>
      <div className={styles.toast} role="status" aria-live="polite">
        {notificationMsg && (
          <span className={styles.toastInner}>
            <CheckCircle2 size={16} />
            {notificationMsg}
          </span>
        )}
      </div>

      <nav className={styles.topBar}>
        <Link href={ROUTES.GRAMMAR} className={styles.backLink}>
          <ArrowLeft size={16} />
          Lộ trình ngữ pháp
        </Link>
        {hasProgress && (
          <button type="button" className={styles.resetBtn} onClick={handleResetEntireTopic} disabled={isSaving}>
            <RotateCcw size={14} />
            Đặt lại bài học
          </button>
        )}
      </nav>

      {/* ---------- Header ---------- */}
      <header className={styles.header}>
        <div>
          <p className={styles.meta}>
            <Badge variant={topic.level.toLowerCase() as BadgeVariant} size="sm">
              {topic.level}
            </Badge>
            <span>
              Chặng {topic.stage} · Bài {String(topic.order).padStart(2, "0")}
            </span>
            <span className={styles.metaTime}>
              <Clock size={13} aria-hidden="true" /> {topic.estimatedMinutes} phút
            </span>
          </p>
          <h1 className={styles.title}>{topic.title}</h1>
          <p className={styles.viTitle}>{topic.vietnameseTitle}</p>
          <p className={styles.description}>{topic.description}</p>
        </div>

        <div className={styles.headerProgress} aria-label={`Đã xong ${doneSteps}/3 bước`}>
          <SuckerRow count={3} filled={doneSteps} className={styles.headerSuckers} />
          <dl className={styles.stepList}>
            <div>
              <dt>Lý thuyết</dt>
              <dd>{progress.isTheoryCompleted ? "Đã học" : "–"}</dd>
            </div>
            <div>
              <dt>Thực hành</dt>
              <dd>{progress.isPracticeCompleted ? `${progress.practiceScore}%` : "–"}</dd>
            </div>
            <div>
              <dt>Ôn tập</dt>
              <dd>{progress.isReviewCompleted ? `${progress.masteryScore}%` : "–"}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ---------- Tabs ---------- */}
      <div className={styles.tabs} role="tablist" aria-label="Các bước học" onKeyDown={onTabKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={activeTab === t.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActiveTab(t.id)}
          >
            <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
            {t.label}
            {t.done && <Check size={15} className={styles.tabDone} aria-label="đã xong" />}
          </button>
        ))}
      </div>

      {/* ---------- 01 Theory ---------- */}
      {activeTab === "theory" && (
        <TheoryTab topic={topic} progress={progress} isSaving={isSaving} onComplete={handleCompleteTheory} />
      )}

      {/* ---------- 02 Practice ---------- */}
      {activeTab === "practice" && (
        <div id="panel-practice" role="tabpanel" aria-labelledby="tab-practice" className={styles.panel}>
          <div className={styles.panelHead}>
            <div className={styles.setSwitch} role="group" aria-label="Bộ bài tập">
              <button
                type="button"
                aria-pressed={practiceSet === "basic"}
                className={styles.setBtn}
                onClick={() => setPracticeSet("basic")}
              >
                Cơ bản <span className={styles.setCount}>{topic.practice.length}</span>
              </button>
              <button
                type="button"
                aria-pressed={practiceSet === "advanced"}
                className={styles.setBtn}
                onClick={() => setPracticeSet("advanced")}
              >
                Nâng cao <span className={styles.setCount}>{topic.advanced.length}</span>
              </button>
            </div>
            {(practiceSet === "basic" ? isSubmitted : isAdvancedSubmitted) && (
              <button
                type="button"
                className={styles.ghostBtn}
                onClick={practiceSet === "basic" ? handleResetPractice : handleResetAdvanced}
              >
                <RotateCcw size={14} />
                Làm lại
              </button>
            )}
          </div>
          <p className={styles.blockLead}>
            {practiceSet === "basic"
              ? "Trắc nghiệm và điền từ. Điểm bộ này được lưu vào tiến độ."
              : "Câu khó hơn: bẫy thường gặp và viết lại câu. Dùng để tự kiểm tra, không tính vào tiến độ."}
          </p>

          {practiceSet === "basic" ? (
            <PracticeSet
              idPrefix="practice"
              questions={topic.practice}
              answers={selectedAnswers}
              answeredCount={answeredPractice}
              submitted={isSubmitted}
              attempt={practiceAttempt}
              busy={isSaving}
              submitLabel={isSaving ? "Đang lưu…" : "Nộp bài"}
              resultText={`Đúng ${practiceAttempt.correct}/${practiceAttempt.total} câu. Kết quả đã được lưu. Thử sức tiếp với bộ nâng cao?`}
              nextLabel="Làm bộ nâng cao"
              onAnswer={(q, a) => setSelectedAnswers((prev) => ({ ...prev, [q]: a }))}
              onSubmit={handleSubmitPractice}
              onNext={() => setPracticeSet("advanced")}
            />
          ) : (
            <PracticeSet
              idPrefix="advanced"
              questions={topic.advanced}
              answers={advancedAnswers}
              answeredCount={answeredAdvanced}
              submitted={isAdvancedSubmitted}
              attempt={advancedAttempt}
              submitLabel="Chấm điểm"
              resultText={`Đúng ${advancedAttempt.correct}/${advancedAttempt.total} câu nâng cao.`}
              nextLabel="Sang phần ôn tập"
              onAnswer={(q, a) => setAdvancedAnswers((prev) => ({ ...prev, [q]: a }))}
              onSubmit={handleSubmitAdvanced}
              onNext={() => setActiveTab("review")}
            />
          )}
        </div>
      )}

      {/* ---------- 03 Review ---------- */}
      {activeTab === "review" && (
        <div id="panel-review" role="tabpanel" aria-labelledby="tab-review" className={styles.panel}>
          <TopicFlashcards cards={cards} />

          <MasteryQuiz
            topicTitle={topic.vietnameseTitle}
            questions={topic.review.masteryQuiz}
            answers={masteryAnswers}
            answeredCount={answeredMastery}
            submitted={isMasterySubmitted}
            attempt={masteryAttempt}
            isSaving={isSaving}
            onAnswer={(q, a) => setMasteryAnswers((prev) => ({ ...prev, [q]: a }))}
            onSubmit={handleSubmitMasteryQuiz}
            onRetry={() => {
              setMasteryAnswers({});
              setIsMasterySubmitted(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
