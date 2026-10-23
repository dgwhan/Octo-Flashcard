"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./landing.module.css";

export default function LandingCTA() {
  return (
    <div className={styles.ctaBanner}>
      <h2 className={styles.ctaTitle}>Bắt đầu làm chủ tiếng Anh ngay hôm nay</h2>
      <p className={styles.ctaSubtitle}>
        Trải nghiệm toàn bộ hệ sinh thái học tập: Flashcard 3D, VOA Special English, Sách nói LibriVox, Tatoeba câu người thật và Bảng âm IPA hoàn toàn miễn phí.
      </p>

      <Link href={ROUTES.FLASHCARDS} className={styles.ctaWhiteBtn}>
        <Layers size={20} />
        <span>Vào Console Học Tập Ngay</span>
        <ArrowRight size={18} />
      </Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: "0.85rem",
          opacity: 0.9,
          marginTop: "12px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <CheckCircle2 size={16} /> Hoàn toàn miễn phí
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <CheckCircle2 size={16} /> 100% Học liệu mở chính thống
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <CheckCircle2 size={16} /> Tương thích đa thiết bị (Mobile & Desktop)
        </span>
      </div>
    </div>
  );
}
