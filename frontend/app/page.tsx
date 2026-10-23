"use client";

import React from "react";
import Link from "next/link";
import { Layers, PlusCircle, Sparkles } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "680px" }}>
        <h1 className={styles.title}>Khám phá Octo Flashcard</h1>
        <p className={styles.description}>
          Nền tảng học từ vựng và kiến thức thông minh bằng phương pháp lật thẻ Flashcard 2 mặt. Rèn luyện phản xạ, phát âm audio chuẩn và theo dõi tiến độ ghi nhớ cá nhân của bạn.
        </p>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
          <Link
            href={ROUTES.FLASHCARDS}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "10px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
            }}
          >
            <Layers size={18} />
            <span>Bắt đầu học Flashcard</span>
          </Link>

          <Link
            href={ROUTES.FLASHCARDS_CREATE}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              borderRadius: "10px",
              backgroundColor: "var(--color-bg-card)",
              color: "var(--color-text-primary)",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid var(--color-border)",
            }}
          >
            <PlusCircle size={18} />
            <span>Tạo bộ thẻ mới</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
