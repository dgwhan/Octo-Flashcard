"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  Volume2,
  PlusCircle,
  Search,
  Filter,
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  Globe,
  RefreshCw,
} from "lucide-react";
import { STANDARDIZED_VOCABULARY } from "../vocabulary.data";
import { VocabularyItem, CEFRLevel, FrameworkType } from "../vocabulary.types";
import { ROUTES } from "@/src/config/routes";
import { naturalAudio } from "@/src/features/dictionary";

export default function VocabularyHub() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedFramework, setSelectedFramework] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  // Dynamic API state
  const [words, setWords] = useState<VocabularyItem[]>(STANDARDIZED_VOCABULARY);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<"api" | "curated">("curated");

  const popularTopics = [
    { label: "Tất cả", value: "all" },
    { label: "Công nghệ", value: "technology" },
    { label: "Kinh doanh", value: "business" },
    { label: "Khoa học", value: "science" },
    { label: "Môi trường", value: "environment" },
    { label: "Giáo dục", value: "education" },
    { label: "Xã hội", value: "society" },
  ];

  const fetchLiveVocabulary = useCallback(async (queryText: string, topicText: string, level: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (queryText.trim()) params.set("query", queryText.trim());
      if (topicText && topicText !== "all") params.set("topic", topicText);
      if (level && level !== "all") params.set("level", level);
      params.set("limit", "24");

      const res = await fetch(`/api/vocabulary?${params.toString()}`);
      if (!res.ok) throw new Error("Vocabulary API failed");

      const data = await res.json();
      if (data.vocabulary && data.vocabulary.length > 0) {
        setWords(data.vocabulary);
        setSource(data.source === "datamuse-api" ? "api" : "curated");
      } else {
        setWords(STANDARDIZED_VOCABULARY);
        setSource("curated");
      }
    } catch (err) {
      console.warn("[VocabularyHub] API fetch error:", err);
      setWords(STANDARDIZED_VOCABULARY);
      setSource("curated");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchLiveVocabulary(searchQuery, selectedTopic, selectedLevel);
    } else {
      setWords(STANDARDIZED_VOCABULARY);
      setSource("curated");
    }
  };

  const handleTopicClick = (topicVal: string) => {
    setSelectedTopic(topicVal);
    if (topicVal === "all") {
      setWords(STANDARDIZED_VOCABULARY);
      setSource("curated");
    } else {
      fetchLiveVocabulary(searchQuery, topicVal, selectedLevel);
    }
  };

  const filteredWords = words.filter((item) => {
    if (selectedLevel !== "all" && item.level !== selectedLevel) return false;
    if (source === "curated") {
      if (selectedFramework !== "all" && !item.frameworks.includes(selectedFramework as FrameworkType)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchWord = item.word.toLowerCase().includes(q);
        const matchViet = item.vietnamese.toLowerCase().includes(q);
        const matchDef = item.definition.toLowerCase().includes(q);
        return matchWord || matchViet || matchDef;
      }
    }
    return true;
  });

  const getLevelBadge = (level: CEFRLevel) => {
    switch (level) {
      case "A1":
        return { bg: "rgba(16, 185, 129, 0.12)", color: "#10b981", desc: "A1 • Sơ cấp khởi đầu" };
      case "A2":
        return { bg: "rgba(59, 130, 246, 0.12)", color: "#3b82f6", desc: "A2 • Sơ cấp mở rộng" };
      case "B1":
        return { bg: "rgba(245, 158, 11, 0.12)", color: "#f59e0b", desc: "B1 • Trung cấp cơ bản" };
      case "B2":
        return { bg: "rgba(249, 115, 22, 0.12)", color: "#f97316", desc: "B2 • Trung cấp nâng cao" };
      case "C1":
        return { bg: "rgba(139, 92, 246, 0.12)", color: "#8b5cf6", desc: "C1 • Cao cấp học thuật" };
      case "C2":
        return { bg: "rgba(236, 72, 153, 0.12)", color: "#ec4899", desc: "C2 • Thành thạo bản ngữ" };
    }
  };

  const playWord = async (word: string) => {
    if (playingWord === word) {
      naturalAudio.stop();
      setPlayingWord(null);
      return;
    }

    setPlayingWord(word);
    try {
      await naturalAudio.play(word, undefined, 1.0);
    } catch {
      // NaturalAudio handles internal fallback
    } finally {
      setPlayingWord(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* CEFR Level Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "10px",
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedLevel("all")}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: selectedLevel === "all" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
            backgroundColor: selectedLevel === "all" ? "rgba(16, 185, 129, 0.12)" : "var(--color-bg-card)",
            color: selectedLevel === "all" ? "var(--color-primary)" : "var(--color-text-primary)",
            fontWeight: 700,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "1.1rem" }}>Tất cả</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "2px" }}>
            A1 - C2 ({words.length})
          </div>
        </button>

        {(["A1", "A2", "B1", "B2", "C1", "C2"] as CEFRLevel[]).map((lvl) => {
          const isActive = selectedLevel === lvl;
          const count = words.filter((v) => v.level === lvl).length;
          const badge = getLevelBadge(lvl);

          return (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: isActive ? `2px solid ${badge.color}` : "1px solid var(--color-border)",
                backgroundColor: isActive ? badge.bg : "var(--color-bg-card)",
                color: isActive ? badge.color : "var(--color-text-primary)",
                fontWeight: 700,
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{lvl}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.85, marginTop: "2px" }}>{count} từ vựng</div>
            </button>
          );
        })}
      </div>

      {/* Filter Toolbar & Framework Selector */}
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
          padding: "14px 18px",
        }}
      >
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 260px" }}
        >
          <Search size={18} style={{ color: "var(--color-text-secondary)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tra cứu từ vựng mở rộng (vd: technology, resilient, manage)... Nhấn Enter"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "0.95rem",
              color: "var(--color-text-primary)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            Tra cứu
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Framework buttons */}
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { id: "all", label: "Tất cả chuẩn" },
              { id: "CEFR", label: "CEFR-J" },
              { id: "NGSL", label: "NGSL" },
              { id: "AWL", label: "AWL" },
            ].map((fw) => {
              const isActive = selectedFramework === fw.id;
              return (
                <button
                  key={fw.id}
                  type="button"
                  onClick={() => setSelectedFramework(fw.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                    backgroundColor: isActive ? "rgba(16, 185, 129, 0.12)" : "transparent",
                    color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {fw.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.8rem",
              padding: "4px 10px",
              borderRadius: "20px",
              backgroundColor:
                source === "api" ? "rgba(16, 185, 129, 0.12)" : "rgba(59, 130, 246, 0.12)",
              color: source === "api" ? "#10b981" : "#3b82f6",
              fontWeight: 600,
            }}
          >
            <Globe size={14} />
            {source === "api" ? "Datamuse API Live" : "Kho chuẩn hóa"}
          </div>
        </div>
      </div>

      {/* Topic Chips */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginRight: "4px" }}>
          Chủ đề từ điển mở:
        </span>
        {popularTopics.map((top) => {
          const isActive = selectedTopic === top.value;
          return (
            <button
              key={top.value}
              type="button"
              onClick={() => handleTopicClick(top.value)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? "var(--color-primary)" : "var(--color-bg-card)",
                color: isActive ? "#ffffff" : "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {top.label}
            </button>
          );
        })}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "40px",
            color: "var(--color-text-secondary)",
          }}
        >
          <RefreshCw size={20} className="animate-spin" />
          <span>Đang tra cứu cơ sở dữ liệu từ điển mở...</span>
        </div>
      )}

      {/* Vocabulary Grid */}
      {!isLoading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredWords.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "48px 24px",
                backgroundColor: "var(--color-bg-card)",
                borderRadius: "16px",
                border: "1px dashed var(--color-border)",
              }}
            >
              <BookOpen size={40} style={{ color: "var(--color-text-secondary)", marginBottom: "12px" }} />
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>Không tìm thấy từ vựng phù hợp</div>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginTop: "6px" }}>
                Thử chọn cấp độ khác hoặc tìm kiếm với từ khóa mới
              </p>
            </div>
          ) : (
            filteredWords.map((item) => {
              const badge = getLevelBadge(item.level);
              const isPlaying = playingWord === item.word;

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: isPlaying ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    boxShadow: isPlaying ? "0 4px 16px rgba(16, 185, 129, 0.15)" : "var(--shadow-card)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Card Header: Word + IPA + Audio */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--color-text-primary)" }}>
                          {item.word}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: "4px",
                            backgroundColor: "var(--color-bg-alt)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {item.partOfSpeech}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--color-primary)",
                          fontFamily: "monospace",
                          marginTop: "2px",
                        }}
                      >
                        {item.ipa}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => playWord(item.word)}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        backgroundColor: isPlaying ? "var(--color-primary)" : "rgba(16, 185, 129, 0.12)",
                        color: isPlaying ? "#ffffff" : "var(--color-primary)",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                      title="Nghe phát âm chuẩn tự nhiên"
                    >
                      <Volume2 size={18} className={isPlaying ? "animate-pulse" : ""} />
                    </button>
                  </div>

                  {/* Vietnamese Meaning & Definition */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ fontWeight: 600, color: "var(--color-text-primary)", fontSize: "0.95rem" }}>
                      {item.vietnamese}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                      {item.definition}
                    </div>
                  </div>

                  {/* Example Sentence */}
                  <div
                    style={{
                      padding: "10px 12px",
                      backgroundColor: "var(--color-bg-alt)",
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      color: "var(--color-text-primary)",
                      fontStyle: "italic",
                      lineHeight: 1.45,
                      borderLeft: "3px solid var(--color-primary)",
                    }}
                  >
                    &ldquo;{item.example}&rdquo;
                  </div>

                  {/* Tags and Badges */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "auto",
                      paddingTop: "10px",
                      borderTop: "1px solid var(--color-border)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "10px",
                          backgroundColor: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {item.level}
                      </span>
                      {item.frameworks.map((fw) => (
                        <span
                          key={fw}
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: "6px",
                            backgroundColor: "var(--color-bg-hover)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {fw}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`${ROUTES.FLASHCARDS_CREATE}?front=${encodeURIComponent(
                        item.word
                      )}&back=${encodeURIComponent(`${item.vietnamese}\n\n${item.example}`)}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.775rem",
                        fontWeight: 600,
                        color: "var(--color-primary)",
                        textDecoration: "none",
                      }}
                      title="Lưu vào bộ thẻ học Flashcard"
                    >
                      <PlusCircle size={13} />
                      Thêm thẻ
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
