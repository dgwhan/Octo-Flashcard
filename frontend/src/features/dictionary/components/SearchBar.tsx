"use client";

import React from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onClear: () => void;
}

export default function SearchBar({ value, loading, onChange, onKeyDown, onSearch, onClear }: SearchBarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "14px",
        padding: "6px 12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Search size={20} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Từ cần tra"
        placeholder="Nhập từ tiếng Anh để tra nghĩa, phát âm..."
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: "1rem",
          background: "transparent",
          color: "var(--color-text-primary)",
          padding: "8px 0",
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onClear();
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--color-text-secondary)",
            cursor: "pointer",
            fontSize: "0.85rem",
            padding: "4px 8px",
          }}
        >
          Xóa
        </button>
      )}
      <button
        type="button"
        onClick={() => onSearch()}
        disabled={loading || !value.trim()}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-text-inverse)",
          border: "none",
          borderRadius: "10px",
          padding: "10px 18px",
          fontWeight: 600,
          fontSize: "0.9rem",
          cursor: loading || !value.trim() ? "not-allowed" : "pointer",
          opacity: loading || !value.trim() ? 0.7 : 1,
          transition: "all 0.15s ease",
        }}
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        <span>{loading ? "Đang tra..." : "Tra cứu"}</span>
      </button>
    </div>
  );
}
