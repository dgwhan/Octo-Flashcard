"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RotateCw, Lock, ArrowRight } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { getAuthToken } from "@/src/lib/api";
import { logStudySession } from "@/src/lib/studyLog";
import { flipCard, dealCard } from "@/src/lib/motion";
import { SuckerRow } from "@/src/components/ui";
import { flashCardApi } from "../api/flashCard.api";
import { GRADES, SrsGrade, parseState, reviewCard, previewDue, formatInterval } from "../lib/srs";
import { buildQueue, nextDueAt, QueueItem } from "../lib/reviewQueue";
import styles from "./ReviewPage.module.css";

type Phase = "loading" | "auth" | "error" | "empty" | "review" | "done";

/** Within-session relearning: a card rescheduled sooner than this comes back at the end of the queue. */
const REQUEUE_WITHIN_MS = 20 * 60 * 1000;

export default function ReviewPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [previews, setPreviews] = useState<Record<number, Date>>({});
  const [tally, setTally] = useState<Record<number, number>>({});
  const [nextAt, setNextAt] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState("");
  const [busy, setBusy] = useState(false);
  const startedAt = useRef(new Date());
  const sceneRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!getAuthToken()) {
      setPhase("auth");
      return;
    }
    flashCardApi
      .getAll()
      .then((sets) => {
        const q = buildQueue(sets);
        setQueue(q);
        setNextAt(nextDueAt(sets));
        setPhase(q.length ? "review" : "empty");
      })
      .catch(() => setPhase("error"));
  }, []);

  const current = queue[pos];

  // Interval captions for the 4 grade buttons, recomputed per card
  useEffect(() => {
    if (!current) return;
    previewDue(parseState(current.card.reviewState)).then(setPreviews);
  }, [current]);

  const reveal = useCallback(() => {
    if (revealed || !current) return;
    flipCard(innerRef.current, sceneRef.current, true);
    setRevealed(true);
  }, [revealed, current]);

  const grade = useCallback(
    async (g: SrsGrade) => {
      if (!revealed || !current || busy) return;
      setBusy(true);
      const now = new Date();
      const { state, due, json } = await reviewCard(parseState(current.card.reviewState), g, now);
      const updated: QueueItem = { ...current, card: { ...current.card, due: due.toISOString(), reviewState: json } };
      try {
        await flashCardApi.updateReview(current.setId, current.card.id, { due, reviewState: json });
        setSaveError("");
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : "Không lưu được kết quả ôn tập.");
      }
      setTally((t) => ({ ...t, [g]: (t[g] ?? 0) + 1 }));
      const requeue = state.dueAt.getTime() - now.getTime() < REQUEUE_WITHIN_MS;
      const nextQueue = requeue ? [...queue, updated] : queue;
      setQueue(nextQueue);
      setRevealed(false);
      setBusy(false);
      if (pos + 1 < nextQueue.length) {
        setPos(pos + 1);
        dealCard(sceneRef.current, 1);
      } else {
        setPhase("done");
        logStudySession("Flashcard", startedAt.current);
      }
    },
    [revealed, current, busy, queue, pos]
  );

  // Keyboard: Space/Enter reveals, 1–4 grade
  useEffect(() => {
    if (phase !== "review") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.key === " " || e.key === "Enter") && !revealed) {
        e.preventDefault();
        reveal();
      }
      const hit = GRADES.find((x) => x.key === e.key);
      if (hit && revealed) {
        e.preventDefault();
        grade(hit.grade);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, revealed, reveal, grade]);

  const reviewed = Object.values(tally).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowNum}>01</span>Flashcard · Lặp lại ngắt quãng
        </p>
        <h1 className={styles.title}>Ôn tập hôm nay</h1>
        <p className={styles.lead}>
          Thẻ đến hạn từ mọi bộ. Tự nhớ trước khi lật, rồi chấm mức độ nhớ: lịch ôn tiếp theo được tính bằng thuật toán
          FSRS.
        </p>
      </header>

      {phase === "loading" && (
        <p className={styles.state} role="status">
          <SuckerRow count={5} /> Đang tải thẻ…
        </p>
      )}

      {phase === "auth" && (
        <div className={styles.state}>
          <Lock size={20} aria-hidden="true" />
          <p>Đăng nhập để lịch ôn được lưu và đồng bộ giữa các thiết bị.</p>
          <Link href={`${ROUTES.AUTH.LOGIN}?redirect=/flashcards/review`} className={styles.primaryBtn}>
            Đăng nhập
          </Link>
        </div>
      )}

      {phase === "error" && <p className={styles.state}>Không tải được bộ thẻ. Kiểm tra kết nối rồi thử lại.</p>}

      {phase === "empty" && (
        <div className={styles.state}>
          <SuckerRow count={8} filled={8} />
          <p className={styles.stateTitle}>Hôm nay không còn thẻ nào đến hạn.</p>
          {nextAt && <p>Lần ôn kế tiếp: {nextAt.toLocaleString("vi-VN", { dateStyle: "medium", timeStyle: "short" })}.</p>}
          <Link href={ROUTES.FLASHCARDS} className={styles.textLink}>
            Về danh sách bộ thẻ <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {phase === "review" && current && (
        <section className={styles.session} aria-label="Phiên ôn tập">
          <div className={styles.meta}>
            <span>{current.setTitle}</span>
            <span className={styles.count}>
              {pos + 1} / {queue.length}
            </span>
          </div>
          <div className={styles.track} aria-hidden="true">
            <span style={{ width: `${(pos / queue.length) * 100}%` }} />
          </div>

          <button
            ref={sceneRef}
            type="button"
            className={styles.scene}
            onClick={reveal}
            aria-label={revealed ? "Đáp án đang hiện" : "Lật thẻ để xem đáp án (phím Space)"}
            aria-pressed={revealed}
          >
            <span ref={innerRef} className={`${styles.inner} ${revealed ? styles.flipped : ""}`}>
              <span className={`${styles.face} ${styles.front}`}>
                <span className={styles.faceTag}>{current.card.due ? "Ôn lại" : "Thẻ mới"}</span>
                <span className={styles.faceText}>{current.card.question}</span>
                <span className={styles.hint}>
                  <RotateCw size={13} aria-hidden="true" /> Space để lật
                </span>
              </span>
              <span className={`${styles.face} ${styles.back}`}>
                <span className={styles.faceTag}>Đáp án</span>
                <span className={styles.faceText}>{current.card.answer}</span>
              </span>
            </span>
          </button>

          <div className={styles.grades} role="group" aria-label="Bạn nhớ thẻ này thế nào?">
            {GRADES.map(({ grade: g, label, key }) => (
              <button
                key={g}
                type="button"
                className={styles.gradeBtn}
                data-grade={label}
                onClick={() => grade(g)}
                disabled={!revealed || busy}
              >
                <span className={styles.gradeLabel}>
                  {label} <kbd>{key}</kbd>
                </span>
                <span className={styles.gradeNext}>{previews[g] ? formatInterval(new Date(), previews[g]) : "…"}</span>
              </button>
            ))}
          </div>
          {saveError && (
            <p className={styles.error} role="alert">
              {saveError} Kết quả vẫn được tính trong phiên này.
            </p>
          )}
        </section>
      )}

      {phase === "done" && (
        <div className={styles.state}>
          <SuckerRow count={8} filled={8} className={styles.gold} />
          <p className={styles.stateTitle}>Xong {reviewed} lượt ôn.</p>
          <p>
            {GRADES.map(({ grade: g, label }) => `${label}: ${tally[g] ?? 0}`).join(" · ")}. Thời gian học đã được ghi vào
            chuỗi ngày học của bạn.
          </p>
          <Link href={ROUTES.PROGRESS} className={styles.primaryBtn}>
            Xem tiến độ <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
