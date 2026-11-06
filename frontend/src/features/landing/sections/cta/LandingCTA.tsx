"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./LandingCTA.module.css";

export default function LandingCTA() {
  return (
    <section className={styles.ctaSection} aria-label="Bắt đầu học ngay">
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>Bắt đầu làm chủ tiếng Anh ngay hôm nay</h2>
        <p className={styles.ctaSubtitle}>
          Trải nghiệm toàn bộ hệ sinh thái học tập: Flashcard 3D, VOA Special English, Sách nói LibriVox, Tatoeba câu người thật và Bảng âm IPA hoàn toàn miễn phí.
        </p>

        <Link href={ROUTES.FLASHCARDS} className={styles.primaryBtn}>
          <span>Học Thử Miễn Phí</span>
        </Link>

        <div className={styles.ctaFeaturesList}>
          <span className={styles.ctaFeatureItem}>
            <CheckCircle2 size={16} className={styles.checkIcon} /> Hoàn toàn miễn phí
          </span>
          <span className={styles.ctaFeatureItem}>
            <CheckCircle2 size={16} className={styles.checkIcon} /> 100% Học liệu mở chính thống
          </span>
          <span className={styles.ctaFeatureItem}>
            <CheckCircle2 size={16} className={styles.checkIcon} /> Tương thích đa thiết bị
          </span>
        </div>
      </div>
    </section>
  );
}
