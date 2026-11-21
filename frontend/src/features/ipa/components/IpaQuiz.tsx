"use client";

import { Volume2, Award } from "lucide-react";
import type { IpaPhoneme } from "../types";
import { ipaAudio } from "../lib/ipa.audio";

interface IpaQuizProps {
  quizQuestion: IpaPhoneme;
  quizOptions: IpaPhoneme[];
  quizScore: number;
  quizSelected: string | null;
  quizFeedback: "correct" | "wrong" | null;
  onAnswer: (option: IpaPhoneme) => void;
  onNext: () => void;
}

/** Listen to a sound and pick its symbol. */
export default function IpaQuiz({
  quizQuestion,
  quizOptions,
  quizScore,
  quizSelected,
  quizFeedback,
  onAnswer,
  onNext,
}: IpaQuizProps) {
  return (
    <div
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "20px",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "24px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", fontWeight: 700 }}>
        <Award size={20} />
        <span>Điểm tích lũy: {quizScore} điểm</span>
      </div>

      <div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 8px 0", color: "var(--color-text-primary)" }}>
          Hãy lắng nghe và chọn ký hiệu âm IPA tương ứng
        </h3>
        <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Bấm nút loa để nghe lại âm thanh nhiều lần
        </p>
      </div>

      {/* Big Play Button */}
      <button
        type="button"
        onClick={() => ipaAudio.playPhoneme(quizQuestion)}
            aria-label="Nghe lại âm cần đoán"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-text-inverse)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 24px var(--color-primary-ring)",
          transition: "transform 0.15s ease",
        }}
      >
        <Volume2 size={36} />
      </button>

      {/* Options */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(140px, 200px))",
          gap: "16px",
          width: "100%",
          maxWidth: "460px",
        }}
      >
        {quizOptions.map((opt) => {
          const isPicked = quizSelected === opt.id;
          const isTarget = opt.id === quizQuestion.id;

          let btnBorder = "1px solid var(--color-border)";
          let btnBg = "var(--color-bg-alt)";
          let btnColor = "var(--color-text-primary)";

          if (quizSelected) {
            if (isTarget) {
              btnBorder = "2px solid var(--color-success)";
              btnBg = "var(--color-success-light)";
              btnColor = "var(--color-success)";
            } else if (isPicked) {
              btnBorder = "2px solid var(--color-danger)";
              btnBg = "var(--color-danger-light)";
              btnColor = "var(--color-danger)";
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onAnswer(opt)}
              disabled={!!quizSelected}
              style={{
                padding: "20px 16px",
                borderRadius: "14px",
                border: btnBorder,
                background: btnBg,
                color: btnColor,
                cursor: quizSelected ? "default" : "pointer",
                fontSize: "1.75rem",
                fontWeight: 800,
                fontFamily: "serif",
                transition: "all 0.15s ease",
              }}
            >
              /{opt.symbol}/
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {quizFeedback && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: quizFeedback === "correct" ? "var(--color-success)" : "var(--color-danger)",
            }}
          >
            {quizFeedback === "correct"
              ? "Chính xác! Bạn nhận được +10 điểm"
              : `Chưa đúng rồi! Âm chính xác là /${quizQuestion.symbol}/ (${quizQuestion.name})`}
          </div>

          <button
            type="button"
            onClick={onNext}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Câu hỏi tiếp theo &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
