"use client";

import React from "react";
import Link from "next/link";
import { Layers, PlusCircle, Sparkles, Volume2, CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { useTranslation } from "@/src/i18n";
import styles from "@/app/page.module.css";

export default function HomePageClient() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "760px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.12)", color: "var(--color-primary)", width: "fit-content", fontSize: "0.875rem", fontWeight: 600 }}>
          <Sparkles size={16} />
          <span>Active Recall & Spaced Repetition</span>
        </div>

        <h1 className={styles.title}>{t("home.heroTitle")}</h1>
        
        <p className={styles.description}>
          {t("home.heroSubtitle")}
        </p>

        <div style={{ display: "flex", gap: "14px", marginTop: "8px", flexWrap: "wrap" }}>
          <Link
            href={ROUTES.FLASHCARDS}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "12px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 6px 16px rgba(16, 185, 129, 0.28)",
              transition: "transform 0.15s ease",
            }}
          >
            <Layers size={20} />
            <span>{t("home.startLearning")}</span>
          </Link>

          <Link
            href={ROUTES.FLASHCARDS_CREATE}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 24px",
              borderRadius: "12px",
              backgroundColor: "var(--color-bg-card)",
              color: "var(--color-text-primary)",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              border: "1px solid var(--color-border)",
            }}
          >
            <PlusCircle size={20} />
            <span>{t("home.createNewSet")}</span>
          </Link>
        </div>

        {/* Feature highlight cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "14px",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(16, 185, 129, 0.12)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>
              {t("home.feature1Title")}
            </h3>
            <p style={{ fontSize: "0.875rem", margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              {t("home.feature1Desc")}
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "14px",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(59, 130, 246, 0.12)",
                color: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Volume2 size={22} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>
              {t("home.feature2Title")}
            </h3>
            <p style={{ fontSize: "0.875rem", margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              {t("home.feature2Desc")}
            </p>
          </div>

          <div
            style={{
              padding: "20px",
              borderRadius: "14px",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={22} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>
              {t("home.feature3Title")}
            </h3>
            <p style={{ fontSize: "0.875rem", margin: 0, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              {t("home.feature3Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
