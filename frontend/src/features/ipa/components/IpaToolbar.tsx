"use client";

import { Headphones } from "lucide-react";

interface IpaToolbarProps {
  activeCategory: string;
  isQuizMode: boolean;
  onCategory: (id: string) => void;
  onToggleQuiz: () => void;
}

/** Sound-category filter pills and the listening-quiz toggle. */
export default function IpaToolbar({ activeCategory, isQuizMode, onCategory, onToggleQuiz }: IpaToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "16px 20px",
      }}
    >
      {/* Category Filter Pills */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {[
          { id: "all", label: "Tất cả 44 âm" },
          { id: "monophthongs", label: "Nguyên âm đơn (12)" },
          { id: "diphthongs", label: "Nguyên âm đôi (8)" },
          { id: "unvoiced", label: "Phụ âm vô thanh (8)" },
          { id: "voiced", label: "Phụ âm hữu thanh (16)" },
        ].map((cat) => {
          const isActive = activeCategory === cat.id && !isQuizMode;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onCategory(cat.id);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                backgroundColor: isActive ? "var(--color-primary)" : "transparent",
                color: isActive ? "var(--color-text-inverse)" : "var(--color-text-primary)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Practice Quiz Trigger */}
      <button
        type="button"
        onClick={() => {
          onToggleQuiz();
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 18px",
          borderRadius: "10px",
          border: isQuizMode ? "1px solid var(--color-warning)" : "1px solid var(--color-primary-ring)",
          backgroundColor: isQuizMode ? "var(--color-warning)" : "var(--color-primary-light)",
          color: isQuizMode ? "var(--color-text-inverse)" : "var(--color-primary)",
          fontWeight: 700,
          fontSize: "0.875rem",
          cursor: "pointer",
        }}
      >
        <Headphones size={18} />
        <span>{isQuizMode ? "Quay lại bảng IPA" : "Luyện tai nghe phản xạ âm"}</span>
      </button>
    </div>
  );
}
