"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Volume2,
  Headphones,
  MessageSquare,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./LandingFeatures.module.css";

interface StickyNoteItem {
  id: string;
  index: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  themeClass: string;
  zigzagClass: string;
  annotation: string;
  title: string;
  summary: string;
  fullDesc: string;
  link: string;
  linkText: string;
}

export default function LandingFeatures() {
  const notes: StickyNoteItem[] = [
    {
      id: "flashcards",
      index: "01",
      icon: <Layers size={18} />,
      iconBg: "rgba(16, 185, 129, 0.12)",
      iconColor: "var(--color-primary)",
      themeClass: styles.themeEmerald,
      zigzagClass: styles.note1,
      annotation: "Active Recall • SRS",
      title: "Flashcard 3D & Spaced Repetition",
      summary:
        "Lật thẻ không gian 3D trực quan, ứng dụng kỹ thuật Active Recall & Lặp lại ngắt quãng để khắc sâu từ vựng dài hạn.",
      fullDesc:
        "Lật thẻ không gian 3D trực quan, ứng dụng kỹ thuật Truy hồi Chủ động (Active Recall) và Lặp lại ngắt quãng để khắc sâu từ vựng vào trí nhớ dài hạn.",
      link: ROUTES.FLASHCARDS,
      linkText: "Vào Console Flashcard",
    },
    {
      id: "voa",
      index: "02",
      icon: <Sparkles size={18} />,
      iconBg: "rgba(59, 130, 246, 0.12)",
      iconColor: "#3b82f6",
      themeClass: styles.themeBlue,
      zigzagClass: styles.note2,
      annotation: "120 WPM • Chuẩn VOA",
      title: "VOA Learning English theo Level",
      summary:
        "Phóng sự & tác phẩm kinh điển từ phát thanh viên VOA Special English, transcript khớp 100% thời gian thực.",
      fullDesc:
        "Học đọc và nghe qua các phóng sự, tác phẩm kinh điển từ phát thanh viên VOA Special English. Âm thanh tốc độ chuẩn, transcript khớp 100%, highlight câu theo thời gian thực.",
      link: ROUTES.VOA,
      linkText: "Học VOA English",
    },
    {
      id: "ipa",
      index: "03",
      icon: <Volume2 size={18} />,
      iconBg: "rgba(245, 158, 11, 0.12)",
      iconColor: "#f59e0b",
      themeClass: styles.themeAmber,
      zigzagClass: styles.note3,
      annotation: "44 Âm IPA • Khẩu hình 3D",
      title: "Bảng ngữ âm quốc tế IPA 44 âm",
      summary:
        "12 nguyên âm đơn, 8 nguyên âm đôi và 24 phụ âm kèm bản ghi âm chuẩn, hướng dẫn khẩu hình răng - môi - lưỡi.",
      fullDesc:
        "Nắm vững 12 nguyên âm đơn, 8 nguyên âm đôi và 24 phụ âm. Kèm bản ghi âm phát âm chuẩn, hướng dẫn khẩu hình răng - môi - lưỡi và bài tập kiểm tra phản xạ tai nghe.",
      link: ROUTES.IPA,
      linkText: "Luyện bảng âm IPA",
    },
    {
      id: "audiobooks",
      index: "04",
      icon: <Headphones size={18} />,
      iconBg: "rgba(139, 92, 246, 0.12)",
      iconColor: "#8b5cf6",
      themeClass: styles.themePurple,
      zigzagClass: styles.note4,
      annotation: "LibriVox & Gutenberg",
      title: "Thư viện Sách nói LibriVox & Gutenberg",
      summary:
        "Hàng nghìn tác phẩm văn học bất hủ (Sherlock Holmes, Pride & Prejudice...) với giọng đọc truyền cảm và tra từ tức thì.",
      fullDesc:
        "Stream trực tiếp hàng nghìn tác phẩm văn học bất hủ (Sherlock Holmes, Pride & Prejudice,...). Vừa nghe người bản ngữ đọc truyền cảm, vừa tra từ điển tức thì trên từng câu chữ.",
      link: ROUTES.AUDIOBOOKS,
      linkText: "Nghe sách nói LibriVox",
    },
    {
      id: "sentences",
      index: "05",
      icon: <MessageSquare size={18} />,
      iconBg: "rgba(236, 72, 153, 0.12)",
      iconColor: "#ec4899",
      themeClass: styles.themeRose,
      zigzagClass: styles.note5,
      annotation: "Song ngữ EN-VI • Tatoeba",
      title: "Kho câu ví dụ người thật Tatoeba",
      summary:
        "Hàng chục nghìn câu giao tiếp song ngữ Anh - Việt với file MP3 thu âm người thật và một chạm tạo thẻ flashcard.",
      fullDesc:
        "Cơ sở dữ liệu mở với hàng chục nghìn câu giao tiếp song ngữ Anh - Việt. File MP3 thu âm từ người bản xứ thật, tìm kiếm theo chủ đề và một chạm tạo thẻ flashcard.",
      link: ROUTES.TATOEBA,
      linkText: "Khám phá câu Tatoeba",
    },
    {
      id: "vocabulary",
      index: "06",
      icon: <GraduationCap size={18} />,
      iconBg: "rgba(14, 165, 233, 0.12)",
      iconColor: "#0ea5e9",
      themeClass: styles.themeSky,
      zigzagClass: styles.note6,
      annotation: "CEFR A1–C2 • Oxford 3000",
      title: "Bộ từ vựng CEFR, NGSL & AWL",
      summary:
        "Chuẩn hóa cấp độ A1 đến C2 cùng từ vựng học thuật quốc tế, tích hợp Datamuse API mở rộng vốn từ chuyên ngành.",
      fullDesc:
        "Chuẩn hóa cấp độ từ A1 đến C2 cùng từ vựng học thuật quốc tế. Tích hợp Datamuse API mở rộng vốn từ theo ngữ cảnh chuyên ngành với giọng đọc tự nhiên.",
      link: ROUTES.VOCABULARY,
      linkText: "Xem kho từ vựng",
    },
  ];

  return (
    <section id="features" className={styles.section} aria-label="Tính năng học tập">
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Mọi công cụ bạn cần để làm chủ tiếng Anh</h2>
        <p className={styles.sectionSubtitle}>
          Không chỉ là flashcard đơn thuần, Octo Flashcard là môi trường học tập toàn diện kết hợp giữa âm học, đọc hiểu, từ vựng và câu ngữ cảnh thực tế.
        </p>
      </div>

      {/* Sticky Notes Zigzag Workspace Collection */}
      <div className={styles.zigzagGrid}>
        {notes.map((note) => (
          <article
            key={note.id}
            className={`${styles.stickyNote} ${note.themeClass} ${note.zigzagClass}`}
            title={note.fullDesc}
          >
            {/* Note Top Header (Tape-free, Clean Soft Fill Badge) */}
            <div className={styles.noteHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.noteIndex}>{note.index}</span>
                <div
                  className={styles.noteIconCircle}
                  style={{ backgroundColor: note.iconBg, color: note.iconColor }}
                  aria-hidden="true"
                >
                  {note.icon}
                </div>
              </div>
              <span className={styles.annotationTag}>{note.annotation}</span>
            </div>

            {/* Note Body */}
            <div className={styles.noteBody}>
              <h3 className={styles.noteTitle}>{note.title}</h3>
              <p className={styles.noteSummary}>{note.summary}</p>
            </div>

            {/* Note Footer & Direct Action Link */}
            <div className={styles.noteFooter}>
              <Link
                href={note.link}
                className={styles.noteLink}
                aria-label={`${note.linkText} - ${note.title}`}
              >
                <span>{note.linkText}</span>
                <ArrowRight size={14} className={styles.noteLinkIcon} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
