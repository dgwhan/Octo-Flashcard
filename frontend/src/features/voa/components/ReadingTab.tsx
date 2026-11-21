"use client";

import { Search } from "lucide-react";

interface ReadingTabProps {
  paragraphs: string[];
  /** Paragraph being read aloud right now, or -1 */
  activeIndex: number;
  onWordClick: (word: string) => void;
}

/** Transcript with the current paragraph highlighted; every word opens the dictionary. */
export default function ReadingTab({ paragraphs, activeIndex, onWordClick }: ReadingTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Quick interactive hint */}
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          background: "var(--color-info-light)",
          border: "1px solid var(--color-info-border)",
          color: "var(--color-info)",
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
        {paragraphs.map((p, pIdx) => {
          const words = p.split(" ");
          const isCurrent = pIdx === activeIndex;

          return (
            <div
              key={pIdx}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                backgroundColor: isCurrent ? "var(--color-primary-light)" : "transparent",
                borderLeft: isCurrent ? "4px solid var(--color-primary)" : "4px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <p style={{ margin: 0 }}>
                {words.map((w, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={() => onWordClick(w)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "4px",
                      padding: "1px 2px",
                      transition: "background 0.12s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--color-primary-ring)";
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
  );
}
