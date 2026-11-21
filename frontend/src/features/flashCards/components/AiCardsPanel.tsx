"use client";

import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { apiClient } from "@/src/lib/api";
import styles from "./AiCardsPanel.module.css";

/** sessionStorage handoff: other modules (VOA) put { title, text } here and open /flashcards/create?ai=1 */
export const AI_SOURCE_KEY = "octo_ai_source";
export const AI_MIN_CHARS = 40;
export const AI_MAX_CHARS = 8000;

interface Props {
  onCards: (cards: { question: string; answer: string }[], title?: string) => void;
}

export default function AiCardsPanel({ onCards }: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("ai") !== "1") return;
    try {
      const src = JSON.parse(sessionStorage.getItem(AI_SOURCE_KEY) || "null");
      if (src?.text) {
        setText(String(src.text).slice(0, AI_MAX_CHARS));
        setTitle(src.title);
      }
    } catch {
      // bad handoff: just open an empty panel
    }
    setOpen(true);
  }, []);

  const len = text.trim().length;

  const generate = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const cards = await apiClient.post<{ question: string; answer: string }[]>("/ai/generate-flashcards-from-text", {
        text: text.trim(),
      });
      const clean = (cards ?? []).filter((c) => c.question?.trim() && c.answer?.trim());
      if (!clean.length) throw new Error("AI không trả về thẻ nào. Thử đoạn văn dài hơn.");
      onCards(clean, title);
      setMsg({ kind: "ok", text: `Đã thêm ${clean.length} thẻ bên dưới. Xem lại và sửa trước khi lưu.` });
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "AI chưa tạo được thẻ." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <details className={styles.panel} open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className={styles.summary}>
        <Sparkles size={16} aria-hidden="true" /> Tạo thẻ bằng AI từ một đoạn văn
      </summary>
      <div className={styles.body}>
        <label htmlFor="ai-source" className={styles.label}>
          Dán đoạn văn tiếng Anh (bài báo, bài VOA, đoạn sách). AI chọn từ và cụm từ đáng học, kèm nghĩa tiếng Việt.
        </label>
        <textarea
          id="ai-source"
          className={styles.textarea}
          rows={6}
          value={text}
          maxLength={AI_MAX_CHARS}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste an English paragraph here…"
        />
        <div className={styles.row}>
          <span className={styles.count}>
            {len}/{AI_MAX_CHARS} ký tự{len > 0 && len < AI_MIN_CHARS ? ` (tối thiểu ${AI_MIN_CHARS})` : ""}
          </span>
          <button type="button" className={styles.btn} onClick={generate} disabled={busy || len < AI_MIN_CHARS}>
            {busy ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Sparkles size={15} aria-hidden="true" />}
            {busy ? "Đang tạo…" : "Tạo thẻ"}
          </button>
        </div>
        <p className={msg?.kind === "err" ? styles.err : styles.ok} role="status" aria-live="polite">
          {msg?.text}
        </p>
      </div>
    </details>
  );
}
