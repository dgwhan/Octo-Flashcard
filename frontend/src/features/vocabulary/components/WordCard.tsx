"use client";

import { Volume2 } from "lucide-react";
import SaveToDeckButton from "@/src/features/flashcards/components/SaveToDeckButton";
import type { VocabularyItem } from "../types";
import { getLevelBadge } from "../lib/levelBadge";

interface WordCardProps {
  item: VocabularyItem;
  isPlaying: boolean;
  onPlay: (word: string) => void;
}

/** One word: level, IPA, audio, meaning, definition, example, frameworks, save to deck. */
export default function WordCard({ item, isPlaying, onPlay }: WordCardProps) {
  const badge = getLevelBadge(item.level);
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: isPlaying ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxShadow: isPlaying ? "0 4px 16px var(--color-primary-light)" : "var(--shadow-card)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Card Header: Word + IPA + Audio */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0, color: "var(--color-text-primary)" }}>
              {item.word}
            </h2>
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
          onClick={() => onPlay(item.word)}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: isPlaying ? "var(--color-primary)" : "var(--color-primary-light)",
            color: isPlaying ? "var(--color-text-inverse)" : "var(--color-primary)",
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

        <SaveToDeckButton
          front={item.word}
          back={`${item.vietnamese}
          ${item.example}`}
        />
      </div>
    </div>
  );
}
