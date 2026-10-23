"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Volume2,
  BookOpen,
  PlusCircle,
  Loader2,
  AlertCircle,
  Gauge,
} from "lucide-react";
import { dictionaryApi } from "../dictionary.api";
import { DictionaryEntry } from "../dictionary.types";
import { ROUTES } from "@/src/config/routes";

const POPULAR_WORDS = [
  "resilience",
  "perseverance",
  "eloquent",
  "epiphany",
  "serendipity",
  "innovative",
  "meticulous",
  "pragmatic",
];

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5];

interface DictionaryViewProps {
  initialWord?: string;
  onSelectWord?: (word: string) => void;
  isCompact?: boolean;
}

export default function DictionaryView({
  initialWord = "",
  onSelectWord,
  isCompact = false,
}: DictionaryViewProps) {
  const [searchTerm, setSearchTerm] = useState(initialWord);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<DictionaryEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1.0);

  // Load history & speed preference from local storage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("_octo_dict_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
      const savedSpeed = localStorage.getItem("_octo_dict_speed");
      if (savedSpeed) {
        const parsed = parseFloat(savedSpeed);
        if (!isNaN(parsed) && parsed > 0) {
          setVoiceSpeed(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSpeedChange = (newSpeed: number) => {
    setVoiceSpeed(newSpeed);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("_octo_dict_speed", String(newSpeed));
      } catch {
        // ignore
      }
    }
  };

  const saveToHistory = (word: string) => {
    if (typeof window === "undefined") return;
    try {
      const updated = [word, ...history.filter((w) => w.toLowerCase() !== word.toLowerCase())].slice(0, 8);
      setHistory(updated);
      localStorage.setItem("_octo_dict_history", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSearch = async (wordToSearch?: string) => {
    const query = (wordToSearch ?? searchTerm).trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setEntries(null);

    try {
      const results = await dictionaryApi.lookup(query);
      setEntries(results);
      saveToHistory(query);
      if (onSelectWord) onSelectWord(query);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Không thể tra cứu từ điển lúc này. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialWord) {
      setSearchTerm(initialWord);
      handleSearch(initialWord);
    }
  }, [initialWord]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Find best available audio URL
  const getAudioUrl = (entry: DictionaryEntry): string | undefined => {
    const audioPhonetic = entry.phonetics.find((p) => p.audio && p.audio.trim().length > 0);
    return audioPhonetic?.audio;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      {/* Search Input Bar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px",
          padding: "6px 12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Search size={20} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập từ tiếng Anh để tra nghĩa, phát âm..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "1rem",
            background: "transparent",
            color: "var(--color-text-primary)",
            padding: "8px 0",
          }}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setEntries(null);
              setError(null);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              fontSize: "0.85rem",
              padding: "4px 8px",
            }}
          >
            Xóa
          </button>
        )}
        <button
          type="button"
          onClick={() => handleSearch()}
          disabled={loading || !searchTerm.trim()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "var(--color-primary)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: loading || !searchTerm.trim() ? "not-allowed" : "pointer",
            opacity: loading || !searchTerm.trim() ? 0.7 : 1,
            transition: "all 0.15s ease",
          }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          <span>{loading ? "Đang tra..." : "Tra cứu"}</span>
        </button>
      </div>

      {/* Suggested Words & History */}
      {!entries && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {history.length > 0 && (
            <div>
              <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
                Lịch sử tra cứu gần đây:
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {history.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => {
                      setSearchTerm(w);
                      handleSearch(w);
                    }}
                    style={{
                      background: "rgba(16, 185, 129, 0.08)",
                      color: "var(--color-primary)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      borderRadius: "8px",
                      padding: "5px 12px",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "8px" }}>
              Từ vựng gợi ý tra nhanh:
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {POPULAR_WORDS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => {
                    setSearchTerm(w);
                    handleSearch(w);
                  }}
                  style={{
                    background: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)",
                    borderRadius: "8px",
                    padding: "5px 12px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.925rem",
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {entries && entries.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {entries.map((entry, eIdx) => {
            const audioUrl = getAudioUrl(entry);
            const primaryPhonetic = entry.phonetic || entry.phonetics.find((p) => p.text)?.text;

            return (
              <div
                key={eIdx}
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: isCompact ? "18px" : "26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                }}
              >
                {/* Word header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "16px",
                    borderBottom: "1px solid var(--color-border)",
                    paddingBottom: "16px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: isCompact ? "1.5rem" : "2rem",
                        fontWeight: 800,
                        margin: 0,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {entry.word}
                    </h2>
                    {primaryPhonetic && (
                      <div
                        style={{
                          fontSize: "1.05rem",
                          color: "var(--color-primary)",
                          fontFamily: "monospace",
                          marginTop: "4px",
                          fontWeight: 600,
                        }}
                      >
                        {primaryPhonetic}
                      </div>
                    )}
                  </div>

                  {/* Actions & Speed Control */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                    {/* Main action buttons */}
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => dictionaryApi.playPronunciation(entry.word, audioUrl, voiceSpeed)}
                        title={`Phát âm từ này (Tốc độ ${voiceSpeed}x)`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "rgba(16, 185, 129, 0.12)",
                          color: "var(--color-primary)",
                          border: "1px solid rgba(16, 185, 129, 0.25)",
                          borderRadius: "10px",
                          padding: "8px 14px",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <Volume2 size={18} />
                        <span>Nghe phát âm ({voiceSpeed}x)</span>
                      </button>

                      <Link
                        href={`${ROUTES.FLASHCARDS_CREATE}?word=${encodeURIComponent(
                          entry.word
                        )}&definition=${encodeURIComponent(
                          entry.meanings[0]?.definitions[0]?.definition || ""
                        )}&phonetic=${encodeURIComponent(primaryPhonetic || "")}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "#3b82f6",
                          border: "1px solid rgba(59, 130, 246, 0.25)",
                          borderRadius: "10px",
                          padding: "8px 14px",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          textDecoration: "none",
                        }}
                      >
                        <PlusCircle size={18} />
                        <span>Tạo thẻ Flashcard</span>
                      </Link>
                    </div>

                    {/* Speed selector bar */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "var(--color-bg-alt)",
                        padding: "3px 8px",
                        borderRadius: "8px",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <Gauge size={14} style={{ color: "var(--color-text-secondary)" }} />
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
                        Tốc độ đọc:
                      </span>
                      <div style={{ display: "flex", gap: "3px" }}>
                        {SPEED_OPTIONS.map((s) => {
                          const isSelected = voiceSpeed === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => handleSpeedChange(s)}
                              style={{
                                padding: "2px 6px",
                                borderRadius: "5px",
                                border: "none",
                                backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
                                color: isSelected ? "#ffffff" : "var(--color-text-secondary)",
                                fontSize: "0.725rem",
                                fontWeight: isSelected ? 700 : 500,
                                cursor: "pointer",
                                transition: "all 0.12s ease",
                              }}
                            >
                              {s}x
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meanings */}
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {entry.meanings.map((meaning, mIdx) => (
                    <div key={mIdx} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          width: "fit-content",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          background: "rgba(99, 102, 241, 0.12)",
                          color: "#6366f1",
                          fontSize: "0.825rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        <BookOpen size={14} />
                        <span>{meaning.partOfSpeech}</span>
                      </div>

                      <ol
                        style={{
                          margin: 0,
                          paddingLeft: "20px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {meaning.definitions.map((def, dIdx) => (
                          <li key={dIdx} style={{ color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                            <div style={{ fontSize: "0.95rem" }}>{def.definition}</div>
                            {def.example && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "8px",
                                  fontSize: "0.875rem",
                                  color: "var(--color-text-secondary)",
                                  fontStyle: "italic",
                                  marginTop: "4px",
                                  background: "var(--color-bg-alt)",
                                  padding: "4px 10px",
                                  borderRadius: "6px",
                                }}
                              >
                                <span>&ldquo;{def.example}&rdquo;</span>
                                <button
                                  type="button"
                                  onClick={() => dictionaryApi.speakWebSpeech(def.example!, voiceSpeed)}
                                  title={`Nghe đọc ví dụ (Tốc độ ${voiceSpeed}x)`}
                                  style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "var(--color-primary)",
                                    cursor: "pointer",
                                    padding: "2px",
                                    display: "flex",
                                    alignItems: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <Volume2 size={15} />
                                </button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ol>

                      {meaning.synonyms && meaning.synonyms.length > 0 && (
                        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", marginTop: "6px" }}>
                          <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
                            Từ đồng nghĩa:
                          </span>
                          {meaning.synonyms.slice(0, 6).map((syn) => (
                            <button
                              key={syn}
                              type="button"
                              onClick={() => {
                                setSearchTerm(syn);
                                handleSearch(syn);
                              }}
                              style={{
                                background: "var(--color-bg-alt)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "6px",
                                padding: "2px 8px",
                                fontSize: "0.8rem",
                                color: "var(--color-text-primary)",
                                cursor: "pointer",
                              }}
                            >
                              {syn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
