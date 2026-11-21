"use client";

import Link from "next/link";
import { Sparkles, Volume2 } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import SaveToDeckButton from "@/src/features/flashcards/components/SaveToDeckButton";
import { AI_SOURCE_KEY, AI_MAX_CHARS } from "@/src/features/flashcards/components/AiCardsPanel";
import type { VoaLesson } from "../types";

interface VocabularyTabProps {
  lesson: VoaLesson;
  onPlayWord: (word: string) => void;
}

/** Key words of the lesson, each with audio and save-to-deck; plus "make more cards with AI". */
export default function VocabularyTab({ lesson, onPlayWord }: VocabularyTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Link
        href={`${ROUTES.FLASHCARDS_CREATE}?ai=1`}
        onClick={() => {
          try {
            sessionStorage.setItem(
              AI_SOURCE_KEY,
              JSON.stringify({ title: `VOA: ${lesson.title}`, text: lesson.paragraphs.join("\n\n").slice(0, AI_MAX_CHARS) })
            );
          } catch {
            // storage blocked: the create page opens with an empty AI panel
          }
        }}
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          borderBottom: "1.5px solid var(--color-primary)",
          paddingBottom: "2px",
        }}
      >
        <Sparkles size={16} aria-hidden="true" /> Tạo thêm thẻ từ cả bài bằng AI
      </Link>
      {lesson.vocabulary.map((vocab, vIdx) => (
        <div
          key={vIdx}
          style={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "14px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0, color: "var(--color-text-primary)" }}>
                  {vocab.word}
                </h3>
                <span style={{ fontSize: "0.95rem", color: "var(--color-primary)", fontFamily: "monospace", fontWeight: 600 }}>
                  {vocab.ipa}
                </span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "6px",
                    background: "rgba(99, 102, 241, 0.12)",
                    color: "var(--color-primary)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {vocab.partOfSpeech}
                </span>
              </div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "4px" }}>
                {vocab.vietnameseMeaning}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => onPlayWord(vocab.word)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Volume2 size={16} />
                <span>Phát âm</span>
              </button>

              <SaveToDeckButton
                front={vocab.ipa ? `${vocab.word} ${vocab.ipa}` : vocab.word}
                back={vocab.vietnameseMeaning}
              />
            </div>
          </div>

          <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
            <b>Định nghĩa Anh - Anh:</b> {vocab.definition}
          </div>

          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              fontStyle: "italic",
              background: "var(--color-bg-alt)",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            Ví dụ: &ldquo;{vocab.example}&rdquo;
          </div>
        </div>
      ))}
    </div>
  );
}
