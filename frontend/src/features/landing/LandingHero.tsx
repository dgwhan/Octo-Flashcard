"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  Volume2,
  Headphones,
  CheckCircle2,
  Play,
  RotateCw,
} from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./landing.module.css";

export default function LandingHero() {
  return (
    <section className={styles.heroSection}>
      {/* Top Tag */}
      <div className={styles.tagPill}>
        <Sparkles size={16} />
        <span>Active Recall & Spaced Repetition • Public Domain Learning Ecosystem</span>
      </div>

      {/* Main Title */}
      <h1 className={styles.heroTitle}>
        Chinh Phục Tiếng Anh Toàn Diện Với{" "}
        <span className={styles.heroGradient}>Học Liệu Mở</span> & Flashcard 3D
      </h1>

      {/* Subtitle */}
      <p className={styles.heroSubtitle}>
        Kết hợp phương pháp khoa học não bộ cùng hàng chục nghìn bài học đọc - nghe chính thức từ{" "}
        <b>VOA Learning English, Tatoeba Project, LibriVox & Project Gutenberg</b>. 
        Hoàn toàn minh bạch, phát âm tự nhiên người thật.
      </p>

      {/* Action Buttons */}
      <div className={styles.heroCtaGroup}>
        <Link href={ROUTES.FLASHCARDS} className={styles.primaryHeroBtn}>
          <Layers size={20} />
          <span>Vào Console Học Tập Ngay</span>
          <ArrowRight size={18} />
        </Link>

        <a href="#sources" className={styles.secondaryHeroBtn}>
          <BookOpen size={18} />
          <span>Khám Phá Học Liệu Mở</span>
        </a>
      </div>

      {/* Interactive 4-Col Stats Bar */}
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>44</div>
          <div className={styles.statLabel}>Âm IPA chuẩn quốc tế kèm khẩu hình & âm thanh</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>10.000+</div>
          <div className={styles.statLabel}>Sách nói kinh điển LibriVox & Project Gutenberg</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>50.000+</div>
          <div className={styles.statLabel}>Câu song ngữ Tatoeba phát âm người thật bản xứ</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>A1 – C2</div>
          <div className={styles.statLabel}>Khung chuẩn hóa CEFR, NGSL & Academic Word List</div>
        </div>
      </div>
    </section>
  );
}
