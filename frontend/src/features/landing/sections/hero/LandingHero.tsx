"use client";

import React from "react";
import Link from "next/link";
import { ROUTES } from "@/src/config/routes";
import LandingHeroCard from "./components/LandingHeroCard";
import LandingHeroMetrics from "./components/LandingHeroMetrics";
import styles from "./LandingHero.module.css";

export default function LandingHero() {
  return (
    <section className={styles.heroSection}>
      {/* Main Two-Column Split Grid */}
      <div className={styles.splitGrid}>
        {/* Left Column: Product Introduction, CTA & Compact Metrics */}
        <div className={styles.contentCol}>
          <h1 className={styles.heroTitle}>
            Chinh Phục Tiếng Anh Toàn Diện Với{" "}
            <span className={styles.highlightText}>Học Liệu Mở & Flashcard 3D</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Kết hợp phương pháp khoa học não bộ cùng hàng chục nghìn bài học đọc - nghe chính thức từ{" "}
            <strong>VOA Learning English, Tatoeba Project, LibriVox & Project Gutenberg</strong>. Hoàn
            toàn minh bạch, phát âm tự nhiên người thật.
          </p>

          <div className={styles.ctaGroup}>
            <Link href={ROUTES.FLASHCARDS} className={styles.primaryBtn}>
              <span>Học Thử Miễn Phí</span>
            </Link>
            <a href="#features" className={styles.secondaryBtn}>
              <span>Khám Phá Tính Năng</span>
            </a>
          </div>
        </div>

        {/* Right Column: Floating 3D Vocabulary Card Stack */}
        <div className={styles.visualCol}>
          <LandingHeroCard />
        </div>
      </div>

      {/* Full-width horizontal metrics bar positioned directly below the hero grid */}
      <LandingHeroMetrics />
    </section>
  );
}
