"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Volume2,
  Search,
  PlusCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
  User,
  Sliders,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Globe,
} from "lucide-react";
import { TATOEBA_SENTENCES } from "../tatoeba.data";
import { TatoebaSentence } from "../tatoeba.types";
import { ROUTES } from "@/src/config/routes";
import { naturalAudio } from "@/src/features/dictionary";

export default function TatoebaExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);

  // Live API State
  const [sentences, setSentences] = useState<TatoebaSentence[]>(TATOEBA_SENTENCES);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiSource, setApiSource] = useState<"api" | "curated">("curated");

  const popularTopics = [
    { label: "Tất cả", value: "all" },
    { label: "Giao tiếp", value: "communication" },
    { label: "Công việc", value: "work" },
    { label: "Đời sống", value: "life" },
    { label: "Gia đình", value: "family" },
    { label: "Du lịch", value: "travel" },
    { label: "Thời gian", value: "time" },
  ];

  const fetchLiveSentences = useCallback(
    async (queryText: string, pageNum: number) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (queryText && queryText !== "all") {
          params.set("query", queryText);
        }
        params.set("page", String(pageNum));
        params.set("limit", "15");

        const res = await fetch(`/api/tatoeba?${params.toString()}`);
        if (!res.ok) throw new Error("API call failed");

        const data = await res.json();
        if (data.sentences && data.sentences.length > 0) {
          setSentences(data.sentences);
          setTotalPages(data.pageCount || 1);
          setApiSource(data.source === "tatoeba-api" ? "api" : "curated");
        } else {
          // If query produced 0 results, fallback to filtered curated
          const filtered = TATOEBA_SENTENCES.filter((s) =>
            s.english.toLowerCase().includes(queryText.toLowerCase())
          );
          setSentences(filtered.length > 0 ? filtered : TATOEBA_SENTENCES);
          setApiSource("curated");
        }
      } catch (err) {
        console.warn("[Tatoeba] Live fetch failed, using curated data:", err);
        setSentences(TATOEBA_SENTENCES);
        setApiSource("curated");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Load from API on mount
  useEffect(() => {
    fetchLiveSentences("", 1);
  }, [fetchLiveSentences]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLiveSentences(searchQuery.trim(), 1);
  };

  const handleTopicClick = (topicValue: string) => {
    setSelectedTopic(topicValue);
    setCurrentPage(1);
    if (topicValue === "all") {
      setSearchQuery("");
      fetchLiveSentences("", 1);
    } else {
      setSearchQuery(topicValue);
      fetchLiveSentences(topicValue, 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    fetchLiveSentences(searchQuery.trim(), newPage);
  };

  const filteredSentences = sentences.filter((s) => {
    if (selectedLevel !== "all" && s.level !== selectedLevel) return false;
    return true;
  });

  const playSentence = async (sentence: TatoebaSentence) => {
    if (playingId === sentence.id) {
      naturalAudio.stop();
      setPlayingId(null);
      return;
    }

    setPlayingId(sentence.id);
    try {
      await naturalAudio.play(sentence.english, sentence.audioUrl, voiceSpeed);
    } catch {
      // NaturalAudio handles internal fallback
    } finally {
      setPlayingId(null);
    }
  };

  const getLevelBadge = (lvl: string) => {
    switch (lvl) {
      case "Beginner":
        return { color: "#10b981", bg: "rgba(16, 185, 129, 0.12)", label: "Cơ bản" };
      case "Intermediate":
        return { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.12)", label: "Trung cấp" };
      case "Advanced":
        return { color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.12)", label: "Nâng cao" };
      default:
        return { color: "#10b981", bg: "rgba(16, 185, 129, 0.12)", label: lvl };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Search & Filter Toolbar */}
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
          style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 280px" }}
        >
          <Search size={18} style={{ color: "var(--color-text-secondary)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo từ khóa (vd: work, love, family, travel)... Nhấn Enter để tra cứu live"
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
            Tìm kiếm
          </button>
        </form>

        {/* Speed & Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Sliders size={16} style={{ color: "var(--color-text-secondary)" }} />
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>Tốc độ:</span>
            {[0.8, 1.0, 1.2].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setVoiceSpeed(s)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: voiceSpeed === s ? 700 : 500,
                  backgroundColor: voiceSpeed === s ? "var(--color-primary)" : "var(--color-bg-hover)",
                  color: voiceSpeed === s ? "#fff" : "var(--color-text-secondary)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {s}x
              </button>
            ))}
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
                apiSource === "api" ? "rgba(16, 185, 129, 0.12)" : "rgba(59, 130, 246, 0.12)",
              color: apiSource === "api" ? "#10b981" : "#3b82f6",
              fontWeight: 600,
            }}
          >
            <Globe size={14} />
            {apiSource === "api" ? "Tatoeba API Live" : "Kho chọn lọc"}
          </div>
        </div>
      </div>

      {/* Topic Chips */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginRight: "4px" }}>
          Chủ đề gợi ý:
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

      {/* Loading State */}
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
          <span>Đang kết nối kho dữ liệu phát âm Tatoeba...</span>
        </div>
      )}

      {/* Sentences List */}
      {!isLoading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredSentences.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                backgroundColor: "var(--color-bg-card)",
                borderRadius: "16px",
                border: "1px dashed var(--color-border)",
              }}
            >
              <MessageSquare size={40} style={{ color: "var(--color-text-secondary)", marginBottom: "12px" }} />
              <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>Không tìm thấy mẫu câu phù hợp</div>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginTop: "6px" }}>
                Thử tìm với từ khóa tiếng Anh đơn giản hơn như &apos;work&apos;, &apos;learn&apos;, &apos;friend&apos;
              </p>
            </div>
          ) : (
            filteredSentences.map((s) => {
              const isPlaying = playingId === s.id;
              const badge = getLevelBadge(s.level);

              return (
                <div
                  key={s.id}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: isPlaying ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    boxShadow: isPlaying ? "0 4px 20px rgba(16, 185, 129, 0.15)" : "var(--shadow-card)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    {/* Header tags */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "12px",
                          backgroundColor: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.label}
                      </span>

                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-text-secondary)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <User size={13} />
                        {s.speaker || "Người bản ngữ"}
                      </span>

                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-text-secondary)",
                          opacity: 0.7,
                        }}
                      >
                        #{s.sentenceId}
                      </span>
                    </div>

                    {/* English sentence */}
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.english}
                    </div>

                    {/* Vietnamese translation */}
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.vietnamese}
                    </div>

                    {/* Quick Action to Flashcard */}
                    <div style={{ marginTop: "6px" }}>
                      <Link
                        href={`${ROUTES.FLASHCARDS_CREATE}?front=${encodeURIComponent(
                          s.english
                        )}&back=${encodeURIComponent(s.vietnamese)}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "var(--color-primary)",
                          textDecoration: "none",
                        }}
                      >
                        <PlusCircle size={14} />
                        Tạo Flashcard từ câu này
                      </Link>
                    </div>
                  </div>

                  {/* Play Audio Button */}
                  <button
                    type="button"
                    onClick={() => playSentence(s)}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: isPlaying ? "var(--color-primary)" : "rgba(16, 185, 129, 0.12)",
                      color: isPlaying ? "#ffffff" : "var(--color-primary)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      boxShadow: isPlaying ? "0 4px 12px rgba(16, 185, 129, 0.3)" : "none",
                    }}
                    title="Nghe phát âm chuẩn người thật"
                  >
                    <Volume2 size={22} className={isPlaying ? "animate-pulse" : ""} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && !isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: currentPage <= 1 ? "var(--color-text-secondary)" : "var(--color-text-primary)",
              cursor: currentPage <= 1 ? "not-allowed" : "pointer",
              opacity: currentPage <= 1 ? 0.5 : 1,
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            <ChevronLeft size={16} /> Trang trước
          </button>

          <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
            Trang {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: currentPage >= totalPages ? "var(--color-text-secondary)" : "var(--color-text-primary)",
              cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
              opacity: currentPage >= totalPages ? 0.5 : 1,
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            Trang sau <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
