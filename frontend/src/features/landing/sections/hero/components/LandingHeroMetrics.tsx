"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./LandingHeroMetrics.module.css";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  shouldStart: boolean;
}

function SmoothCountUp({
  target,
  duration = 1400,
  suffix = "+",
  shouldStart,
}: AnimatedCounterProps) {
  const [displayNumber, setDisplayNumber] = useState<string>("0");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayNumber(target.toLocaleString("vi-VN"));
      return;
    }

    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrameId: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      setDisplayNumber(current.toLocaleString("vi-VN"));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayNumber(target.toLocaleString("vi-VN"));
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [shouldStart, target, duration]);

  return (
    <span className={styles.metricValue}>
      {displayNumber}
      {suffix && <span className={styles.metricSuffix}>{suffix}</span>}
    </span>
  );
}

export default function LandingHeroMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.flatMetricsSection}
      aria-label="Thống kê nguồn học liệu mở chính thống"
    >
      {/* Row 1 - Item 1: 44 Âm IPA Chuẩn */}
      <div
        className={styles.metricItem}
        title="Đầy đủ 44 nguyên âm & phụ âm chuẩn Anh - Mỹ kèm khẩu hình & âm thanh"
      >
        <div className={styles.metricValueRow}>
          <span className={styles.metricValue}>44</span>
        </div>
        <div className={styles.metricLabel}>Âm IPA Chuẩn</div>
        <div className={styles.metricDesc}>Khẩu hình & audio</div>
      </div>

      {/* Row 1 - Item 2: 10.000+ Sách Nói & Bài Học */}
      <div
        className={styles.metricItem}
        title="Kinh điển từ VOA Special English, LibriVox & Project Gutenberg"
      >
        <div className={styles.metricValueRow}>
          <SmoothCountUp
            target={10000}
            shouldStart={isVisible}
            suffix="+"
          />
        </div>
        <div className={styles.metricLabel}>Sách Nói & Bài Học</div>
        <div className={styles.metricDesc}>VOA & LibriVox</div>
      </div>

      {/* Row 2 - Item 3: 50.000+ Câu Song Ngữ */}
      <div
        className={styles.metricItem}
        title="Dự án mở Tatoeba phát âm người thật bản xứ, đối chiếu Anh - Việt"
      >
        <div className={styles.metricValueRow}>
          <SmoothCountUp
            target={50000}
            shouldStart={isVisible}
            suffix="+"
          />
        </div>
        <div className={styles.metricLabel}>Câu Song Ngữ</div>
        <div className={styles.metricDesc}>Tatoeba người thật</div>
      </div>

      {/* Row 2 - Item 4: A1 – C2 Lộ Trình Chuẩn */}
      <div
        className={styles.metricItem}
        title="Phân cấp CEFR 6 mức độ kết hợp Oxford 3000, NGSL & Academic Word List"
      >
        <div className={styles.metricValueRow}>
          <span className={styles.metricValue}>A1 – C2</span>
        </div>
        <div className={styles.metricLabel}>Lộ Trình Chuẩn</div>
        <div className={styles.metricDesc}>Khung CEFR & NGSL</div>
      </div>
    </div>
  );
}
