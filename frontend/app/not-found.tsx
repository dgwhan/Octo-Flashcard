import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--color-bg-main, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "var(--color-text-primary, #000000)",
            margin: 0,
            borderRight: "1px solid var(--color-border, #cccccc)",
            paddingRight: "16px",
            lineHeight: "40px",
          }}
        >
          404
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary, #666666)", margin: 0 }}>
          This page could not be found.
        </p>
      </div>
      <Link
        href="/"
        style={{
          fontSize: "0.875rem",
          color: "var(--color-primary, #0070f3)",
          textDecoration: "underline",
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
