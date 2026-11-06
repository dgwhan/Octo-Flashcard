"use client";

import React from "react";
import Link from "next/link";
import { Heart, Shield } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import styles from "./LandingFooter.module.css";

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          {/* Brand Info */}
          <div className={styles.footerBrandCol}>
            <div className={styles.brand}>
              <span>Octo Study</span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0, maxWidth: "340px" }}>
              Nền tảng học tiếng Anh hiện đại kết hợp phương pháp Khoa học Não bộ (Spaced Repetition & Active Recall) cùng kho Học liệu Mở quốc tế chính thống.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>
              <Shield size={14} />
              <span>Dự án mã nguồn mở & Bảo vệ quyền riêng tư</span>
            </div>
          </div>

          {/* Core Tools & Features */}
          <div>
            <h4 className={styles.footerColTitle}>Tính Năng & Công Cụ</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <Link href={ROUTES.FLASHCARDS} className={styles.footerLink}>
                  Flashcard 3D Hub
                </Link>
              </li>
              <li>
                <Link href={ROUTES.IPA} className={styles.footerLink}>
                  Bảng 44 âm IPA chuẩn
                </Link>
              </li>
              <li>
                <Link href={ROUTES.VOA} className={styles.footerLink}>
                  VOA Special English
                </Link>
              </li>
              <li>
                <Link href={ROUTES.VOCABULARY} className={styles.footerLink}>
                  Kho từ vựng chuẩn CEFR
                </Link>
              </li>
              <li>
                <Link href={ROUTES.TATOEBA} className={styles.footerLink}>
                  Câu ngữ cảnh Tatoeba
                </Link>
              </li>
            </ul>
          </div>

          {/* Open Educational Resources */}
          <div>
            <h4 className={styles.footerColTitle}>Học Liệu Mở Chuẩn</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <a href="https://learningenglish.voanews.com" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  VOA Learning English
                </a>
              </li>
              <li>
                <a href="https://librivox.org" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  LibriVox Audiobooks
                </a>
              </li>
              <li>
                <a href="https://tatoeba.org" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  Dự án Tatoeba người thật
                </a>
              </li>
              <li>
                <a href="https://www.gutenberg.org" target="_blank" rel="noreferrer" className={styles.footerLink}>
                  Project Gutenberg
                </a>
              </li>
            </ul>
          </div>

          {/* Scientific Methodology */}
          <div>
            <h4 className={styles.footerColTitle}>Phương Pháp Khoa Học</h4>
            <ul className={styles.footerLinkList}>
              <li>
                <a href="#methodology" className={styles.footerLink}>
                  Spaced Repetition (Lặp lại ngắt quãng)
                </a>
              </li>
              <li>
                <a href="#methodology" className={styles.footerLink}>
                  Active Recall (Truy hồi chủ động)
                </a>
              </li>
              <li>
                <span className={styles.footerLink}>
                  Đường cong quên lãng Ebbinghaus
                </span>
              </li>
              <li>
                <span className={styles.footerLink}>
                  Khung chuẩn CEFR & NGSL
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div>
            © {new Date().getFullYear()} <b>Octo Study</b>. Dự án học tiếng Anh mở phi lợi nhuận.
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
