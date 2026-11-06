"use client";

import React from "react";
import { BookOpen, RotateCw, Calendar, CheckCircle2 } from "lucide-react";
import styles from "./LandingMethodology.module.css";

interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
}

export default function LandingMethodology() {
  const steps: StepItem[] = [
    {
      number: "01",
      title: "Learn",
      subtitle: "Học từ mới",
      desc: "Tiếp nhận từ vựng cùng ngữ cảnh tự nhiên và phát âm bản xứ.",
      icon: <BookOpen size={26} strokeWidth={2.2} />,
    },
    {
      number: "02",
      title: "Recall",
      subtitle: "Chủ động ghi nhớ",
      desc: "Kích hoạt nơ-ron não bộ qua phản xạ truy hồi thông tin trước khi lật thẻ.",
      icon: <RotateCw size={26} strokeWidth={2.2} />,
    },
    {
      number: "03",
      title: "Review",
      subtitle: "Ôn tập đúng thời điểm",
      desc: "Thuật toán tính toán chu kỳ lặp lại ngắt quãng ngay khi não chuẩn bị quên.",
      icon: <Calendar size={26} strokeWidth={2.2} />,
    },
    {
      number: "04",
      title: "Master",
      subtitle: "Ghi nhớ lâu dài",
      desc: "Khắc sâu kiến thức vào trí nhớ dài hạn, tạo phản xạ ngôn ngữ bền vững.",
      icon: <CheckCircle2 size={26} strokeWidth={2.2} />,
    },
  ];

  return (
    <section id="methodology" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Tích hợp Spaced Repetition</h2>
        <p className={styles.sectionSubtitle}>
          Phương pháp tiếp thu ngôn ngữ tối ưu, tối giản quy trình lấy Spaced Repetition (Lặp lại ngắt quãng) làm trung tâm với 04 giai đoạn khoa học.
        </p>
      </div>

      <div className={styles.methodologyGrid}>
        {steps.map((step) => (
          <div key={step.number} className={styles.methodCard}>
            <span className={styles.stepBadge}>{step.number}</span>
            <div className={styles.cardHeaderContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepSubtitle}>{step.subtitle}</p>
            </div>
            <div className={styles.iconWrapper}>{step.icon}</div>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
