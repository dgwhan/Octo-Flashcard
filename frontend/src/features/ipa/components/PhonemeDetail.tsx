"use client";

import React from "react";
import { Volume2, X, Sparkles } from "lucide-react";
import type { IpaPhoneme } from "../types";
import { getCategoryBadge } from "../lib/categoryBadge";

interface PhonemeDetailProps {
  phoneme: IpaPhoneme;
  onClose: () => void;
  onPlaySound: (phoneme: IpaPhoneme, e?: React.MouseEvent) => void;
  onPlayWord: (word: string, e?: React.MouseEvent) => void;
}

/** Modal with how to make the sound, mouth shape and example words. */
export default function PhonemeDetail({ phoneme, onClose, onPlaySound, onPlayWord }: PhonemeDetailProps) {
  return (
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
      onClick={() => onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Chi tiết âm /${phoneme.symbol}/`}
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
              /{phoneme.symbol}/
            </span>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                {phoneme.name}
              </h3>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: getCategoryBadge(phoneme.category).color,
                }}
              >
                {getCategoryBadge(phoneme.category).label}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onClose()}
            aria-label="Đóng chi tiết âm"
            autoFocus // move focus into the dialog so Escape and Tab work from the start
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
              background: "var(--color-primary-light)",
              border: "1px solid var(--color-primary-ring)",
            }}
          >
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
              Phát âm mẫu âm /{phoneme.symbol}/
            </div>
            <button
              type="button"
              onClick={() => onPlaySound(phoneme)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-inverse)",
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
              {phoneme.vietnameseGuide}
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
              <span>Khẩu hình: <b>{phoneme.mouthShape}</b></span>
            </div>
          </div>

          {/* Example Words */}
          <div>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
              Từ vựng ví dụ thực tế:
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {phoneme.examples.map((ex, idx) => (
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
                    onClick={() => onPlayWord(ex.word)}
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
  );
}
