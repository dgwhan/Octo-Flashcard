"use client";

import React from "react";
import { Volume2, Info } from "lucide-react";
import type { IpaPhoneme } from "../types";
import { getCategoryBadge } from "../lib/categoryBadge";

interface PhonemeGridProps {
  phonemes: IpaPhoneme[];
  playingId: string | null;
  onSelect: (phoneme: IpaPhoneme) => void;
  onPlaySound: (phoneme: IpaPhoneme, e?: React.MouseEvent) => void;
  onPlayWord: (word: string, e?: React.MouseEvent) => void;
}

/** Tiles for the 44 sounds; click a tile for details, the speaker icon to listen. */
export default function PhonemeGrid({ phonemes, playingId, onSelect, onPlaySound, onPlayWord }: PhonemeGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: "16px",
      }}
    >
      {phonemes.map((item) => {
        const badge = getCategoryBadge(item.category);
        const isPlaying = playingId === item.id;

        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            // card holds nested buttons, so it can't be a <button>; give it button semantics + keys instead
            role="button"
            tabIndex={0}
            aria-label={`Xem chi tiết âm /${item.symbol}/`}
            onKeyDown={(e) => {
              if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelect(item);
              }
            }}
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: isPlaying ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              cursor: "pointer",
              position: "relative",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              boxShadow: isPlaying ? "0 8px 20px var(--color-primary-ring)" : "0 2px 6px rgba(0, 0, 0, 0.03)",
            }}
          >
            {/* Header with symbol & audio button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  fontFamily: "serif",
                  color: "var(--color-text-primary)",
                  letterSpacing: "0.5px",
                }}
              >
                /{item.symbol}/
              </div>

              <button
                type="button"
                onClick={(e) => onPlaySound(item, e)}
                title="Nghe phát âm chuẩn"
                aria-label={`Nghe âm /${item.symbol}/`}
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
              >
                <Volume2 size={20} />
              </button>
            </div>

            {/* Category Badge */}
            <span
              style={{
                display: "inline-block",
                padding: "3px 8px",
                borderRadius: "6px",
                backgroundColor: badge.bg,
                color: badge.color,
                fontSize: "0.75rem",
                fontWeight: 700,
                width: "fit-content",
              }}
            >
              {badge.label}
            </span>

            {/* Example Words with highlight */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {item.examples.slice(0, 2).map((ex, exIdx) => (
                <button
                  type="button"
                  key={exIdx}
                  onClick={(e) => onPlayWord(ex.word, e)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    border: "none",
                    font: "inherit",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "var(--color-text-primary)",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    backgroundColor: "var(--color-bg-alt)",
                  }}
                  title="Bấm để nghe từ này"
                  aria-label={`Nghe từ ${ex.word}`}
                >
                  <span>
                    <b>{ex.word}</b> <span style={{ color: "var(--color-text-secondary)", fontSize: "0.8rem" }}>{ex.ipa}</span>
                  </span>
                  <Volume2 size={14} aria-hidden="true" style={{ color: "var(--color-text-secondary)" }} />
                </button>
              ))}
            </div>

            {/* View Details Hint */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.775rem",
                color: "var(--color-primary)",
                fontWeight: 600,
                marginTop: "4px",
              }}
            >
              <Info size={14} />
              <span>Xem hướng dẫn khẩu hình</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
