"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  PenTool,
  RotateCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Check,
  Zap,
  Compass,
} from "lucide-react";
import { GrammarTopic, UserGrammarProgress } from "../grammar.types";
import { grammarService } from "../grammar.service";
import { ROUTES } from "@/src/config/routes";

interface GrammarTopicDetailProps {
  topic: GrammarTopic;
}

export default function GrammarTopicDetail({ topic }: GrammarTopicDetailProps) {
  const router = useRouter();

  // Active Tab: "theory" | "practice" | "review"
  const [activeTab, setActiveTab] = useState<"theory" | "practice" | "review">("theory");

  // User Progress State
  const [progress, setProgress] = useState<UserGrammarProgress>({
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
  const [isSaving, setIsSaving] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Practice State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Flashcards Review State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mastery Quiz State
  const [masteryAnswers, setMasteryAnswers] = useState<Record<number, number>>({});
  const [isMasterySubmitted, setIsMasterySubmitted] = useState(false);

  // Load progress for this topic
  useEffect(() => {
    async function loadProgress() {
      try {
        const data = await grammarService.getRoadmapProgress();
        if (data.progressMap[topic.id]) {
          setProgress(data.progressMap[topic.id]);
        }
      } catch (err) {
        console.error("[GrammarTopicDetail] Error loading progress:", err);
      }
    }
    loadProgress();
  }, [topic.id]);

  // Thông báo tạm thời
  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // 1. Hoàn thành Lý thuyết
  const handleCompleteTheory = async () => {
    setIsSaving(true);
    try {
      const updated = await grammarService.saveTopicProgress({
        topicId: topic.id,
        isTheoryCompleted: true,
      });
      setProgress(updated);
      showToast("🎉 Đã lưu hoàn thành Lý thuyết! Chuyển sang phần Thực hành.");
      setActiveTab("practice");
    } catch (err) {
      console.error("[GrammarTopicDetail] Save theory error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Nộp bài Thực hành
  const handleSelectPracticeOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleSubmitPractice = async () => {
    const questions = topic.practice;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
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
      showToast(`🎯 Bài thực hành: Đạt ${correctCount}/${questions.length} câu đúng (${score}%).`);
    } catch (err) {
      console.error("[GrammarTopicDetail] Save practice error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPractice = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  // 3. Nộp bài Mastery Quiz trong phần Ôn tập
  const handleSubmitMasteryQuiz = async () => {
    const quizQuestions = topic.review.masteryQuiz;
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (masteryAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const score = Math.round((correct / quizQuestions.length) * 100);
    setIsMasterySubmitted(true);
    setIsSaving(true);

    try {
      const updated = await grammarService.saveTopicProgress({
        topicId: topic.id,
        isReviewCompleted: true,
        masteryScore: score,
      });
      setProgress(updated);
      showToast(`🏆 Độ thuần thục đạt: ${score}%. Đã lưu vào cơ sở dữ liệu!`);
    } catch (err) {
      console.error("[GrammarTopicDetail] Save review error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Đặt lại toàn bộ tiến độ của chủ điểm này
  const handleResetEntireTopic = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học của chủ điểm này không?")) {
      return;
    }
    setIsSaving(true);
    try {
      await grammarService.resetTopicProgress(topic.id);
      setProgress({
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
      handleResetPractice();
      setMasteryAnswers({});
      setIsMasterySubmitted(false);
      showToast("Đã đặt lại tiến độ chủ điểm thành công.");
    } catch (err) {
      console.error("[GrammarTopicDetail] Reset topic error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "20px 16px 80px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Toast Notification */}
      {notificationMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "var(--color-text-primary)",
            color: "var(--color-text-inverse)",
            padding: "12px 20px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Sparkles size={18} style={{ color: "#34d399" }} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* TOP NAVIGATION BREADCRUMB */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Link
          href={ROUTES.GRAMMAR}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--color-text-secondary)",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={16} />
          <span>Quay lại Lộ trình ngữ pháp</span>
        </Link>

        {/* Reset button */}
        {(progress.isTheoryCompleted || progress.isPracticeCompleted || progress.isReviewCompleted) && (
          <button
            type="button"
            onClick={handleResetEntireTopic}
            disabled={isSaving}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "var(--color-danger, #ef4444)",
              border: "1px solid var(--color-border)",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} />
            <span>Đặt lại bài học</span>
          </button>
        )}
      </div>

      {/* TOPIC HEADER BANNER */}
      <div
        style={{
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "20px",
          padding: "24px 28px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "6px",
                backgroundColor: "var(--color-bg-subtle)",
                color: topic.badgeColor,
                fontSize: "0.8rem",
                fontWeight: 800,
                border: `1px solid ${topic.badgeColor}40`,
              }}
            >
              {topic.level}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
              {topic.stageName} • Bài {topic.order}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={13} /> {topic.estimatedMinutes} phút
            </span>
          </div>

          <h1
            style={{
              fontSize: "1.85rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              margin: "0 0 6px 0",
            }}
          >
            {topic.title}
          </h1>
          <div style={{ fontSize: "1.05rem", color: "var(--color-primary)", fontWeight: 700 }}>
            {topic.vietnameseTitle}
          </div>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--color-text-secondary)",
              margin: "8px 0 0 0",
              maxWidth: "700px",
            }}
          >
            {topic.description}
          </p>
        </div>

        {/* Progress summary capsule */}
        <div
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border)",
            borderRadius: "14px",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
              LÝ THUYẾT
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: progress.isTheoryCompleted ? "var(--color-primary)" : "var(--color-text-secondary)",
                marginTop: "2px",
              }}
            >
              {progress.isTheoryCompleted ? "Đã học" : "Chưa"}
            </div>
          </div>
          <div style={{ width: "1px", height: "28px", backgroundColor: "var(--color-border)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
              THỰC HÀNH
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: progress.isPracticeCompleted ? "#3b82f6" : "var(--color-text-secondary)",
                marginTop: "2px",
              }}
            >
              {progress.isPracticeCompleted ? `${progress.practiceScore}%` : "Chưa"}
            </div>
          </div>
          <div style={{ width: "1px", height: "28px", backgroundColor: "var(--color-border)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
              ÔN TẬP
            </div>
            <div
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: progress.isReviewCompleted ? "#8b5cf6" : "var(--color-text-secondary)",
                marginTop: "2px",
              }}
            >
              {progress.isReviewCompleted ? `${progress.masteryScore}%` : "Chưa"}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS: LÝ THUYẾT - BÀI TẬP - ÔN TẬP */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid var(--color-border)",
          gap: "8px",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("theory")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            border: "none",
            borderBottom: activeTab === "theory" ? "3px solid var(--color-primary)" : "3px solid transparent",
            backgroundColor: "transparent",
            color: activeTab === "theory" ? "var(--color-primary)" : "var(--color-text-secondary)",
            fontWeight: activeTab === "theory" ? 800 : 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "-2px",
            transition: "all 0.15s ease",
          }}
        >
          <BookOpen size={18} />
          <span>1. Lý thuyết hướng dẫn</span>
          {progress.isTheoryCompleted && <CheckCircle2 size={16} style={{ color: "var(--color-primary)" }} />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("practice")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            border: "none",
            borderBottom: activeTab === "practice" ? "3px solid #3b82f6" : "3px solid transparent",
            backgroundColor: "transparent",
            color: activeTab === "practice" ? "#3b82f6" : "var(--color-text-secondary)",
            fontWeight: activeTab === "practice" ? 800 : 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "-2px",
            transition: "all 0.15s ease",
          }}
        >
          <PenTool size={18} />
          <span>2. Bài tập thực hành</span>
          {progress.isPracticeCompleted && <CheckCircle2 size={16} style={{ color: "#3b82f6" }} />}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("review")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            border: "none",
            borderBottom: activeTab === "review" ? "3px solid #8b5cf6" : "3px solid transparent",
            backgroundColor: "transparent",
            color: activeTab === "review" ? "#8b5cf6" : "var(--color-text-secondary)",
            fontWeight: activeTab === "review" ? 800 : 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            marginBottom: "-2px",
            transition: "all 0.15s ease",
          }}
        >
          <RotateCw size={18} />
          <span>3. Ôn tập & Flashcard</span>
          {progress.isReviewCompleted && <CheckCircle2 size={16} style={{ color: "#8b5cf6" }} />}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LÝ THUYẾT HƯỚNG DẪN */}
      {/* ========================================================================= */}
      {activeTab === "theory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Summary Box */}
          <div
            style={{
              backgroundColor: "var(--color-primary-light)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: "16px",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "6px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Sparkles size={16} />
              TỔNG QUAN CỐT LÕI
            </div>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
              {topic.theory.summary}
            </p>
          </div>

          {/* Formulas Section */}
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                marginBottom: "14px",
              }}
            >
              Cấu trúc công thức chuẩn
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {topic.theory.formulas.map((form, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "14px",
                    padding: "18px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      width: "fit-content",
                    }}
                  >
                    {form.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      backgroundColor: "var(--color-bg-subtle)",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      wordBreak: "break-word",
                    }}
                  >
                    {form.structure}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      Ví dụ: {form.exampleEn}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      ➜ {form.exampleVi}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usages Section */}
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                marginBottom: "14px",
              }}
            >
              Các trường hợp sử dụng & Ví dụ thực tế
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {topic.theory.usages.map((usage, uIdx) => (
                <div
                  key={usage.id || uIdx}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "14px",
                    padding: "18px 22px",
                  }}
                >
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                    {uIdx + 1}. {usage.title}
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-secondary)",
                      margin: "6px 0 12px 0",
                      lineHeight: 1.5,
                    }}
                  >
                    {usage.explanation}
                  </p>
                  <div
                    style={{
                      backgroundColor: "var(--color-bg-subtle)",
                      borderRadius: "10px",
                      padding: "10px 16px",
                      borderLeft: "4px solid var(--color-primary)",
                    }}
                  >
                    <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                      {usage.exampleEn}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                      ➜ {usage.exampleVi}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signals Section */}
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                marginBottom: "14px",
              }}
            >
              Dấu hiệu nhận biết & Từ khóa quan trọng
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {topic.theory.signals.map((sig, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "14px",
                    padding: "16px 20px",
                  }}
                >
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    {sig.category}
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", margin: "8px 0" }}>
                    {sig.words.map((w, wIdx) => (
                      <span
                        key={wIdx}
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          color: "#3b82f6",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                    {sig.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                marginBottom: "14px",
              }}
            >
              Những lỗi sai kinh điển cần tránh
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {topic.theory.commonMistakes.map((mis, mIdx) => (
                <div
                  key={mIdx}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "14px",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-danger, #ef4444)", fontWeight: 600, fontSize: "0.9rem" }}>
                    <XCircle size={16} />
                    <span>Sai: {mis.incorrect}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", fontWeight: 700, fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} />
                    <span>Đúng: {mis.correct}</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                    💡 <em>Giải thích:</em> {mis.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Theory Action Button */}
          <div
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "18px",
              padding: "24px",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
              Bạn đã hiểu rõ lý thuyết của chủ điểm này?
            </h3>
            <p style={{ margin: "0 0 18px 0", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
              Hãy đánh dấu hoàn thành để lưu tiến độ vào hệ thống và bắt đầu bài tập thực hành phản xạ ngay!
            </p>
            <button
              type="button"
              onClick={handleCompleteTheory}
              disabled={isSaving}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 28px",
                borderRadius: "12px",
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
              }}
            >
              <Check size={18} />
              <span>Đã hiểu lý thuyết ➔ Chuyển sang Thực hành</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BÀI TẬP THỰC HÀNH */}
      {/* ========================================================================= */}
      {activeTab === "practice" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Practice Header Bar */}
          <div
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                Bài tập thực hành phản xạ ({topic.practice.length} câu)
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                Chọn đáp án đúng nhất. Giải thích ngữ pháp chi tiết sẽ hiển thị ngay khi nộp bài.
              </div>
            </div>

            {isSubmitted && (
              <button
                type="button"
                onClick={handleResetPractice}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  backgroundColor: "var(--color-bg-subtle)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <RotateCcw size={14} />
                <span>Làm lại bài tập</span>
              </button>
            )}
          </div>

          {/* List of Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {topic.practice.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id || qIdx}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: isSubmitted
                      ? isCorrect
                        ? "2px solid rgba(16, 185, 129, 0.45)"
                        : "2px solid rgba(239, 68, 68, 0.45)"
                      : "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        backgroundColor: "var(--color-bg-subtle)",
                        color: "var(--color-text-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        flexShrink: 0,
                      }}
                    >
                      {qIdx + 1}
                    </span>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.5 }}>
                      {q.question}
                    </div>
                  </div>

                  {/* Options */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      let optBg = "var(--color-bg-subtle)";
                      let optBorder = "1px solid var(--color-border)";
                      let optColor = "var(--color-text-primary)";

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optBg = "rgba(16, 185, 129, 0.15)";
                          optBorder = "2px solid var(--color-primary)";
                          optColor = "var(--color-primary)";
                        } else if (isOptionSelected && optIdx !== q.correctIndex) {
                          optBg = "rgba(239, 68, 68, 0.15)";
                          optBorder = "2px solid var(--color-danger, #ef4444)";
                          optColor = "var(--color-danger, #ef4444)";
                        }
                      } else if (isOptionSelected) {
                        optBg = "rgba(59, 130, 246, 0.12)";
                        optBorder = "2px solid #3b82f6";
                        optColor = "#3b82f6";
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectPracticeOption(qIdx, optIdx)}
                          disabled={isSubmitted}
                          style={{
                            padding: "12px 16px",
                            borderRadius: "10px",
                            backgroundColor: optBg,
                            border: optBorder,
                            color: optColor,
                            fontWeight: isOptionSelected ? 700 : 500,
                            fontSize: "0.9rem",
                            textAlign: "left",
                            cursor: isSubmitted ? "default" : "pointer",
                            transition: "all 0.15s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span style={{ fontWeight: 800, opacity: 0.7 }}>
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {isSubmitted && (
                    <div
                      style={{
                        backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        borderLeft: isCorrect ? "4px solid var(--color-primary)" : "4px solid var(--color-danger, #ef4444)",
                        fontSize: "0.88rem",
                        color: "var(--color-text-primary)",
                        lineHeight: 1.5,
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: "4px", color: isCorrect ? "var(--color-primary)" : "var(--color-danger, #ef4444)" }}>
                        {isCorrect ? "✓ Chính xác!" : "✗ Chưa chính xác!"} Đáp án đúng: {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                      </div>
                      <div>💡 <em>Giải thích:</em> {q.explanation}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Practice Button */}
          {!isSubmitted && (
            <div style={{ textAlign: "center", marginTop: "12px" }}>
              <button
                type="button"
                onClick={handleSubmitPractice}
                disabled={isSaving || Object.keys(selectedAnswers).length === 0}
                style={{
                  padding: "14px 36px",
                  borderRadius: "14px",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  border: "none",
                  cursor: Object.keys(selectedAnswers).length === 0 ? "not-allowed" : "pointer",
                  opacity: Object.keys(selectedAnswers).length === 0 ? 0.6 : 1,
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.35)",
                }}
              >
                {isSaving ? "Đang lưu..." : `Nộp bài thực hành (${Object.keys(selectedAnswers).length}/${topic.practice.length})`}
              </button>
            </div>
          )}

          {/* After submit: Next tab button */}
          {isSubmitted && (
            <div
              style={{
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                  Điểm thực hành của bạn: {progress.practiceScore}%
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                  Đã lưu kết quả bài tập vào DB. Chuyển sang phần Ôn tập & Flashcard để củng cố trí nhớ!
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("review")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  backgroundColor: "#8b5cf6",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span>Chuyển sang Ôn tập & Flashcard</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ÔN TẬP & FLASHCARD */}
      {/* ========================================================================= */}
      {activeTab === "review" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Section 1: Flashcards Flip Deck */}
          <div>
            <div style={{ marginBottom: "12px" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)", margin: 0 }}>
                Thẻ ghi nhớ công thức (Flashcards)
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", margin: "4px 0 0 0" }}>
                Nhấp vào thẻ để lật mặt sau xem đáp án hoặc quy tắc.
              </p>
            </div>

            {topic.review.flashcards.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                {/* 3D Flip Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  style={{
                    width: "100%",
                    maxWidth: "560px",
                    minHeight: "220px",
                    backgroundColor: isFlipped ? "var(--color-primary-light)" : "var(--color-bg-card)",
                    border: isFlipped ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    transition: "all 0.25s ease",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "18px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Thẻ {currentCardIndex + 1} / {topic.review.flashcards.length}
                  </span>

                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "18px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: isFlipped ? "var(--color-primary)" : "var(--color-text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <RotateCw size={12} /> {isFlipped ? "Mặt sau (Giải thích)" : "Mặt trước (Câu hỏi)"}
                  </span>

                  <div
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: isFlipped ? "var(--color-primary-dark, #065f46)" : "var(--color-text-primary)",
                      whiteSpace: "pre-line",
                      lineHeight: 1.6,
                    }}
                  >
                    {isFlipped
                      ? topic.review.flashcards[currentCardIndex].back
                      : topic.review.flashcards[currentCardIndex].front}
                  </div>

                  {!isFlipped && topic.review.flashcards[currentCardIndex].hint && (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-text-secondary)",
                        marginTop: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <HelpCircle size={14} /> Gợi ý: {topic.review.flashcards[currentCardIndex].hint}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-secondary)",
                      marginTop: "16px",
                      opacity: 0.7,
                    }}
                  >
                    (Nhấp chuột để lật thẻ)
                  </div>
                </div>

                {/* Card Controls */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : topic.review.flashcards.length - 1));
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      backgroundColor: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <ChevronLeft size={16} />
                    <span>Thẻ trước</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentCardIndex((prev) => (prev < topic.review.flashcards.length - 1 ? prev + 1 : 0));
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      backgroundColor: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <span>Thẻ tiếp theo</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Mastery Quiz */}
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Zap size={20} style={{ color: "#8b5cf6" }} />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)", margin: 0 }}>
                  Thử thách độ thuần thục (Mastery Quiz)
                </h2>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", margin: "4px 0 0 0" }}>
                Bộ câu hỏi kiểm tra nhanh để đạt chứng nhận thành thạo 100% chủ điểm này.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {topic.review.masteryQuiz.map((mq, mIdx) => {
                const selectedOpt = masteryAnswers[mIdx];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = isAnswered && selectedOpt === mq.correctIndex;

                return (
                  <div
                    key={mq.id || mIdx}
                    style={{
                      backgroundColor: "var(--color-bg-card)",
                      border: isMasterySubmitted
                        ? isCorrect
                          ? "2px solid rgba(16, 185, 129, 0.45)"
                          : "2px solid rgba(239, 68, 68, 0.45)"
                        : "1px solid var(--color-border)",
                      borderRadius: "14px",
                      padding: "18px 20px",
                    }}
                  >
                    <div style={{ fontSize: "0.98rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
                      Câu {mIdx + 1}: {mq.question}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "8px" }}>
                      {mq.options.map((opt, optIdx) => {
                        const isOptionSelected = selectedOpt === optIdx;
                        let optBg = "var(--color-bg-subtle)";
                        let optBorder = "1px solid var(--color-border)";
                        let optColor = "var(--color-text-primary)";

                        if (isMasterySubmitted) {
                          if (optIdx === mq.correctIndex) {
                            optBg = "rgba(16, 185, 129, 0.15)";
                            optBorder = "2px solid var(--color-primary)";
                            optColor = "var(--color-primary)";
                          } else if (isOptionSelected && optIdx !== mq.correctIndex) {
                            optBg = "rgba(239, 68, 68, 0.15)";
                            optBorder = "2px solid var(--color-danger, #ef4444)";
                            optColor = "var(--color-danger, #ef4444)";
                          }
                        } else if (isOptionSelected) {
                          optBg = "rgba(139, 92, 246, 0.12)";
                          optBorder = "2px solid #8b5cf6";
                          optColor = "#8b5cf6";
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => {
                              if (!isMasterySubmitted) {
                                setMasteryAnswers((prev) => ({ ...prev, [mIdx]: optIdx }));
                              }
                            }}
                            disabled={isMasterySubmitted}
                            style={{
                              padding: "10px 14px",
                              borderRadius: "8px",
                              backgroundColor: optBg,
                              border: optBorder,
                              color: optColor,
                              fontWeight: isOptionSelected ? 700 : 500,
                              fontSize: "0.85rem",
                              textAlign: "left",
                              cursor: isMasterySubmitted ? "default" : "pointer",
                            }}
                          >
                            <span style={{ fontWeight: 800, marginRight: "6px" }}>
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isMasterySubmitted && (
                      <div
                        style={{
                          marginTop: "12px",
                          fontSize: "0.85rem",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        💡 <em>Giải thích:</em> {mq.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Mastery Quiz */}
            {!isMasterySubmitted && (
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={handleSubmitMasteryQuiz}
                  disabled={isSaving || Object.keys(masteryAnswers).length === 0}
                  style={{
                    padding: "12px 32px",
                    borderRadius: "12px",
                    backgroundColor: "#8b5cf6",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: Object.keys(masteryAnswers).length === 0 ? "not-allowed" : "pointer",
                    opacity: Object.keys(masteryAnswers).length === 0 ? 0.6 : 1,
                    boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
                  }}
                >
                  {isSaving ? "Đang lưu..." : `Nộp bài Mastery Quiz (${Object.keys(masteryAnswers).length}/${topic.review.masteryQuiz.length})`}
                </button>
              </div>
            )}

            {isMasterySubmitted && (
              <div
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary)" }}>
                  🎉 CHÚC MỪNG! BẠN ĐÃ HOÀN THÀNH CHỦ ĐIỂM NGỮ PHÁP NÀY!
                </div>
                <p style={{ margin: "6px 0 16px 0", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                  Tiến độ đã được ghi nhận vào tài khoản của bạn. Hãy tiếp tục thử thách các chủ điểm tiếp theo trong Roadmap!
                </p>
                <Link
                  href={ROUTES.GRAMMAR}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 28px",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-primary)",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  <Compass size={18} />
                  <span>Quay lại Lộ trình (Roadmap)</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
