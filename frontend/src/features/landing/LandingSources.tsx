"use client";

import React from "react";
import {
  Globe,
  Radio,
  Book,
  MessageSquare,
  Archive,
  GraduationCap,
  Volume2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import styles from "./landing.module.css";

export default function LandingSources() {
  const sources = [
    {
      name: "VOA Learning English",
      org: "Voice of America • Hoa Kỳ",
      license: "Public Domain / Miễn phí công cộng",
      desc: "Nguồn phát thanh chính thức của Hoa Kỳ với chương trình 'American Stories' và Special English: phát thanh viên đọc tốc độ chậm, phát âm rõ ràng, kịch bản văn học chuẩn xác từng chữ.",
      link: "https://learningenglish.voanews.com",
      icon: <Radio size={24} />,
    },
    {
      name: "LibriVox & Project Gutenberg",
      org: "Tình nguyện viên toàn cầu & Dự án Gutenberg",
      license: "Public Domain (Tác phẩm công cộng)",
      desc: "Kho sách nói mở lớn nhất thế giới với hơn 10.000+ tựa sách văn học cổ điển không bản quyền được thu âm truyền cảm, đối chiếu trực tiếp với toàn văn tác phẩm từ Project Gutenberg.",
      link: "https://librivox.org",
      icon: <Book size={24} />,
    },
    {
      name: "Tatoeba Project",
      org: "Cộng đồng ngôn ngữ học Tatoeba.org",
      license: "Creative Commons Attribution 2.0 (CC BY)",
      desc: "Cơ sở dữ liệu câu ví dụ mở đa ngôn ngữ hàng đầu. Hàng vạn câu song ngữ Anh - Việt thực tế được ghi âm trực tiếp bởi người bản xứ, giúp người học nắm bắt ngữ cảnh và ngữ điệu tự nhiên.",
      link: "https://tatoeba.org",
      icon: <MessageSquare size={24} />,
    },
    {
      name: "Internet Archive (archive.org)",
      org: "Thư viện số phi lợi nhuận Internet Archive",
      license: "Open Digital Library",
      desc: "Hạ tầng lưu trữ và truyền phát âm thanh số mở, cung cấp các luồng stream audio MP3 chất lượng cao, ổn định cho toàn bộ các tác phẩm của VOA và LibriVox.",
      link: "https://archive.org",
      icon: <Archive size={24} />,
    },
    {
      name: "Khung chuẩn hóa CEFR-J, NGSL & AWL",
      org: "Hội đồng Châu Âu & ĐH Tokyo / Victoria Wellington",
      license: "Open Academic Research",
      desc: "New General Service List (từ vựng thông dụng thiết yếu) và Academic Word List (từ vựng học thuật) được phân cấp từ A1 đến C2, xây dựng trên cơ sở phân tích tần suất ngôn ngữ thực tế.",
      link: "https://www.newgeneralservicelist.com",
      icon: <GraduationCap size={24} />,
    },
    {
      name: "Free Dictionary API & Datamuse API",
      org: "Cộng đồng từ điển mở Wiktionary & WordNet",
      license: "Open Data & Free API",
      desc: "Cung cấp định nghĩa phong phú, phiên âm IPA, từ đồng nghĩa và phân tích tần suất ngôn ngữ mở, được chuyển tiếp qua máy chủ nội bộ giúp loại bỏ rào cản CORS.",
      link: "https://dictionaryapi.dev",
      icon: <Globe size={24} />,
    },
    {
      name: "Wikimedia Commons",
      org: "Tổ chức Wikimedia Foundation",
      license: "CC BY-SA 3.0 / 4.0",
      desc: "Tư liệu âm thanh phát âm ngữ âm học mở, làm cơ sở chuẩn cho 44 âm trong bảng phiên âm quốc tế IPA (Monophthongs, Diphthongs và Consonants).",
      link: "https://commons.wikimedia.org",
      icon: <Volume2 size={24} />,
    },
  ];

  return (
    <section id="sources" className={styles.section} style={{ backgroundColor: "var(--color-bg-alt)" }}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <ShieldCheck size={16} />
          <span>Học liệu mở & Minh bạch bản quyền</span>
        </div>
        <h2 className={styles.sectionTitle}>Nguồn tài liệu giáo dục mở chính thống</h2>
        <p className={styles.sectionSubtitle}>
          Octo Flashcard cam kết không sử dụng dữ liệu gán cứng giả lập. Toàn bộ học liệu, sách nói và câu ví dụ được tích hợp trực tiếp từ các tổ chức giáo dục và dự án văn hóa mở uy tín trên thế giới.
        </p>
      </div>

      <div className={styles.sourcesGrid}>
        {sources.map((src, idx) => (
          <div key={idx} className={styles.sourceCard}>
            <div className={styles.sourceIcon}>{src.icon}</div>
            <div className={styles.sourceInfo}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <h3 className={styles.sourceName}>{src.name}</h3>
                <span className={styles.sourceLicense}>{src.license}</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>
                {src.org}
              </div>
              <p className={styles.sourceDesc}>{src.desc}</p>
              <a href={src.link} target="_blank" rel="noreferrer" className={styles.sourceLink}>
                <span>Truy cập trang nguồn gốc</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
