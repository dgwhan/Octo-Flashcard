"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Headphones, Book, Clock, Search, ChevronRight, User, Globe, RefreshCw } from "lucide-react";
import { LIBRIVOX_AUDIOBOOKS } from "../audiobook.data";
import { Audiobook } from "../audiobook.types";
import { ROUTES } from "@/src/config/routes";

export default function AudiobookList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [books, setBooks] = useState<Audiobook[]>(LIBRIVOX_AUDIOBOOKS);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<"api" | "curated">("curated");

  const popularSearches = ["Pride", "Sherlock", "Frankenstein", "Huckleberry", "Dumas", "Alice"];

  const fetchLiveBooks = useCallback(async (queryText: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (queryText.trim()) {
        params.set("query", queryText.trim());
      }
      params.set("limit", "16");

      const res = await fetch(`/api/audiobooks?${params.toString()}`);
      if (!res.ok) throw new Error("Audiobooks API failed");

      const data = await res.json();
      if (data.audiobooks && data.audiobooks.length > 0) {
        setBooks(data.audiobooks);
        setSource(data.source === "librivox-api" ? "api" : "curated");
      } else {
        setBooks(LIBRIVOX_AUDIOBOOKS);
        setSource("curated");
      }
    } catch (err) {
      console.warn("[LibriVox] Fetch error, falling back to curated:", err);
      setBooks(LIBRIVOX_AUDIOBOOKS);
      setSource("curated");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLiveBooks(searchQuery);
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchQuery(keyword);
    fetchLiveBooks(keyword);
  };

  const genres = ["all", ...Array.from(new Set(books.map((b) => b.genre)))];

  const filteredBooks = books.filter((b) => {
    if (selectedGenre !== "all" && b.genre !== selectedGenre) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      {/* Search & Genre bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          backgroundColor: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "14px",
          padding: "14px 18px",
        }}
      >
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1 1 280px" }}
        >
          <Search size={18} style={{ color: "var(--color-text-secondary)" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên tác phẩm, tác giả (vd: Pride, Doyle, Dickens)... Nhấn Enter"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "0.95rem",
              color: "var(--color-text-primary)",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
            }}
          >
            Tìm sách
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.8rem",
              padding: "4px 10px",
              borderRadius: "20px",
              backgroundColor:
                source === "api" ? "rgba(16, 185, 129, 0.12)" : "rgba(59, 130, 246, 0.12)",
              color: source === "api" ? "#10b981" : "#3b82f6",
              fontWeight: 600,
            }}
          >
            <Globe size={14} />
            {source === "api" ? "LibriVox API Live" : "Kho chọn lọc"}
          </div>
        </div>
      </div>

      {/* Suggested Quick Searches */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginRight: "4px" }}>
          Tác phẩm gợi ý:
        </span>
        {popularSearches.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => handleQuickSearch(kw)}
            style={{
              padding: "4px 12px",
              borderRadius: "16px",
              fontSize: "0.8rem",
              fontWeight: 500,
              backgroundColor: searchQuery === kw ? "var(--color-primary)" : "var(--color-bg-card)",
              color: searchQuery === kw ? "#fff" : "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
            }}
          >
            {kw}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "40px",
            color: "var(--color-text-secondary)",
          }}
        >
          <RefreshCw size={20} className="animate-spin" />
          <span>Đang tra cứu kho sách nói LibriVox...</span>
        </div>
      )}

      {/* Book Grid */}
      {!isLoading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              style={{
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
                transition: "all 0.2s ease",
              }}
            >
              {/* Book Cover */}
              <div
                style={{
                  height: "170px",
                  backgroundImage: `url(${book.coverUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 100%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "12px 14px",
                  }}
                >
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: "rgba(16, 185, 129, 0.9)",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {book.genre}
                  </span>
                </div>
              </div>

              {/* Book Info */}
              <div
                style={{
                  padding: "18px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                  <User size={14} />
                  <span>{book.author} ({book.year})</span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "var(--color-text-primary)", lineHeight: 1.4 }}>
                  {book.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    flex: 1,
                  }}
                >
                  {book.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--color-border)",
                    marginTop: "auto",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Book size={14} /> {book.chapters.length} phần/chương
                  </span>

                  <Link
                    href={`/audiobooks/${book.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      backgroundColor: "var(--color-primary)",
                      color: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <Headphones size={14} />
                    <span>Nghe & Đọc</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
