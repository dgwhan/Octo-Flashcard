"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2, RotateCcw, ArrowLeft, Check, X } from "lucide-react";
import { AudioButton } from "@/src/components/ui/AudioButton";
import { speakingVoice } from "../lib/voice/voice";
import SaveToDeckButton from "@/src/features/flashcards/components/SaveToDeckButton";
import { logStudySession } from "@/src/lib/studyLog";
import { generate, parseJson, Turn } from "../lib/gemini";
import { SCENARIOS, MAX_TURNS } from "../data/scenarios";
import { rolePlaySystem, FEEDBACK_SYSTEM, feedbackRequest } from "../lib/prompts";
import type { Scenario, RolePlayFeedback } from "../types";
import { useSpeechCapture } from "../hooks/useSpeechCapture";
import GeminiKeyPanel, { useGeminiConfig } from "../components/GeminiKeyPanel";
import VoicePicker from "../components/VoicePicker";
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
  const config = useGeminiConfig();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [feedback, setFeedback] = useState<RolePlayFeedback | null>(null);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLOListElement>(null);

  const capture = useSpeechCapture({
    onEnd: (t) => t && setDraft((d) => (d ? `${d} ${t}` : t)),
  });

  useEffect(
    () => () => {
      abortRef.current?.abort();
      speakingVoice.stop();
    },
    []
  );

  useEffect(() => {
    logRef.current?.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [turns]);

  const speak = (text: string) => {
    if (autoSpeak) speakingVoice.play(text).catch(() => {});
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
    speakingVoice.stop();
    setScenario(null);
    setTurns([]);
    setFeedback(null);
  };

  const call = async (system: string, history: Turn[], json = false) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    return generate({ config: config!, system, turns: history, json, signal: ctrl.signal });
  };

  const send = async () => {
    const text = draft.trim();
    if (!text || !scenario || !config || busy) return;
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
    if (!scenario || !config) return;
    capture.stop();
    speakingVoice.stop();
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
    return (
      <div className={styles.stack}>
        <GeminiKeyPanel purpose="Hội thoại nhập vai" />
        <VoicePicker />
        <ul className={styles.setGrid}>
          {SCENARIOS.map((s) => (
            <li key={s.id}>
              <button type="button" className={styles.setCard} onClick={() => begin(s)} disabled={!config}>
                <span className={styles.setSource}>{s.level}</span>
                <span className={styles.setTitle}>{s.title}</span>
                <span className={styles.setCount}>{s.goal}</span>
              </button>
            </li>
          ))}
        </ul>
        {!config && <p className={styles.muted}>Nhập API key ở trên để bắt đầu một tình huống.</p>}
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
                    <AudioButton player={speakingVoice} text={c.better} size="sm" variant="subtle" aria-label={`Nghe: ${c.better}`} />
                  </p>
                  <p className={styles.muted}>{c.explanation}</p>
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
                  <SaveToDeckButton front={p.phrase} back={p.meaning} label="Lưu" />
                </li>
              ))}
            </ul>
          </>
        )}

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
                <AudioButton player={speakingVoice} text={t.text} size="sm" variant="ghost" aria-label="Nghe lại câu này" />
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
