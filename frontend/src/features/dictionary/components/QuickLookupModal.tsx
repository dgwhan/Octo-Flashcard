"use client";

import React from "react";
import { X, BookA } from "lucide-react";
import DictionaryView from "./DictionaryView";

interface QuickLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  word?: string;
}

export default function QuickLookupModal({
  isOpen,
  onClose,
  word = "",
}: QuickLookupModalProps) {
  if (!isOpen) return null;

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
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
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
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(16, 185, 129, 0.12)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookA size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                Tra từ điển nhanh
              </h3>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                Tìm kiếm định nghĩa, phát âm IPA & ví dụ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: "20px",
            overflowY: "auto",
            maxHeight: "calc(88vh - 80px)",
          }}
        >
          <DictionaryView initialWord={word} isCompact />
        </div>
      </div>
    </div>
  );
}
