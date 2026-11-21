"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { dictionaryApi } from "../api/dictionary.api";
import { DictionaryEntry } from "../types";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import EntryCard from "../components/EntryCard";



interface DictionaryViewProps {
  initialWord?: string;
  onSelectWord?: (word: string) => void;
  isCompact?: boolean;
}

export default function DictionaryPage({
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


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      {/* Search Input Bar */}
      <SearchBar
        value={searchTerm}
        loading={loading}
        onChange={setSearchTerm}
        onKeyDown={handleKeyDown}
        onSearch={() => handleSearch()}
        onClear={() => {
          setSearchTerm("");
          setEntries(null);
          setError(null);
        }}
      />

      {/* Suggested Words & History */}
      {!entries && !loading && (
        <SearchHistory
          history={history}
          onPick={(w) => {
            setSearchTerm(w);
            handleSearch(w);
          }}
        />
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            padding: "16px",
            borderRadius: "12px",
            background: "var(--color-danger-light)",
            border: "1px solid var(--color-danger-border)",
            color: "var(--color-danger)",
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
          {entries.map((entry, eIdx) => (
              <EntryCard
                key={eIdx}
                entry={entry}
                isCompact={isCompact}
                voiceSpeed={voiceSpeed}
                onSpeed={handleSpeedChange}
                onLookup={(w) => {
                  setSearchTerm(w);
                  handleSearch(w);
                }}
              />
          ))}
        </div>
      )}
    </div>
  );
}
