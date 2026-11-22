"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Award,
  ChevronLeft,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { VoaLesson } from "../types";
import { ROUTES } from "@/src/config/routes";
import { QuickLookupModal } from "@/src/features/dictionary";
import LessonAudioBar from "../components/LessonAudioBar";
import ReadingTab from "../components/ReadingTab";
import VocabularyTab from "../components/VocabularyTab";
import QuizTab from "../components/QuizTab";

interface VoaLessonViewerProps {
  lesson: VoaLesson;
}

export default function VoaLessonPage({ lesson }: VoaLessonViewerProps) {
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

  // Reset player state when switching lessons (adjusting state during render)...
  const lessonKey = `${lesson.slug}|${lesson.audioUrl}|${lesson.audioDurationSeconds}`;
  const [prevLessonKey, setPrevLessonKey] = useState(lessonKey);
  if (lessonKey !== prevLessonKey) {
    setPrevLessonKey(lessonKey);
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(null);
    setDuration(lesson.audioDurationSeconds || 600);
  }

  // ...and the <audio> element itself, which lives outside React state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [lessonKey]);

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

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const toggleQuizSubmit = () => {
    if (submittedQuiz) {
      setSubmittedQuiz(false);
      setSelectedAnswers({});
    } else {
      setSubmittedQuiz(true);
    }
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
              backgroundColor: "var(--color-primary-light)",
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
              backgroundColor: "var(--color-info-light)",
              color: "var(--color-info)",
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
              backgroundColor: "var(--color-danger-light)",
              border: "1px solid var(--color-danger-border)",
              color: "var(--color-danger)",
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
        <LessonAudioBar
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          playbackRate={playbackRate}
          onToggle={togglePlay}
          onRestart={restart}
          onSeek={handleSeek}
          onSpeed={changeSpeed}
        />
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
        <ReadingTab
          paragraphs={lesson.paragraphs}
          activeIndex={isPlaying ? activeParagraphIndex : -1}
          onWordClick={handleWordClick}
        />
      )}

      {/* TAB 2: KEY VOCABULARY */}
      {activeTab === "vocabulary" && (
        <VocabularyTab lesson={lesson} onPlayWord={playVocabularyAudio} />
      )}

      {/* TAB 3: COMPREHENSION QUIZ */}
      {activeTab === "quiz" && (
        <QuizTab
          quiz={lesson.quiz}
          selected={selectedAnswers}
          submitted={submittedQuiz}
          score={calculateScore()}
          onPick={handleQuizOption}
          onToggleSubmit={toggleQuizSubmit}
        />
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
