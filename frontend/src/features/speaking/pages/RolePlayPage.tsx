"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2, RotateCcw, ArrowLeft, Check, X } from "lucide-react";
import { AudioButton } from "@/src/components/ui/AudioButton";
import { voicePlayer } from "@/src/lib/voice/voice";
import Link from "next/link";
import { ROUTES } from "@/src/config/routes";
import SavePhraseButton from "../components/SavePhraseButton";
import { logStudySession } from "@/src/lib/studyLog";
import { aiGenerate, parseJson, AiTurn as Turn } from "@/src/lib/ai";
import { useUserSettings } from "@/src/lib/userSettings";
import { SCENARIOS, MAX_TURNS, LEVELS } from "../data/scenarios";
import { searchScenarios } from "../lib/searchScenarios";
import { rolePlaySystem, FEEDBACK_SYSTEM, feedbackRequest } from "../lib/prompts";
import type { Scenario, RolePlayFeedback } from "../types";
import { useSpeechCapture } from "../hooks/useSpeechCapture";
import { AiKeyNotice, VoicePicker } from "@/src/features/settings";
import { MicButton, LiveTranscript, SpeechNotice } from "../components/SpeechParts";
import styles from "../speaking.module.css";

// Gemini expects the conversation to open with a user turn
const PRIMER: Turn = { role: "user", text: "Let's start the role-play. Please begin." };
const SCORE_LABELS: [keyof RolePlayFeedback["scores"], string][] = [
  ["fluency", "Trôi chảy"],
  ["grammar", "Ngữ pháp"],
  ["vocabulary", "Từ vựng"],
  ["interaction", "Tương tác"],
];

export default function RolePlayPage() {
  const hasKey = useUserSettings().settings.hasGeminiKey;
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [feedback, setFeedback] = useState<RolePlayFeedback | null>(null);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [levelFilter, setLevelFilter] = useState<Scenario["level"] | "">("");
  const [query, setQuery] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLOListElement>(null);

  const capture = useSpeechCapture({
    onEnd: (t) => t && setDraft((d) => (d ? `${d} ${t}` : t)),
  });

  useEffect(
    () => () => {
      abortRef.current?.abort();
      voicePlayer.stop();
    },
    []
  );

  useEffect(() => {
    logRef.current?.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [turns]);

  const speak = (text: string) => {
    if (autoSpeak) voicePlayer.play(text).catch(() => {});
  };

  const begin = (s: Scenario) => {
    setScenario(s);
    setTurns([{ role: "model", text: s.opening }]);
    setFeedback(null);
    setDraft("");
    setError("");
    setStartedAt(new Date());
    speak(s.opening);
  };

  const leave = () => {
    abortRef.current?.abort();
    capture.stop();
    voicePlayer.stop();
    setScenario(null);
    setTurns([]);
    setFeedback(null);
  };

  const call = async (system: string, history: Turn[], json = false) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    return aiGenerate({ system, turns: history, json, signal: ctrl.signal });
  };

  const send = async () => {
    const text = draft.trim();
    if (!text || !scenario || !hasKey || busy) return;
    const next: Turn[] = [...turns, { role: "user", text }];
    setTurns(next);
    setDraft("");
    setBusy(true);
    setError("");
    try {
      const reply = await call(rolePlaySystem(scenario), [PRIMER, ...next]);
      setTurns([...next, { role: "model", text: reply }]);
      speak(reply);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "AI chưa trả lời được.");
      setTurns(turns);
      setDraft(text);
    } finally {
      setBusy(false);
    }
  };

  const review = async () => {
    if (!scenario || !hasKey) return;
    capture.stop();
    voicePlayer.stop();
    setBusy(true);
    setError("");
    try {
      const raw = await call(FEEDBACK_SYSTEM, feedbackRequest(scenario, turns), true);
      setFeedback(parseJson<RolePlayFeedback>(raw));
      if (startedAt) logStudySession("Speaking", startedAt);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Chưa nhận xét được.");
    } finally {
      setBusy(false);
    }
  };

  const learnerTurns = turns.filter((t) => t.role === "user").length;

  /* ---------- Scenario picker ---------- */
  if (!scenario) {
    const shown = searchScenarios(SCENARIOS, levelFilter, query);
    return (
      <div className={styles.stack}>
        <AiKeyNotice feature="Hội thoại nhập vai" />
        <VoicePicker />
        <div className={styles.filterBar}>
          <label className={styles.field}>
            <span className={styles.srOnly}>Tìm tình huống</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tình huống: nhà hàng, phỏng vấn, interview…"
            />
          </label>
          <div className={styles.chips} role="group" aria-label="Lọc theo cấp độ">
            {(["", ...LEVELS] as const).map((l) => (
              <button
                key={l || "all"}
                type="button"
                className={styles.chip}
                aria-pressed={levelFilter === l}
                onClick={() => setLevelFilter(l)}
              >
                {l || "Tất cả"} ({searchScenarios(SCENARIOS, l, query).length})
              </button>
            ))}
          </div>
        </div>
        {shown.length === 0 && (
          <p className={styles.muted} role="status">
            Không có tình huống nào khớp. Thử từ khóa khác hoặc chọn “Tất cả”.
          </p>
        )}
        <ul className={styles.setGrid}>
          {shown.map((s) => (
            <li key={s.id}>
              <button type="button" className={styles.setCard} onClick={() => begin(s)} disabled={!hasKey}>
                <span className={styles.setSource}>{s.level}</span>
                <span className={styles.setTitle}>{s.title}</span>
                <span className={styles.setCount}>{s.goal}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ---------- Feedback ---------- */
  if (feedback) {
    return (
      <section className={styles.panel} aria-labelledby="fb-title">
        <h2 id="fb-title" className={styles.panelTitle}>
          Nhận xét: {scenario.title}
        </h2>
        <p className={styles.goal} data-ok={feedback.goalReached}>
          {feedback.goalReached ? <Check size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}
          {feedback.goalReached ? "Đã hoàn thành mục tiêu" : "Chưa hoàn thành mục tiêu"}
        </p>
        <p>{feedback.summary}</p>

        <dl className={styles.scores}>
          {SCORE_LABELS.map(([k, label]) => {
            const v = Math.max(0, Math.min(5, Math.round(feedback.scores?.[k] ?? 0)));
            return (
              <div key={k}>
                <dt>{label}</dt>
                <dd>
                  <span className={styles.dots} aria-label={`${v} trên 5`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} data-on={i <= v} />
                    ))}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>

        {feedback.corrections?.length > 0 && (
          <>
            <h3 className={styles.subTitle}>Câu nên nói lại</h3>
            <ul className={styles.corrections}>
              {feedback.corrections.map((c, i) => (
                <li key={i}>
                  <p className={styles.original} lang="en">
                    {c.original}
                  </p>
                  <p className={styles.better} lang="en">
                    {c.better}
                    <AudioButton player={voicePlayer} text={c.better} size="sm" variant="subtle" aria-label={`Nghe: ${c.better}`} />
                  </p>
                  <p className={styles.muted}>{c.explanation}</p>
                  <SavePhraseButton
                    phrase={{
                      text: c.better,
                      meaning: c.explanation,
                      kind: "sentence",
                      topic: scenario.topic,
                      scenarioId: scenario.id,
                      scenarioTitle: scenario.title,
                    }}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        {feedback.phrases?.length > 0 && (
          <>
            <h3 className={styles.subTitle}>Cụm từ nên dùng</h3>
            <ul className={styles.wordList}>
              {feedback.phrases.map((p) => (
                <li key={p.phrase}>
                  <span lang="en">{p.phrase}</span>
                  <span className={styles.muted}>{p.meaning}</span>
                  <SavePhraseButton
                    label="Lưu"
                    phrase={{
                      text: p.phrase,
                      meaning: p.meaning,
                      kind: "phrase",
                      topic: scenario.topic,
                      scenarioId: scenario.id,
                      scenarioTitle: scenario.title,
                    }}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        <p className={styles.muted}>
          Câu đã lưu nằm trong{" "}
          <Link href={ROUTES.SPEAKING_PHRASEBOOK} className={styles.linkBtn}>
            Sổ tay luyện nói
          </Link>
          , xếp theo chủ đề.
        </p>

        <div className={styles.row}>
          <button type="button" className={styles.primaryBtn} onClick={() => begin(scenario)}>
            <RotateCcw size={15} aria-hidden="true" /> Luyện lại tình huống này
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={leave}>
            Chọn tình huống khác
          </button>
        </div>
      </section>
    );
  }

  /* ---------- Conversation ---------- */
  return (
    <div className={styles.stack}>
      <button type="button" className={styles.back} onClick={leave}>
        <ArrowLeft size={15} aria-hidden="true" /> Chọn tình huống khác
      </button>
      <section className={styles.panel} aria-label={`Hội thoại: ${scenario.title}`}>
        <div className={styles.drillMeta}>
          <span>
            {scenario.title} · {scenario.level}
          </span>
          <span className={styles.count}>
            {learnerTurns}/{MAX_TURNS} lượt
          </span>
        </div>
        <p className={styles.tip}>Mục tiêu: {scenario.goal}</p>

        <ol className={styles.chat} ref={logRef} aria-live="polite">
          {turns.map((t, i) => (
            <li key={i} className={styles.bubble} data-role={t.role}>
              <span lang="en">{t.text}</span>
              {t.role === "model" && (
                <AudioButton player={voicePlayer} text={t.text} size="sm" variant="ghost" aria-label="Nghe lại câu này" />
              )}
            </li>
          ))}
          {busy && (
            <li className={styles.bubble} data-role="model">
              <Loader2 size={16} className="animate-spin" aria-label="AI đang trả lời" />
            </li>
          )}
        </ol>

        <div className={styles.chips} aria-label="Gợi ý câu nói">
          {scenario.hints.map((h) => (
            <button key={h} type="button" className={styles.chip} onClick={() => setDraft((d) => (d ? `${d} ${h}` : h))}>
              {h}
            </button>
          ))}
        </div>

        <LiveTranscript transcript={capture.listening ? capture.transcript : ""} interim={capture.interim} />
        {(capture.error || error) && (
          <p className={styles.error} role="alert">
            {capture.error || error}
          </p>
        )}
        {learnerTurns >= MAX_TURNS && (
          <p className={styles.tip}>Bạn đã nói {learnerTurns} lượt. Bấm “Kết thúc và nhận xét” để xem góp ý.</p>
        )}

        <form
          className={styles.composer}
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <MicButton listening={capture.listening} onStart={capture.start} onStop={capture.stop} disabled={busy} label="Nói" compact />
          <label className={styles.srOnly} htmlFor="rp-draft">
            Câu trả lời của bạn
          </label>
          <textarea
            id="rp-draft"
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Bấm Nói hoặc gõ câu trả lời, rồi Enter để gửi"
            lang="en"
          />
          <button type="submit" className={styles.iconBtn} disabled={busy || !draft.trim()} aria-label="Gửi">
            <Send size={18} aria-hidden="true" />
          </button>
        </form>

        <div className={styles.row}>
          <label className={styles.check}>
            <input type="checkbox" checked={autoSpeak} onChange={(e) => setAutoSpeak(e.target.checked)} />
            Tự đọc to câu trả lời của AI
          </label>
          <button type="button" className={styles.secondaryBtn} onClick={review} disabled={busy || learnerTurns < 2}>
            Kết thúc và nhận xét
          </button>
        </div>
      </section>
      <SpeechNotice />
    </div>
  );
}
