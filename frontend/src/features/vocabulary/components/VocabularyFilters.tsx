"use client";

import React from "react";
import { Search, Globe } from "lucide-react";
import type { CEFRLevel, VocabularyItem } from "../types";
import { getLevelBadge } from "../lib/levelBadge";

interface VocabularyFiltersProps {
  words: VocabularyItem[];
  source: "api" | "curated";
  selectedLevel: string;
  selectedFramework: string;
  selectedTopic: string;
  searchQuery: string;
  topics: { label: string; value: string }[];
  onLevel: (level: string) => void;
  onFramework: (framework: string) => void;
  onSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onTopic: (topic: string) => void;
}

/** CEFR level tabs, search + framework filter, and topic chips. */
export default function VocabularyFilters({
  words,
  source,
  selectedLevel,
  selectedFramework,
  selectedTopic,
  searchQuery,
  topics,
  onLevel,
  onFramework,
  onSearchQuery,
  onSearchSubmit,
  onTopic,
}: VocabularyFiltersProps) {
  return (
    <>
      {/* CEFR Level Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "10px",
        }}
      >
        <button
          type="button"
          onClick={() => onLevel("all")}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: selectedLevel === "all" ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
            backgroundColor: selectedLevel === "all" ? "var(--color-primary-light)" : "var(--color-bg-card)",
            color: selectedLevel === "all" ? "var(--color-primary)" : "var(--color-text-primary)",
            fontWeight: 700,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "1.1rem" }}>Tất cả</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "2px" }}>
            A1 - C2 ({words.length})
          </div>
        </button>

        {(["A1", "A2", "B1", "B2", "C1", "C2"] as CEFRLevel[]).map((lvl) => {
          const isActive = selectedLevel === lvl;
          const count = words.filter((v) => v.level === lvl).length;
          const badge = getLevelBadge(lvl);

          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onLevel(lvl)}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: isActive ? `2px solid ${badge.color}` : "1px solid var(--color-border)",
                backgroundColor: isActive ? badge.bg : "var(--color-bg-card)",
                color: isActive ? badge.color : "var(--color-text-primary)",
                fontWeight: 700,
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{lvl}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.85, marginTop: "2px" }}>{count} từ vựng</div>
            </button>
          );
        })}
      </div>

      {/* Filter Toolbar & Framework Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px",
          padding: "14px 18px",
        }}
      >
        <form
          onSubmit={onSearchSubmit}
          style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 260px" }}
        >
          <Search size={18} style={{ color: "var(--color-text-secondary)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQuery(e.target.value)}
            aria-label="Tra cứu từ vựng mở rộng"
            placeholder="Tra cứu từ vựng mở rộng (vd: technology, resilient, manage)... Nhấn Enter"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "0.95rem",
              color: "var(--color-text-primary)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text-inverse)",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            Tra cứu
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Framework buttons */}
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { id: "all", label: "Tất cả chuẩn" },
              { id: "CEFR", label: "CEFR-J" },
              { id: "NGSL", label: "NGSL" },
              { id: "AWL", label: "AWL" },
            ].map((fw) => {
              const isActive = selectedFramework === fw.id;
              return (
                <button
                  key={fw.id}
                  type="button"
                  onClick={() => onFramework(fw.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                    backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
                    color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {fw.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.8rem",
              padding: "4px 10px",
              borderRadius: "20px",
              backgroundColor:
                source === "api" ? "var(--color-primary-light)" : "var(--color-info-light)",
              color: source === "api" ? "var(--color-primary)" : "var(--color-info)",
              fontWeight: 600,
            }}
          >
            <Globe size={14} />
            {source === "api" ? "Datamuse API Live" : "Kho chuẩn hóa"}
          </div>
        </div>
      </div>

      {/* Topic Chips */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginRight: "4px" }}>
          Chủ đề từ điển mở:
        </span>
        {topics.map((top) => {
          const isActive = selectedTopic === top.value;
          return (
            <button
              key={top.value}
              type="button"
              onClick={() => onTopic(top.value)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? "var(--color-primary)" : "var(--color-bg-card)",
                color: isActive ? "var(--color-text-inverse)" : "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {top.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
