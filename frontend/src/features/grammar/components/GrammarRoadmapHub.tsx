"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  Flame,
  Star,
  RotateCcw,
  GraduationCap,
} from "lucide-react";
import { GRAMMAR_ROADMAP_TOPICS } from "../grammar.data";
import { GrammarTopic, UserGrammarProgress, GrammarRoadmapStats } from "../grammar.types";
import { grammarService, calculateLocalStats } from "../grammar.service";
import { ROUTES } from "@/src/config/routes";

export default function GrammarRoadmapHub() {
  const [selectedStage, setSelectedStage] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [progressMap, setProgressMap] = useState<Record<string, UserGrammarProgress>>({});
  const [stats, setStats] = useState<GrammarRoadmapStats>({
    totalTopicsCount: GRAMMAR_ROADMAP_TOPICS.length,
    completedTopicsCount: 0,
    inProgressTopicsCount: 0,
    completionPercentage: 0,
    averagePracticeScore: 0,
    averageMasteryScore: 0,
    nextRecommendedTopicId: GRAMMAR_ROADMAP_TOPICS[0].id,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load progress khi mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await grammarService.getRoadmapProgress();
        if (isMounted) {
          setProgressMap(data.progressMap);
          setStats(data.stats);
        }
      } catch (err) {
        console.error("[GrammarRoadmapHub] Load error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Lọc topics
  const filteredTopics = useMemo(() => {
    return GRAMMAR_ROADMAP_TOPICS.filter((topic) => {
      if (selectedStage !== "all" && topic.stage !== selectedStage) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = topic.title.toLowerCase().includes(q);
        const matchViet = topic.vietnameseTitle.toLowerCase().includes(q);
        const matchDesc = topic.description.toLowerCase().includes(q);
        return matchTitle || matchViet || matchDesc;
      }
      return true;
    });
  }, [selectedStage, searchQuery]);

  // Topic tiếp theo nên học
  const nextTopicToLearn = useMemo(() => {
    if (stats.nextRecommendedTopicId) {
      return GRAMMAR_ROADMAP_TOPICS.find((t) => t.id === stats.nextRecommendedTopicId);
    }
    return GRAMMAR_ROADMAP_TOPICS[0];
  }, [stats.nextRecommendedTopicId]);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px 16px 80px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* HERO BANNER & STATS */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.05) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          borderRadius: "24px",
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "20px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "var(--color-primary)",
                fontSize: "0.85rem",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              <Compass size={16} />
              LỘ TRÌNH NGỮ PHÁP TIẾNG ANH CHUẨN QUỐC TẾ
            </div>
            <h1
              style={{
                fontSize: "2.1rem",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                lineHeight: 1.25,
                margin: "0 0 10px 0",
              }}
            >
              Chinh phục ngữ pháp theo Roadmap
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Lộ trình bài bản từ Nền tảng (A1-A2), Trung cấp (B1) đến Nâng cao (B2-C1). Mỗi chủ điểm được thiết kế
              chặt chẽ gồm <strong>Lý thuyết công thức</strong>, <strong>Bài tập thực hành phản xạ</strong> và{" "}
              <strong>Ôn tập Flashcard củng cố</strong>, tự động lưu tiến độ vào cơ sở dữ liệu.
            </p>
          </div>

          {/* Quick Resume Button */}
          {nextTopicToLearn && (
            <Link
              href={`/grammar/${nextTopicToLearn.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <Sparkles size={18} />
              <span>Tiếp tục học: {nextTopicToLearn.title}</span>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {/* PROGRESS METRICS BAR */}
        <div
          style={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "18px",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {/* Item 1: Overall Progress */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
                Tiến độ toàn bộ lộ trình
              </span>
              <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-primary)" }}>
                {stats.completionPercentage}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "10px",
                backgroundColor: "var(--color-bg-subtle)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${stats.completionPercentage}%`,
                  height: "100%",
                  backgroundColor: "var(--color-primary)",
                  borderRadius: "999px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
                marginTop: "6px",
              }}
            >
              Đã hoàn thành {stats.completedTopicsCount} / {stats.totalTopicsCount} chủ điểm
            </div>
          </div>

          {/* Item 2: Practice Avg */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(59, 130, 246, 0.12)",
                color: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Award size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
                Điểm bài tập trung bình
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                {stats.averagePracticeScore > 0 ? `${stats.averagePracticeScore}%` : "--"}
              </div>
            </div>
          </div>

          {/* Item 3: Mastery Avg */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(139, 92, 246, 0.12)",
                color: "#8b5cf6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Star size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
                Độ thuần thục ôn tập
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                {stats.averageMasteryScore > 0 ? `${stats.averageMasteryScore}%` : "--"}
              </div>
            </div>
          </div>

          {/* Item 4: Status breakdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Flame size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
                Đang học dở dang
              </div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                {stats.inProgressTopicsCount} chủ điểm
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "16px",
          padding: "16px 20px",
        }}
      >
        {/* Stages Buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "Tất cả chặng (15)" },
            { id: 1, label: "Chặng 1: Nền tảng (A1-A2)" },
            { id: 2, label: "Chặng 2: Trung cấp (B1)" },
            { id: 3, label: "Chặng 3: Nâng cao (B2-C1)" },
          ].map((st) => {
            const isActive = selectedStage === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStage(st.id as number | "all")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
                  color: isActive ? "var(--color-primary)" : "var(--color-text-primary)",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {st.label}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--color-bg-subtle)",
            borderRadius: "10px",
            padding: "8px 14px",
            border: "1px solid var(--color-border)",
            minWidth: "260px",
          }}
        >
          <Search size={16} style={{ color: "var(--color-text-secondary)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm chủ điểm ngữ pháp..."
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: "var(--color-text-primary)",
              fontSize: "0.9rem",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* ROADMAP TIMELINE & TOPIC CARDS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredTopics.map((topic, index) => {
          const progress = progressMap[topic.id];
          const isCompleted = progress?.status === "Completed";
          const isInProgress = progress?.status === "InProgress";
          const isNotStarted = !progress || progress.status === "NotStarted";

          return (
            <div
              key={topic.id}
              style={{
                backgroundColor: "var(--color-bg-card)",
                border: isCompleted
                  ? "2px solid rgba(16, 185, 129, 0.45)"
                  : isInProgress
                  ? "2px solid rgba(59, 130, 246, 0.45)"
                  : "1px solid var(--color-border)",
                borderRadius: "18px",
                padding: "20px 24px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              {/* Left: Step, Level badge & Info */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", flex: "1 1 500px" }}>
                {/* Step circle indicator */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    backgroundColor: isCompleted
                      ? "rgba(16, 185, 129, 0.15)"
                      : isInProgress
                      ? "rgba(59, 130, 246, 0.15)"
                      : "var(--color-bg-subtle)",
                    color: isCompleted
                      ? "var(--color-primary)"
                      : isInProgress
                      ? "#3b82f6"
                      : "var(--color-text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={24} /> : String(topic.order).padStart(2, "0")}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "6px",
                        backgroundColor: "var(--color-bg-subtle)",
                        color: topic.badgeColor,
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        border: `1px solid ${topic.badgeColor}33`,
                      }}
                    >
                      {topic.level}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
                      {topic.stageName}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "3px" }}>
                      <Clock size={12} /> {topic.estimatedMinutes} phút
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--color-text-primary)",
                      margin: "4px 0 2px 0",
                    }}
                  >
                    {topic.title}{" "}
                    <span style={{ fontSize: "1rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>
                      • {topic.vietnameseTitle}
                    </span>
                  </h3>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {topic.description}
                  </p>

                  {/* Badges tiến độ chi tiết */}
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                    {/* Lý thuyết */}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "3px 10px",
                        borderRadius: "8px",
                        backgroundColor: progress?.isTheoryCompleted ? "rgba(16, 185, 129, 0.12)" : "var(--color-bg-subtle)",
                        color: progress?.isTheoryCompleted ? "var(--color-primary)" : "var(--color-text-secondary)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <BookOpen size={13} />
                      {progress?.isTheoryCompleted ? "Lý thuyết: Đã đọc" : "Lý thuyết: Chưa học"}
                    </span>

                    {/* Thực hành */}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "3px 10px",
                        borderRadius: "8px",
                        backgroundColor: progress?.isPracticeCompleted ? "rgba(59, 130, 246, 0.12)" : "var(--color-bg-subtle)",
                        color: progress?.isPracticeCompleted ? "#3b82f6" : "var(--color-text-secondary)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Award size={13} />
                      {progress?.isPracticeCompleted
                        ? `Thực hành: ${progress.practiceScore}%`
                        : "Thực hành: Chưa làm"}
                    </span>

                    {/* Ôn tập */}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "3px 10px",
                        borderRadius: "8px",
                        backgroundColor: progress?.isReviewCompleted ? "rgba(139, 92, 246, 0.12)" : "var(--color-bg-subtle)",
                        color: progress?.isReviewCompleted ? "#8b5cf6" : "var(--color-text-secondary)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Star size={13} />
                      {progress?.isReviewCompleted
                        ? `Ôn tập: ${progress.masteryScore}%`
                        : "Ôn tập: Chưa làm"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Action Button */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link
                  href={`/grammar/${topic.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    backgroundColor: isCompleted
                      ? "var(--color-bg-subtle)"
                      : isInProgress
                      ? "#3b82f6"
                      : "var(--color-primary)",
                    color: isCompleted ? "var(--color-text-primary)" : "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    border: isCompleted ? "1px solid var(--color-border)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw size={16} />
                      <span>Ôn tập lại</span>
                    </>
                  ) : isInProgress ? (
                    <>
                      <span>Tiếp tục học</span>
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      <span>Bắt đầu học</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </Link>
              </div>
            </div>
          );
        })}

        {filteredTopics.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              backgroundColor: "var(--color-bg-card)",
              borderRadius: "18px",
              border: "1px dashed var(--color-border)",
            }}
          >
            <Compass size={40} style={{ color: "var(--color-text-secondary)", marginBottom: "12px" }} />
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              Không tìm thấy chủ điểm ngữ pháp nào
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginTop: "4px" }}>
              Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc chặng.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
