"use client";

import React, { useState } from "react";
import { Volume2, Info, Check, Headphones, Award, X, Sparkles, HelpCircle } from "lucide-react";
import { IPA_PHONEMES } from "../ipa.data";
import { IpaPhoneme, PhonemeCategory } from "../ipa.types";
import { ipaAudio } from "../ipa.audio";

export default function IpaChart() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhoneme, setSelectedPhoneme] = useState<IpaPhoneme | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<IpaPhoneme | null>(null);
  const [quizOptions, setQuizOptions] = useState<IpaPhoneme[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "wrong" | null>(null);

  const startQuiz = () => {
    setIsQuizMode(true);
    setQuizScore(0);
    nextQuizQuestion();
  };

  const nextQuizQuestion = () => {
    setQuizSelected(null);
    setQuizFeedback(null);
    const target = IPA_PHONEMES[Math.floor(Math.random() * IPA_PHONEMES.length)];
    const others = IPA_PHONEMES.filter((p) => p.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [target, ...others].sort(() => 0.5 - Math.random());
    setQuizQuestion(target);
    setQuizOptions(options);

    // Auto play audio for test
    setTimeout(() => {
      ipaAudio.playPhoneme(target);
    }, 200);
  };

  const handleQuizAnswer = (option: IpaPhoneme) => {
    if (quizSelected || !quizQuestion) return;
    setQuizSelected(option.id);

    if (option.id === quizQuestion.id) {
      setQuizFeedback("correct");
      setQuizScore((prev) => prev + 10);
    } else {
      setQuizFeedback("wrong");
    }
  };

  const playSound = (phoneme: IpaPhoneme, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingId(phoneme.id);
    ipaAudio.playPhoneme(phoneme, () => {
      setPlayingId(null);
    });
  };

  const playWord = (word: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    ipaAudio.speakWord(word);
  };

  const filteredPhonemes = IPA_PHONEMES.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "monophthongs") {
      return item.category === "monophthong_long" || item.category === "monophthong_short";
    }
    if (activeCategory === "diphthongs") {
      return item.category === "diphthong";
    }
    if (activeCategory === "unvoiced") {
      return item.category === "consonant_unvoiced";
    }
    if (activeCategory === "voiced") {
      return item.category === "consonant_voiced";
    }
    return true;
  });

  const getCategoryBadge = (category: PhonemeCategory) => {
    switch (category) {
      case "monophthong_long":
        return { label: "Nguyên âm dài", color: "#10b981", bg: "rgba(16, 185, 129, 0.12)" };
      case "monophthong_short":
        return { label: "Nguyên âm ngắn", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.12)" };
      case "diphthong":
        return { label: "Nguyên âm đôi", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.12)" };
      case "consonant_unvoiced":
        return { label: "Vô thanh (bật hơi)", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)" };
      case "consonant_voiced":
        return { label: "Hữu thanh (rung giọng)", color: "#ec4899", bg: "rgba(236, 72, 153, 0.12)" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Top Banner & Control Bar */}
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
                  setActiveCategory(cat.id);
                  setIsQuizMode(false);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  backgroundColor: isActive ? "var(--color-primary)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--color-text-primary)",
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
            if (isQuizMode) {
              setIsQuizMode(false);
            } else {
              startQuiz();
            }
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "10px",
            border: isQuizMode ? "1px solid #f59e0b" : "1px solid rgba(16, 185, 129, 0.3)",
            backgroundColor: isQuizMode ? "#f59e0b" : "rgba(16, 185, 129, 0.12)",
            color: isQuizMode ? "#ffffff" : "var(--color-primary)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          <Headphones size={18} />
          <span>{isQuizMode ? "Quay lại bảng IPA" : "Luyện tai nghe phản xạ âm"}</span>
        </button>
      </div>

      {/* QUIZ MODE UI */}
      {isQuizMode && quizQuestion && (
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
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)",
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
                  btnBorder = "2px solid #10b981";
                  btnBg = "rgba(16, 185, 129, 0.15)";
                  btnColor = "#10b981";
                } else if (isPicked) {
                  btnBorder = "2px solid #ef4444";
                  btnBg = "rgba(239, 68, 68, 0.15)";
                  btnColor = "#ef4444";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleQuizAnswer(opt)}
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
                  color: quizFeedback === "correct" ? "#10b981" : "#ef4444",
                }}
              >
                {quizFeedback === "correct"
                  ? "Chính xác! Bạn nhận được +10 điểm"
                  : `Chưa đúng rồi! Âm chính xác là /${quizQuestion.symbol}/ (${quizQuestion.name})`}
              </div>

              <button
                type="button"
                onClick={nextQuizQuestion}
                style={{
                  padding: "10px 24px",
                  borderRadius: "10px",
                  backgroundColor: "var(--color-primary)",
                  color: "#ffffff",
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
      )}

      {/* IPA TILES GRID */}
      {!isQuizMode && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredPhonemes.map((item) => {
            const badge = getCategoryBadge(item.category);
            const isPlaying = playingId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoneme(item)}
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
                  boxShadow: isPlaying ? "0 8px 20px rgba(16, 185, 129, 0.2)" : "0 2px 6px rgba(0, 0, 0, 0.03)",
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
                    onClick={(e) => playSound(item, e)}
                    title="Nghe phát âm chuẩn"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: isPlaying ? "var(--color-primary)" : "rgba(16, 185, 129, 0.12)",
                      color: isPlaying ? "#ffffff" : "var(--color-primary)",
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
                    <div
                      key={exIdx}
                      onClick={(e) => playWord(ex.word, e)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.875rem",
                        color: "var(--color-text-primary)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        backgroundColor: "var(--color-bg-alt)",
                      }}
                      title="Bấm để nghe từ này"
                    >
                      <span>
                        <b>{ex.word}</b> <span style={{ color: "var(--color-text-secondary)", fontSize: "0.8rem" }}>{ex.ipa}</span>
                      </span>
                      <Volume2 size={14} style={{ color: "var(--color-text-secondary)" }} />
                    </div>
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
      )}

      {/* DETAIL MODAL */}
      {selectedPhoneme && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setSelectedPhoneme(null)}
        >
          <div
            style={{
              backgroundColor: "var(--color-bg-card)",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "580px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              border: "1px solid var(--color-border)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: 800,
                    fontFamily: "serif",
                    color: "var(--color-primary)",
                  }}
                >
                  /{selectedPhoneme.symbol}/
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    {selectedPhoneme.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: getCategoryBadge(selectedPhoneme.category).color,
                    }}
                  >
                    {getCategoryBadge(selectedPhoneme.category).label}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhoneme(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  padding: "6px",
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Audio Listen action */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                  Phát âm mẫu âm /{selectedPhoneme.symbol}/
                </div>
                <button
                  type="button"
                  onClick={() => playSound(selectedPhoneme)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "var(--color-primary)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  <Volume2 size={18} />
                  <span>Nghe ngay</span>
                </button>
              </div>

              {/* Pronunciation Instructions */}
              <div>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                  Hướng dẫn phát âm & Khẩu hình miệng:
                </h4>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.925rem", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                  {selectedPhoneme.vietnameseGuide}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: "var(--color-bg-alt)",
                    fontSize: "0.85rem",
                    color: "var(--color-text-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Sparkles size={16} style={{ color: "var(--color-primary)" }} />
                  <span>Khẩu hình: <b>{selectedPhoneme.mouthShape}</b></span>
                </div>
              </div>

              {/* Example Words */}
              <div>
                <h4 style={{ margin: "0 0 10px 0", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                  Từ vựng ví dụ thực tế:
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedPhoneme.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "var(--color-bg-alt)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                          {ex.word}
                        </span>
                        <span style={{ marginLeft: "10px", fontFamily: "monospace", color: "var(--color-primary)" }}>
                          {ex.ipa}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => playWord(ex.word)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--color-primary)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                        }}
                      >
                        <Volume2 size={16} />
                        <span>Nghe từ</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
