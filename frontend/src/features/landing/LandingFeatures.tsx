"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Headphones,
  Volume2,
  MessageSquare,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Globe,
  Search,
} from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./landing.module.css";

export default function LandingFeatures() {
  const features = [
    {
      icon: <Layers size={26} />,
      bg: "rgba(16, 185, 129, 0.12)",
      color: "var(--color-primary)",
      title: "Flashcard 3D & Spaced Repetition",
      desc: "Lật thẻ không gian 3D trực quan, ứng dụng kỹ thuật Truy hồi Chủ động (Active Recall) và Lặp lại ngắt quãng để khắc sâu từ vựng vào trí nhớ dài hạn.",
      link: ROUTES.FLASHCARDS,
      linkText: "Vào Console Flashcard",
    },
    {
      icon: <Sparkles size={26} />,
      bg: "rgba(59, 130, 246, 0.12)",
      color: "#3b82f6",
      title: "VOA Learning English theo Level",
      desc: "Học đọc và nghe qua các phóng sự, tác phẩm kinh điển từ phát thanh viên VOA Special English. Âm thanh tốc độ chuẩn, transcript khớp 100%, highlight câu theo thời gian thực.",
      link: ROUTES.VOA,
      linkText: "Học VOA English",
    },
    {
      icon: <Volume2 size={26} />,
      bg: "rgba(245, 158, 11, 0.12)",
      color: "#f59e0b",
      title: "Bảng ngữ âm quốc tế IPA 44 âm",
      desc: "Nắm vững 12 nguyên âm đơn, 8 nguyên âm đôi và 24 phụ âm. Kèm bản ghi âm phát âm chuẩn, hướng dẫn khẩu hình răng - môi - lưỡi và bài tập kiểm tra phản xạ tai nghe.",
      link: ROUTES.IPA,
      linkText: "Luyện bảng âm IPA",
    },
    {
      icon: <Headphones size={26} />,
      bg: "rgba(139, 92, 246, 0.12)",
      color: "#8b5cf6",
      title: "Thư viện Sách nói LibriVox & Gutenberg",
      desc: "Stream trực tiếp hàng nghìn tác phẩm văn học bất hủ (Sherlock Holmes, Pride & Prejudice,...). Vừa nghe người bản ngữ đọc truyền cảm, vừa tra từ điển tức thì trên từng câu chữ.",
      link: ROUTES.AUDIOBOOKS,
      linkText: "Nghe sách nói LibriVox",
    },
    {
      icon: <MessageSquare size={26} />,
      bg: "rgba(236, 72, 153, 0.12)",
      color: "#ec4899",
      title: "Kho câu ví dụ người thật Tatoeba",
      desc: "Cơ sở dữ liệu mở với hàng chục nghìn câu giao tiếp song ngữ Anh - Việt. File MP3 thu âm từ người bản xứ thật, tìm kiếm theo chủ đề và một chạm tạo thẻ flashcard.",
      link: ROUTES.TATOEBA,
      linkText: "Khám phá câu Tatoeba",
    },
    {
      icon: <GraduationCap size={26} />,
      bg: "rgba(14, 165, 233, 0.12)",
      color: "#0ea5e9",
      title: "Bộ từ vựng CEFR, NGSL & AWL",
      desc: "Chuẩn hóa cấp độ từ A1 đến C2 cùng từ vựng học thuật quốc tế. Tích hợp Datamuse API mở rộng vốn từ theo ngữ cảnh chuyên ngành với giọng đọc tự nhiên.",
      link: ROUTES.VOCABULARY,
      linkText: "Xem kho từ vựng",
    },
  ];

  return (
    <section id="features" className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>Hệ sinh thái học tập 6 trong 1</div>
        <h2 className={styles.sectionTitle}>Mọi công cụ bạn cần để làm chủ tiếng Anh</h2>
        <p className={styles.sectionSubtitle}>
          Không chỉ là flashcard đơn thuần, Octo Flashcard là môi trường học tập toàn diện kết hợp giữa âm học, đọc hiểu, từ vựng và câu ngữ cảnh thực tế.
        </p>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((f, idx) => (
          <div key={idx} className={styles.featureCard}>
            <div className={styles.featureIconBox} style={{ background: f.bg, color: f.color }}>
              {f.icon}
            </div>
            <h3 className={styles.featureCardTitle}>{f.title}</h3>
            <p className={styles.featureCardDesc}>{f.desc}</p>
            <Link href={f.link} className={styles.featureLink}>
              <span>{f.linkText}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
