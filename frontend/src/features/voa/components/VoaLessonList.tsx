"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  BookOpen,
  Clock,
  FileText,
  Search,
  Sparkles,
  ChevronRight,
  Filter,
} from "lucide-react";
import { VOA_LESSONS } from "../voa.data";
import { VoaLevel, VoaLesson } from "../voa.types";
import { ROUTES } from "@/src/config/routes";

export default function VoaLessonList() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", ...Array.from(new Set(VOA_LESSONS.map((l) => l.category)))];

  const filteredLessons = VOA_LESSONS.filter((lesson) => {
    if (selectedLevel !== "all" && lesson.level !== selectedLevel) {
      return false;
    }
    if (selectedCategory !== "all" && lesson.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchSummary = lesson.summary.toLowerCase().includes(q);
      const matchCategory = lesson.category.toLowerCase().includes(q);
      return matchTitle || matchSummary || matchCategory;
    }
    return true;
  });

  const getLevelBadge = (level: VoaLevel, levelNum: number) => {
    switch (level) {
      case "beginning":
        return {
          label: `Level ${levelNum}: Sơ cấp (A1-A2)`,
          color: "#10b981",
          bg: "rgba(16, 185, 129, 0.12)",
        };
      case "intermediate":
        return {
          label: `Level ${levelNum}: Trung cấp (B1-B2)`,
          color: "#3b82f6",
          bg: "rgba(59, 130, 246, 0.12)",
        };
      case "advanced":
        return {
          label: `Level ${levelNum}: Nâng cao (C1)`,
          color: "#8b5cf6",
          bg: "rgba(139, 92, 246, 0.12)",
        };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Level Selection Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        {[
          {
            id: "all",
            title: "Tất cả các Level",
            sub: "Toàn bộ bài học VOA",
            count: VOA_LESSONS.length,
          },
          {
            id: "beginning",
            title: "Level 1: Sơ cấp",
            sub: "A1 - A2 • Tốc độ chậm & Rõ ràng",
            count: VOA_LESSONS.filter((l) => l.level === "beginning").length,
          },
          {
            id: "intermediate",
            title: "Level 2: Trung cấp",
            sub: "B1 - B2 • Đời sống, Khoa học & Câu chuyện",
            count: VOA_LESSONS.filter((l) => l.level === "intermediate").length,
          },
          {
            id: "advanced",
            title: "Level 3: Nâng cao",
            sub: "C1 • Thành ngữ, Phân tích & Đột phá",
            count: VOA_LESSONS.filter((l) => l.level === "advanced").length,
          },
        ].map((lvl) => {
          const isActive = selectedLevel === lvl.id;
          return (
            <button
              key={lvl.id}
              type="button"
              onClick={() => setSelectedLevel(lvl.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "16px 18px",
                borderRadius: "14px",
                border: isActive ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                backgroundColor: isActive ? "rgba(16, 185, 129, 0.08)" : "var(--color-bg-card)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
                boxShadow: isActive ? "0 4px 14px rgba(16, 185, 129, 0.15)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: isActive ? "var(--color-primary)" : "var(--color-text-primary)",
                  }}
                >
                  {lvl.title}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    backgroundColor: isActive ? "var(--color-primary)" : "var(--color-bg-alt)",
                    color: isActive ? "#ffffff" : "var(--color-text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  {lvl.count} bài
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-text-secondary)",
                  marginTop: "6px",
                }}
              >
                {lvl.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px",
          padding: "10px 16px",
        }}
      >
        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 240px" }}>
          <Search size={18} style={{ color: "var(--color-text-secondary)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài đọc hoặc chủ đề..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "0.9rem",
              color: "var(--color-text-primary)",
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
          <Filter size={16} style={{ color: "var(--color-text-secondary)", marginRight: "4px" }} />
          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  border: isCatActive ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  backgroundColor: isCatActive ? "rgba(16, 185, 129, 0.12)" : "transparent",
                  color: isCatActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {cat === "all" ? "Tất cả chủ đề" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Grid */}
      {filteredLessons.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 16px",
            backgroundColor: "var(--color-bg-card)",
            borderRadius: "16px",
            border: "1px solid var(--color-border)",
          }}
        >
          <BookOpen size={40} style={{ color: "var(--color-text-secondary)", marginBottom: "12px" }} />
          <h3 style={{ margin: "0 0 6px 0", color: "var(--color-text-primary)" }}>Không tìm thấy bài học phù hợp</h3>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
            Vui lòng thử chọn cấp độ hoặc từ khóa tìm kiếm khác.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredLessons.map((lesson) => {
            const badge = getLevelBadge(lesson.level, lesson.levelNumber);

            return (
              <div
                key={lesson.id}
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                }}
              >
                {/* Card Banner Image / Header */}
                <div
                  style={{
                    height: "150px",
                    backgroundImage: `url(${lesson.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "12px 14px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        backgroundColor: badge.color,
                        color: "#ffffff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div
                  style={{
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                    <span>{lesson.category}</span>
                    <span>•</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={13} /> {lesson.duration}
                    </span>
                    <span>•</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <FileText size={13} /> {lesson.wordCount} từ
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {lesson.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {lesson.summary}
                  </p>

                  {/* Vocabulary count tag */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "12px",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>
                      {lesson.vocabulary.length} từ vựng trọng tâm
                    </span>

                    <Link
                      href={ROUTES.VOA_DETAIL(lesson.slug)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "var(--color-primary)",
                        color: "#ffffff",
                        padding: "8px 14px",
                        borderRadius: "10px",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <Headphones size={15} />
                      <span>Học & Nghe</span>
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
