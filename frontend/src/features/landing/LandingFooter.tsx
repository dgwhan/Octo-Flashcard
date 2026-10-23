"use client";

import React from "react";
import Link from "next/link";
import { Layers, Heart, Shield, Globe, ExternalLink } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./landing.module.css";

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          {/* Brand Info */}
          <div className={styles.footerBrandCol}>
            <div className={styles.brand}>
              <div className={styles.brandBadge}>
                <Layers size={18} />
              </div>
              <span>Octo Flashcard</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Nền tảng học tiếng Anh trực tuyến dựa trên khoa học nhận thức (Active Recall & Spaced Repetition), tích hợp học liệu mở công cộng từ VOA, LibriVox, Gutenberg và Tatoeba.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>
              <Shield size={14} />
              <span>Bảo vệ quyền riêng tư & An toàn dữ liệu người dùng</span>
            </div>
          </div>

          {/* Console Links */}
          <div>
            <h4 className={styles.footerColTitle}>Console Học Tập</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <Link href={ROUTES.FLASHCARDS} className={styles.footerLink}>
                  Flashcard 3D Hub
                </Link>
              </li>
              <li>
                <Link href={ROUTES.VOA} className={styles.footerLink}>
                  VOA Learning English
                </Link>
              </li>
              <li>
                <Link href={ROUTES.IPA} className={styles.footerLink}>
                  Bảng phiên âm IPA 44 âm
                </Link>
              </li>
              <li>
                <Link href={ROUTES.VOCABULARY} className={styles.footerLink}>
                  Bộ từ vựng CEFR & NGSL
                </Link>
              </li>
              <li>
                <Link href={ROUTES.AUDIOBOOKS} className={styles.footerLink}>
                  Sách nói LibriVox
                </Link>
              </li>
              <li>
                <Link href={ROUTES.TATOEBA} className={styles.footerLink}>
                  Câu ví dụ Tatoeba (Người thật)
                </Link>
              </li>
              <li>
                <Link href={ROUTES.DICTIONARY} className={styles.footerLink}>
                  Từ điển đa tốc độ
                </Link>
              </li>
            </ul>
          </div>

          {/* Public Resources Attributions */}
          <div>
            <h4 className={styles.footerColTitle}>Học Liệu Mở Quốc Tế</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <a href="https://learningenglish.voanews.com" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  VOA American Stories
                </a>
              </li>
              <li>
                <a href="https://librivox.org" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  LibriVox Audiobooks
                </a>
              </li>
              <li>
                <a href="https://www.gutenberg.org" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  Project Gutenberg
                </a>
              </li>
              <li>
                <a href="https://tatoeba.org" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  Tatoeba Project (CC BY)
                </a>
              </li>
              <li>
                <a href="https://archive.org" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  Internet Archive (Archive.org)
                </a>
              </li>
              <li>
                <a href="https://dictionaryapi.dev" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  Free Dictionary API
                </a>
              </li>
              <li>
                <a href="https://www.datamuse.com/api" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  Datamuse Lexicon
                </a>
              </li>
            </ul>
          </div>

          {/* Standards & Pedagogies */}
          <div>
            <h4 className={styles.footerColTitle}>Chuẩn Hóa & Phương Pháp</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <span className={styles.footerLink}>CEFR-J Framework (A1 – C2)</span>
              </li>
              <li>
                <span className={styles.footerLink}>New General Service List (NGSL)</span>
              </li>
              <li>
                <span className={styles.footerLink}>Academic Word List (AWL)</span>
              </li>
              <li>
                <span className={styles.footerLink}>Active Recall Testing</span>
              </li>
              <li>
                <span className={styles.footerLink}>Hermann Ebbinghaus Curve</span>
              </li>
              <li>
                <span className={styles.footerLink}>Krashen Comprehensible Input</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div>
            © {new Date().getFullYear()} <b>Octo Flashcard</b>. Dự án học tiếng Anh mở phi lợi nhuận.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Phát triển vì cộng đồng người học tiếng Anh</span>
            <Heart size={14} style={{ color: "#ef4444", fill: "#ef4444" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
