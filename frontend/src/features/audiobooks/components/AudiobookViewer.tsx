"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  ChevronLeft,
  Book,
  Search,
  ExternalLink,
  AlertCircle,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { Audiobook } from "../audiobook.types";
import { ROUTES } from "@/src/config/routes";
import { QuickLookupModal } from "@/src/features/dictionary";

interface AudiobookViewerProps {
  book: Audiobook;
}

export default function AudiobookViewer({ book }: AudiobookViewerProps) {
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const chapter = book.chapters[currentChapterIdx] || book.chapters[0];

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(chapter?.durationSeconds || 600);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Quick Dictionary Lookup Modal State
  const [lookupWord, setLookupWord] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // When chapter changes, reset playback
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
    setDuration(chapter?.durationSeconds || 600);
  }, [currentChapterIdx, chapter?.audioUrl, chapter?.durationSeconds]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioError(null);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("[Audiobook] Play failed:", err);
          setIsPlaying(false);
          setAudioError("Không thể phát trực tiếp tệp âm thanh từ kho lưu trữ. Vui lòng bấm thử lại hoặc kiểm tra kết nối mạng.");
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
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

  const skipSeconds = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const formatTime = (secs: number) => {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      <audio
        ref={audioRef}
        src={chapter?.audioUrl}
        onLoadedMetadata={(e) => {
          if (e.currentTarget.duration && !isNaN(e.currentTarget.duration)) {
            setDuration(e.currentTarget.duration);
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setAudioError("Tệp âm thanh trên Internet Archive tạm thời không thể phát trực tiếp.");
        }}
        preload="auto"
      />

      {/* Back button */}
      <div>
        <Link
          href={ROUTES.AUDIOBOOKS}
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
          <span>Quay lại kho sách nói LibriVox</span>
        </Link>
      </div>

      {/* Player & Book Header */}
      <div
        style={{
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "18px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "3px 8px",
                borderRadius: "6px",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                color: "var(--color-primary)",
                fontSize: "0.775rem",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              LibriVox Public Domain • {book.genre}
            </span>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0, color: "var(--color-text-primary)" }}>
              {book.title}
            </h1>
            <div style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", marginTop: "4px" }}>
              Tác giả: <b>{book.author}</b> ({book.year})
            </div>
          </div>

          {book.librivoxId && (
            <a
              href={`https://librivox.org/search?q=${encodeURIComponent(book.title)}&search_form=advanced`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.775rem",
                color: "var(--color-text-secondary)",
                textDecoration: "none",
              }}
            >
              <span>Xem trên LibriVox</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Audio Player Controls */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "14px",
            background: "var(--color-bg-alt)",
            border: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {audioError && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#ef4444",
                fontSize: "0.85rem",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                padding: "8px 12px",
                borderRadius: "8px",
              }}
            >
              <AlertCircle size={16} />
              <span>{audioError}</span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  color: "#ffffff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                }}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: "2px" }} />}
              </button>

              {/* Rewind 15s */}
              <button
                type="button"
                onClick={() => skipSeconds(-15)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
                title="Tua lùi 15s"
              >
                <SkipBack size={14} /> -15s
              </button>

              {/* Forward 15s */}
              <button
                type="button"
                onClick={() => skipSeconds(15)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
                title="Tua tới 15s"
              >
                +15s <SkipForward size={14} />
              </button>

              {/* Reset */}
              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    setCurrentTime(0);
                  }
                }}
                style={{ background: "transparent", border: "none", color: "var(--color-text-secondary)", cursor: "pointer", padding: "4px" }}
                title="Nghe lại từ đầu"
              >
                <RotateCcw size={18} />
              </button>

              {/* Time indicator */}
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "monospace" }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Speed pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>Tốc độ:</span>
              {[0.75, 1.0, 1.25, 1.5].map((spd) => {
                const isSelected = playbackRate === spd;
                return (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => changeSpeed(spd)}
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
                    {spd}x
                  </button>
                );
              })}
            </div>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            style={{ width: "100%", accentColor: "var(--color-primary)", cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Chapter Selection (if multiple chapters) */}
      {book.chapters.length > 1 && (
        <div
          style={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "14px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
            Danh sách chương ({book.chapters.length} phần):
          </div>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
            {book.chapters.map((ch, idx) => {
              const isCurrent = idx === currentChapterIdx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setCurrentChapterIdx(idx)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: isCurrent ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    backgroundColor: isCurrent ? "rgba(16, 185, 129, 0.12)" : "var(--color-bg-alt)",
                    color: isCurrent ? "var(--color-primary)" : "var(--color-text-secondary)",
                    fontWeight: isCurrent ? 700 : 500,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Phần {idx + 1}: {ch.title.slice(0, 24)}... ({ch.duration})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reading Text Container */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Dictionary lookup hint */}
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            background: "rgba(59, 130, 246, 0.08)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            color: "#3b82f6",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Search size={16} />
          <span>Nhấp chuột vào bất kỳ từ vựng nào trong tác phẩm để tra từ điển tức thì!</span>
        </div>

        {/* Text paragraph display */}
        <div
          style={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "16px",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            fontSize: "1.1rem",
            lineHeight: 1.85,
            color: "var(--color-text-primary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            <Book size={20} style={{ color: "var(--color-primary)" }} />
            <span style={{ fontWeight: 700, fontSize: "1.15rem" }}>
              {chapter?.title || "Văn bản tác phẩm"}
            </span>
          </div>

          {(chapter?.paragraphs || []).map((paragraph, pIdx) => {
            const words = paragraph.split(" ");
            return (
              <p key={pIdx} style={{ margin: 0 }}>
                {words.map((word, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={() => handleWordClick(word)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "3px",
                      padding: "1px 2px",
                      transition: "background-color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      </div>

      {/* Quick Lookup Modal */}
      <QuickLookupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        word={lookupWord}
      />
    </div>
  );
}
