"use client";

import React from "react";
import { Brain, Clock, Ear, Lightbulb, Compass, Award } from "lucide-react";
import styles from "./landing.module.css";

export default function LandingMethodology() {
  const steps = [
    {
      step: "Nguyên lý 01",
      title: "Active Recall (Truy hồi chủ động)",
      desc: "Thay vì đọc lại tài liệu một cách thụ động, cơ chế lật thẻ 2 mặt 3D bắt não bộ phải chủ động kích hoạt nơ-ron để tái hiện thông tin, củng cố liên kết trí nhớ bền vững gấp 3 lần.",
      icon: <Brain size={24} style={{ color: "var(--color-primary)" }} />,
    },
    {
      step: "Nguyên lý 02",
      title: "Spaced Repetition (Lặp lại ngắt quãng)",
      desc: "Chống lại 'đường cong lãng quên Ebbinghaus'. Thẻ được phân loại thông minh giữa 'Đã thuộc' và 'Cần ôn', tự động xuất hiện lại đúng vào thời điểm não bộ chuẩn bị quên.",
      icon: <Clock size={24} style={{ color: "#3b82f6" }} />,
    },
    {
      step: "Nguyên lý 03",
      title: "Comprehensible Input (Đầu vào dễ hiểu)",
      desc: "Ứng dụng giả thuyết nổi tiếng của GS. Stephen Krashen: Nghe các mẩu chuyện thực tế từ VOA & LibriVox ở tốc độ 2/3 với phát âm chuẩn giúp hấp thu ngôn ngữ tự nhiên không áp lực.",
      icon: <Ear size={24} style={{ color: "#f59e0b" }} />,
    },
  ];

  return (
    <section id="methodology" className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>Cơ sở khoa học não bộ</div>
        <h2 className={styles.sectionTitle}>Phương pháp tiếp thu ngôn ngữ tối ưu</h2>
        <p className={styles.sectionSubtitle}>
          Mỗi tính năng trên Octo Flashcard đều được thiết kế dựa trên các nguyên lý thần kinh học và phương pháp sư phạm hiện đại.
        </p>
      </div>

      <div className={styles.methodologyGrid}>
        {steps.map((s, idx) => (
          <div key={idx} className={styles.methodCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className={styles.methodStep}>{s.step}</span>
              {s.icon}
            </div>
            <h3 className={styles.methodTitle}>{s.title}</h3>
            <p className={styles.methodDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
