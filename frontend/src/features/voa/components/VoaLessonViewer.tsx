"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  BookOpen,
  Award,
  ChevronLeft,
  Sparkles,
  Search,
  CheckCircle2,
  PlusCircle,
  AlertCircle,
} from "lucide-react";
import { VoaLesson } from "../voa.types";
import { ROUTES } from "@/src/config/routes";
import { QuickLookupModal } from "@/src/features/dictionary";

interface VoaLessonViewerProps {
  lesson: VoaLesson;
}

export default function VoaLessonViewer({ lesson }: VoaLessonViewerProps) {
  const [activeTab, setActiveTab] = useState<"reading" | "vocabulary" | "quiz">("reading");

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(lesson.audioDurationSeconds || 600);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Quick Dictionary Lookup Modal State
  const [lookupWord, setLookupWord] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset player when switching lessons
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(null);
    setDuration(lesson.audioDurationSeconds || 600);
  }, [lesson.slug, lesson.audioUrl, lesson.audioDurationSeconds]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setLoadError(null);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio playback error:", err);
        setLoadError("Trình duyệt đang chờ tương tác người dùng để phát audio. Vui lòng nhấn Play lại.");
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      setCurrentTime(cur);

      const d = audioRef.current.duration;
      if (d && !isNaN(d) && d > 0 && Math.abs(duration - d) > 1) {
        setDuration(d);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const d = audioRef.current.duration;
      if (d && !isNaN(d) && d > 0) {
        setDuration(d);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleWordClick = (word: string) => {
    const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, "").trim();
    if (clean) {
      setLookupWord(clean);
      setIsModalOpen(true);
    }
  };

  const playVocabularyAudio = (word: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const handleQuizOption = (qId: string, optIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    lesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  // Estimate active paragraph based on playback ratio
  const activeParagraphIndex =
    duration > 0 && lesson.paragraphs.length > 0
      ? Math.min(
          lesson.paragraphs.length - 1,
          Math.floor((currentTime / duration) * lesson.paragraphs.length)
        )
      : -1;

  const seekToParagraph = (index: number) => {
    if (duration > 0 && lesson.paragraphs.length > 0 && audioRef.current) {
      const targetTime = (index / lesson.paragraphs.length) * duration;
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      {/* Real broadcast audio element */}
      <audio
        ref={audioRef}
        src={lesson.audioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => {
          setLoadError("Không thể tải file audio VOA từ máy chủ archive.org. Vui lòng kiểm tra kết nối mạng.");
        }}
      />

      {/* Back button */}
      <div>
        <Link
          href={ROUTES.VOA}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--color-primary)",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          <ChevronLeft size={18} />
          <span>Quay lại danh sách bài học VOA</span>
        </Link>
      </div>

      {/* Lesson Header Card */}
      <div
        style={{
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "18px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "8px",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              color: "var(--color-primary)",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            Level {lesson.levelNumber}: {lesson.level === "beginning" ? "Sơ cấp" : lesson.level === "intermediate" ? "Trung cấp" : "Nâng cao"}
          </span>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "8px",
              backgroundColor: "var(--color-bg-alt)",
              color: "var(--color-text-secondary)",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            {lesson.category}
          </span>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "8px",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              color: "#3b82f6",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            VOA Special English Authentic Broadcast
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            margin: 0,
            color: "var(--color-text-primary)",
            lineHeight: 1.35,
          }}
        >
          {lesson.title}
        </h1>

        <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          {lesson.summary}
        </p>

        {loadError && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              color: "#ef4444",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertCircle size={16} />
            <span>{loadError}</span>
          </div>
        )}

        {/* AUDIO PLAYER BAR */}
        <div
          style={{
            marginTop: "8px",
            padding: "18px 20px",
            borderRadius: "16px",
            background: "var(--color-bg-alt)",
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  color: "#ffffff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                  transition: "transform 0.15s ease",
                }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: "2px" }} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    setCurrentTime(0);
                  }
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  padding: "6px",
                }}
                title="Nghe lại từ đầu"
              >
                <RotateCcw size={18} />
              </button>

              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "monospace" }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Playback speed buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>Tốc độ:</span>
              {[0.75, 1.0, 1.25].map((speed) => {
                const isSelected = playbackRate === speed;
                return (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => changeSpeed(speed)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: isSelected ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                      backgroundColor: isSelected ? "var(--color-primary)" : "var(--color-bg-card)",
                      color: isSelected ? "#ffffff" : "var(--color-text-primary)",
                      fontSize: "0.775rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {speed}x
                  </button>
                );
              })}
            </div>
          </div>

          {/* Range Seek Slider with Smooth Progress */}
          <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 100}
              step={0.5}
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: "100%",
                height: "6px",
                accentColor: "var(--color-primary)",
                cursor: "pointer",
                borderRadius: "9999px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--color-border)", paddingBottom: "4px" }}>
        {[
          { id: "reading", label: "Bài đọc & Nghe theo giọng VOA", icon: BookOpen },
          { id: "vocabulary", label: `Từ vựng trọng tâm (${lesson.vocabulary.length})`, icon: Sparkles },
          { id: "quiz", label: `Kiểm tra hiểu bài (${lesson.quiz.length})`, icon: Award },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderBottom: isActive ? "3px solid var(--color-primary)" : "3px solid transparent",
                backgroundColor: "transparent",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: READING WITH CLICK-TO-LOOKUP */}
      {activeTab === "reading" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Quick interactive hint */}
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              background: "rgba(59, 130, 246, 0.08)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              color: "#3b82f6",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Search size={18} style={{ flexShrink: 0 }} />
              <span>
                <b>Khớp âm 100%:</b> Audio do phát thanh viên đài VOA đọc khớp từng chữ với kịch bản dưới đây. Bấm vào từ bất kỳ để tra từ điển tức thì!
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              fontSize: "1.1rem",
              lineHeight: 1.85,
              color: "var(--color-text-primary)",
            }}
          >
            {lesson.paragraphs.map((p, pIdx) => {
              const words = p.split(" ");
              const isCurrent = isPlaying && pIdx === activeParagraphIndex;

              return (
                <div
                  key={pIdx}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "10px",
                    backgroundColor: isCurrent ? "rgba(16, 185, 129, 0.08)" : "transparent",
                    borderLeft: isCurrent ? "4px solid var(--color-primary)" : "4px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    {words.map((w, wIdx) => (
                      <span
                        key={wIdx}
                        onClick={() => handleWordClick(w)}
                        style={{
                          cursor: "pointer",
                          borderRadius: "4px",
                          padding: "1px 2px",
                          transition: "background 0.12s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.2)";
                          e.currentTarget.style.color = "var(--color-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "inherit";
                        }}
                      >
                        {w}{" "}
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: KEY VOCABULARY */}
      {activeTab === "vocabulary" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                        color: "#6366f1",
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
                    onClick={() => playVocabularyAudio(vocab.word)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(16, 185, 129, 0.12)",
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

                  <Link
                    href={`${ROUTES.FLASHCARDS_CREATE}?word=${encodeURIComponent(
                      vocab.word
                    )}&definition=${encodeURIComponent(vocab.vietnameseMeaning)}&phonetic=${encodeURIComponent(
                      vocab.ipa
                    )}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(59, 130, 246, 0.1)",
                      color: "#3b82f6",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <PlusCircle size={16} />
                    <span>Lưu vào Flashcard</span>
                  </Link>
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
      )}

      {/* TAB 3: COMPREHENSION QUIZ */}
      {activeTab === "quiz" && (
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
          {lesson.quiz.map((q, qIdx) => {
            const picked = selectedAnswers[q.id];

            return (
              <div
                key={q.id}
                style={{
                  paddingBottom: "20px",
                  borderBottom: qIdx === lesson.quiz.length - 1 ? "none" : "1px solid var(--color-border)",
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

                    if (submittedQuiz) {
                      if (isCorrect) {
                        bg = "rgba(16, 185, 129, 0.15)";
                        border = "2px solid #10b981";
                      } else if (isSelected) {
                        bg = "rgba(239, 68, 68, 0.15)";
                        border = "2px solid #ef4444";
                      }
                    } else if (isSelected) {
                      bg = "rgba(16, 185, 129, 0.1)";
                      border = "2px solid var(--color-primary)";
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleQuizOption(q.id, optIdx)}
                        style={{
                          textAlign: "left",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          background: bg,
                          border: border,
                          color: "var(--color-text-primary)",
                          fontSize: "0.95rem",
                          fontWeight: isSelected ? 600 : 400,
                          cursor: submittedQuiz ? "default" : "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                      </button>
                    );
                  })}
                </div>

                {submittedQuiz && (
                  <div
                    style={{
                      marginTop: "6px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: "rgba(16, 185, 129, 0.08)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
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
            {submittedQuiz ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle2 size={24} style={{ color: "#10b981" }} />
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                  Kết quả: {calculateScore()} / {lesson.quiz.length} câu đúng!
                </span>
              </div>
            ) : (
              <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                Hãy chọn câu trả lời cho tất cả các câu hỏi trên
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (submittedQuiz) {
                  setSubmittedQuiz(false);
                  setSelectedAnswers({});
                } else {
                  setSubmittedQuiz(true);
                }
              }}
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 22px",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              {submittedQuiz ? "Làm lại bài kiểm tra" : "Nộp bài & Xem giải thích"}
            </button>
          </div>
        </div>
      )}

      {/* Quick Dictionary Lookup Modal */}
      <QuickLookupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        word={lookupWord}
      />
    </div>
  );
}
