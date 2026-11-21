"use client";

import React, { useState, useCallback } from "react";
import { BookOpen, RefreshCw } from "lucide-react";
import { STANDARDIZED_VOCABULARY } from "../data/vocabulary.data";
import { VocabularyItem, FrameworkType } from "../types";
import VocabularyFilters from "../components/VocabularyFilters";
import WordCard from "../components/WordCard";
import { naturalAudio } from "@/src/lib/audio/naturalAudio";

export default function VocabularyPage() {
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
      console.warn("[VocabularyPage] API fetch error:", err);
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
      <VocabularyFilters
        words={words}
        source={source}
        selectedLevel={selectedLevel}
        selectedFramework={selectedFramework}
        selectedTopic={selectedTopic}
        searchQuery={searchQuery}
        topics={popularTopics}
        onLevel={setSelectedLevel}
        onFramework={setSelectedFramework}
        onSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onTopic={handleTopicClick}
      />

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
            filteredWords.map((item) => <WordCard key={item.id} item={item} isPlaying={playingWord === item.word} onPlay={playWord} />)
          )}
        </div>
      )}
    </div>
  );
}
