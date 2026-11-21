"use client";

import { CheckCircle2 } from "lucide-react";
import type { VoaQuizQuestion } from "../types";

interface QuizTabProps {
  quiz: VoaQuizQuestion[];
  selected: Record<string, number>;
  submitted: boolean;
  score: number;
  onPick: (questionId: string, optionIndex: number) => void;
  onToggleSubmit: () => void;
}

/** Comprehension questions; after submitting shows right/wrong and explanations. */
export default function QuizTab({ quiz, selected, submitted, score, onPick, onToggleSubmit }: QuizTabProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {quiz.map((q, qIdx) => {
        const picked = selected[q.id];

        return (
          <div
            key={q.id}
            style={{
              paddingBottom: "20px",
              borderBottom: qIdx === quiz.length - 1 ? "none" : "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              Câu {qIdx + 1}: {q.question}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {q.options.map((opt, optIdx) => {
                const isSelected = picked === optIdx;
                const isCorrect = q.correctIndex === optIdx;

                let bg = "var(--color-bg-alt)";
                let border = "1px solid var(--color-border)";

                if (submitted) {
                  if (isCorrect) {
                    bg = "var(--color-success-light)";
                    border = "2px solid var(--color-success)";
                  } else if (isSelected) {
                    bg = "var(--color-danger-light)";
                    border = "2px solid var(--color-danger)";
                  }
                } else if (isSelected) {
                  bg = "var(--color-primary-light)";
                  border = "2px solid var(--color-primary)";
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => onPick(q.id, optIdx)}
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: bg,
                      border: border,
                      color: "var(--color-text-primary)",
                      fontSize: "0.95rem",
                      fontWeight: isSelected ? 600 : 400,
                      cursor: submitted ? "default" : "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {String.fromCharCode(65 + optIdx)}. {opt}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div
                style={{
                  marginTop: "6px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "var(--color-primary-light)",
                  border: "1px solid var(--color-primary-ring)",
                  fontSize: "0.875rem",
                  color: "var(--color-text-primary)",
                }}
              >
                <b>Giải thích chi tiết:</b> {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {/* Submit / Reset Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px" }}>
        {submitted ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CheckCircle2 size={24} style={{ color: "var(--color-success)" }} />
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              Kết quả: {score} / {quiz.length} câu đúng!
            </span>
          </div>
        ) : (
          <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Hãy chọn câu trả lời cho tất cả các câu hỏi trên
          </div>
        )}

        <button
          type="button"
          onClick={onToggleSubmit}
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-inverse)",
            border: "none",
            borderRadius: "10px",
            padding: "10px 22px",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          {submitted ? "Làm lại bài kiểm tra" : "Nộp bài & Xem giải thích"}
        </button>
      </div>
    </div>
  );
}
