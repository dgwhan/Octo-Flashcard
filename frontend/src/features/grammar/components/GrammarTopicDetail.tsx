"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Clock,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  RotateCw,
  Check,
} from "lucide-react";
import { GrammarTopic, UserGrammarProgress } from "../grammar.types";
import { grammarService } from "../grammar.service";
import { ROUTES } from "@/src/config/routes";
import { Badge, SuckerRow } from "@/src/components/ui";
import type { BadgeVariant } from "@/src/components/ui";
import { flipCard, dealCard } from "@/src/lib/motion";
import QuestionList from "./QuestionList";
import { GrammarAnswer, scoreAnswers } from "../grammar.grading";
import styles from "./GrammarTopicDetail.module.css";

interface GrammarTopicDetailProps {
  topic: GrammarTopic;
}

type Tab = "theory" | "practice" | "review";

// UI-only threshold for the "mastered" message; saving/status rules live in grammar.service.ts
const MASTERY_PASS = 80;

const FORMULA_SIGN: Record<string, string> = {
  affirmative: "+",
  negative: "−",
  interrogative: "?",
  special: "*",
};

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

export default function GrammarTopicDetail({ topic }: GrammarTopicDetailProps) {
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const sceneRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

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
        console.error("[GrammarTopicDetail] Error loading progress:", err);
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
      console.error("[GrammarTopicDetail] Save theory error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Practice
  const handleSubmitPractice = async () => {
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
      console.error("[GrammarTopicDetail] Save practice error:", err);
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
      console.error("[GrammarTopicDetail] Save review error:", err);
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
      console.error("[GrammarTopicDetail] Reset topic error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Flashcards
  const cards = topic.review.flashcards;
  const card = cards[currentCardIndex];
  const flip = () => {
    flipCard(innerRef.current, sceneRef.current, !isFlipped);
    setIsFlipped(!isFlipped);
  };
  const goCard = (dir: 1 | -1) => {
    setIsFlipped(false); // snap to front: never show the next card's back mid-turn
    setCurrentCardIndex((i) => (i + dir + cards.length) % cards.length);
    dealCard(sceneRef.current, dir);
  };

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
        <div id="panel-theory" role="tabpanel" aria-labelledby="tab-theory" className={styles.panel}>
          <p className={styles.summary}>{topic.theory.summary}</p>

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Công thức</h2>
            <div className={styles.formulas}>
              {topic.theory.formulas.map((f, i) => (
                <article key={i} className={styles.formula}>
                  <p className={styles.formulaLabel}>
                    <span className={styles.formulaSign} aria-hidden="true">
                      {FORMULA_SIGN[f.type] ?? "*"}
                    </span>
                    {f.label}
                  </p>
                  <p className={styles.formulaStructure}>{f.structure}</p>
                  <p className={styles.exampleEn} lang="en">
                    {f.exampleEn}
                  </p>
                  <p className={styles.exampleVi}>{f.exampleVi}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Khi nào dùng</h2>
            <ol className={styles.usages}>
              {topic.theory.usages.map((u, i) => (
                <li key={u.id || i} className={styles.usage}>
                  <span className={styles.usageNum}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className={styles.usageTitle}>{u.title}</h3>
                    <p className={styles.usageText}>{u.explanation}</p>
                    <blockquote className={styles.example}>
                      <p className={styles.exampleEn} lang="en">
                        {u.exampleEn}
                      </p>
                      <p className={styles.exampleVi}>{u.exampleVi}</p>
                    </blockquote>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Dấu hiệu nhận biết</h2>
            <div className={styles.signals}>
              {topic.theory.signals.map((s, i) => (
                <div key={i} className={styles.signal}>
                  <h3 className={styles.signalTitle}>{s.category}</h3>
                  <ul className={styles.chips}>
                    {s.words.map((w) => (
                      <li key={w} className={styles.chip} lang="en">
                        {w}
                      </li>
                    ))}
                  </ul>
                  <p className={styles.signalText}>{s.explanation}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Lỗi hay gặp</h2>
            <ul className={styles.mistakes}>
              {topic.theory.commonMistakes.map((m, i) => (
                <li key={i} className={styles.mistake}>
                  <p className={styles.wrong}>
                    <XCircle size={16} aria-label="Sai" />
                    <s lang="en">{m.incorrect}</s>
                  </p>
                  <p className={styles.right}>
                    <CheckCircle2 size={16} aria-label="Đúng" />
                    <span lang="en">{m.correct}</span>
                  </p>
                  <p className={styles.mistakeText}>{m.explanation}</p>
                </li>
              ))}
            </ul>
          </section>

          {topic.theory.proTips.length > 0 && (
            <section className={styles.block}>
              <h2 className={styles.blockTitle}>Mẹo nhớ</h2>
              <ul className={styles.tips}>
                {topic.theory.proTips.map((tip, i) => (
                  <li key={i}>
                    <Lightbulb size={16} aria-hidden="true" />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className={styles.nextStep}>
            <p className={styles.nextStepText}>Đọc xong phần lý thuyết? Đánh dấu để lưu tiến độ và chuyển sang bài tập.</p>
            <button type="button" className={styles.primaryBtn} onClick={handleCompleteTheory} disabled={isSaving}>
              {progress.isTheoryCompleted ? "Sang bài thực hành" : "Đã hiểu, sang thực hành"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
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
            <>
              <QuestionList
                idPrefix="practice"
                questions={topic.practice}
                answers={selectedAnswers}
                submitted={isSubmitted}
                onAnswer={(q, a) => !isSubmitted && setSelectedAnswers((prev) => ({ ...prev, [q]: a }))}
              />

              {!isSubmitted ? (
                <div className={styles.submitRow}>
                  <span className={styles.answered}>
                    Đã trả lời {answeredPractice}/{topic.practice.length}
                  </span>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={handleSubmitPractice}
                    disabled={isSaving || answeredPractice === 0}
                  >
                    {isSaving ? "Đang lưu…" : "Nộp bài"}
                  </button>
                </div>
              ) : (
                <div className={styles.result}>
                  <span className={styles.resultScore}>{practiceAttempt.percent}%</span>
                  <p className={styles.resultText}>
                    Đúng {practiceAttempt.correct}/{practiceAttempt.total} câu. Kết quả đã được lưu. Thử sức tiếp với bộ
                    nâng cao?
                  </p>
                  <button type="button" className={styles.primaryBtn} onClick={() => setPracticeSet("advanced")}>
                    Làm bộ nâng cao
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <QuestionList
                idPrefix="advanced"
                questions={topic.advanced}
                answers={advancedAnswers}
                submitted={isAdvancedSubmitted}
                onAnswer={(q, a) => !isAdvancedSubmitted && setAdvancedAnswers((prev) => ({ ...prev, [q]: a }))}
              />

              {!isAdvancedSubmitted ? (
                <div className={styles.submitRow}>
                  <span className={styles.answered}>
                    Đã trả lời {answeredAdvanced}/{topic.advanced.length}
                  </span>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={handleSubmitAdvanced}
                    disabled={answeredAdvanced === 0}
                  >
                    Chấm điểm
                  </button>
                </div>
              ) : (
                <div className={styles.result}>
                  <span className={styles.resultScore}>{advancedAttempt.percent}%</span>
                  <p className={styles.resultText}>
                    Đúng {advancedAttempt.correct}/{advancedAttempt.total} câu nâng cao.
                  </p>
                  <button type="button" className={styles.primaryBtn} onClick={() => setActiveTab("review")}>
                    Sang phần ôn tập
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ---------- 03 Review ---------- */}
      {activeTab === "review" && (
        <div id="panel-review" role="tabpanel" aria-labelledby="tab-review" className={styles.panel}>
          {card && (
            <section className={styles.block}>
              <h2 className={styles.blockTitle}>Thẻ ghi nhớ</h2>
              <div className={styles.deck}>
                <button
                  ref={sceneRef}
                  type="button"
                  className={styles.flipScene}
                  onClick={flip}
                  aria-label={isFlipped ? "Lật về mặt câu hỏi" : "Lật thẻ để xem đáp án"}
                  aria-pressed={isFlipped}
                >
                  <span ref={innerRef} className={`${styles.flipInner} ${isFlipped ? styles.flipped : ""}`}>
                    <span className={`${styles.face} ${styles.faceFront}`}>
                      <span className={styles.faceTop}>
                        Thẻ {currentCardIndex + 1}/{cards.length}
                        <span className={styles.faceHint}>
                          <RotateCw size={13} /> Lật thẻ
                        </span>
                      </span>
                      <span className={styles.faceText}>{card.front}</span>
                      {card.hint && <span className={styles.faceSub}>Gợi ý: {card.hint}</span>}
                    </span>
                    <span className={`${styles.face} ${styles.faceBack}`}>
                      <span className={styles.faceTop}>
                        Đáp án
                        <span className={styles.faceHint}>
                          <RotateCw size={13} /> Lật lại
                        </span>
                      </span>
                      <span className={styles.faceText}>{card.back}</span>
                    </span>
                  </span>
                </button>
                <div className={styles.deckNav}>
                  <button type="button" className={styles.ghostBtn} onClick={() => goCard(-1)}>
                    <ChevronLeft size={16} /> Thẻ trước
                  </button>
                  <SuckerRow count={cards.length} filled={currentCardIndex + 1} />
                  <button type="button" className={styles.ghostBtn} onClick={() => goCard(1)}>
                    Thẻ sau <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Kiểm tra thuần thục</h2>
            <p className={styles.blockLead}>
              {topic.review.masteryQuiz.length} câu ngắn. Làm xong là hoàn thành chủ điểm này.
            </p>

            <QuestionList
              idPrefix="mastery"
              questions={topic.review.masteryQuiz}
              answers={masteryAnswers}
              submitted={isMasterySubmitted}
              onAnswer={(q, a) => !isMasterySubmitted && setMasteryAnswers((prev) => ({ ...prev, [q]: a }))}
            />

            {!isMasterySubmitted ? (
              <div className={styles.submitRow}>
                <span className={styles.answered}>
                  Đã trả lời {answeredMastery}/{topic.review.masteryQuiz.length}
                </span>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={handleSubmitMasteryQuiz}
                  disabled={isSaving || answeredMastery === 0}
                >
                  {isSaving ? "Đang lưu…" : "Nộp bài kiểm tra"}
                </button>
              </div>
            ) : masteryAttempt >= MASTERY_PASS ? (
              /* the gold moment: a topic mastered — only when it actually is */
              <div className={`${styles.result} ${styles.resultMastered}`}>
                <SuckerRow count={3} filled={3} className={styles.goldSuckers} />
                <span className={styles.resultScore}>{masteryAttempt}%</span>
                <p className={styles.resultText}>
                  Bạn đã nắm vững “{topic.vietnameseTitle}”. Tiến độ đã được lưu.
                </p>
                <Link href={ROUTES.GRAMMAR} className={styles.primaryBtn}>
                  Về lộ trình
                  <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div className={styles.result}>
                <span className={styles.resultScore}>{masteryAttempt}%</span>
                <p className={styles.resultText}>
                  Chưa tới {MASTERY_PASS}%. Lật lại các thẻ ghi nhớ ở trên rồi làm lại bài kiểm tra.
                </p>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => {
                    setMasteryAnswers({});
                    setIsMasterySubmitted(false);
                  }}
                >
                  <RotateCcw size={16} />
                  Làm lại
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
