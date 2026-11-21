"use client";

import { Volume2, BookOpen, Gauge } from "lucide-react";
import SaveToDeckButton from "@/src/features/flashcards/components/SaveToDeckButton";
import { dictionaryApi } from "../api/dictionary.api";
import type { DictionaryEntry } from "../types";

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5];

/** Best available recorded pronunciation for an entry. */
const getAudioUrl = (entry: DictionaryEntry): string | undefined =>
  entry.phonetics.find((p) => p.audio && p.audio.trim().length > 0)?.audio;

interface EntryCardProps {
  entry: DictionaryEntry;
  isCompact: boolean;
  voiceSpeed: number;
  onSpeed: (speed: number) => void;
  /** Look up another word (synonyms, antonyms) */
  onLookup: (word: string) => void;
}

/** One dictionary entry: word, phonetics, audio, speed, meanings, examples, synonyms. */
export default function EntryCard({ entry, isCompact, voiceSpeed, onSpeed, onLookup }: EntryCardProps) {
  const audioUrl = getAudioUrl(entry);
  const primaryPhonetic = entry.phonetic || entry.phonetics.find((p) => p.text)?.text;
  return (
    <div
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
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                border: "1px solid var(--color-primary-ring)",
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

            <SaveToDeckButton
              front={primaryPhonetic ? `${entry.word} ${primaryPhonetic}` : entry.word}
              back={entry.meanings[0]?.definitions[0]?.definition || ""}
            />
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
                    onClick={() => onSpeed(s)}
                    style={{
                      padding: "2px 6px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
                      color: isSelected ? "var(--color-text-inverse)" : "var(--color-text-secondary)",
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
                color: "var(--color-primary)",
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
                      onLookup(syn);
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
}
