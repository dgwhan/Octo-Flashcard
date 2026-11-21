"use client";

import { useEffect, useRef, useState } from "react";
import { Timer, Loader2, RotateCcw, ArrowLeft, Sparkles } from "lucide-react";
import { AudioButton } from "@/src/components/ui/AudioButton";
import { logStudySession } from "@/src/lib/studyLog";
import { wordsPerMinute } from "../compare";
import { generate, parseJson } from "../gemini";
import {
  CUE_CARDS,
  PART1_TOPICS,
  LIMITS,
  SCORE_SYSTEM,
  scoreRequest,
  IeltsPart,
  IeltsAnswer,
  IeltsScore,
  CueCard,
} from "../ielts";
import { useSpeechCapture } from "../useSpeechCapture";
import GeminiKeyPanel, { useGeminiConfig } from "./GeminiKeyPanel";
import { MicButton, LiveTranscript, SpeechNotice, formatSeconds } from "./SpeechParts";
import styles from "../speaking.module.css";

interface Session {
  part: IeltsPart;
  title: string;
  questions: string[];
  card?: CueCard;
}

type Phase = "ready" | "prep" | "speaking" | "answered" | "results";

const PARTS: { part: IeltsPart; label: string; desc: string }[] = [
  { part: 1, label: "Part 1", desc: "4 câu hỏi ngắn về bản thân, mỗi câu tối đa 45 giây." },
  { part: 2, label: "Part 2", desc: "Một chủ đề: 1 phút chuẩn bị, nói tối đa 2 phút." },
  { part: 3, label: "Part 3", desc: "3 câu thảo luận mở rộng, mỗi câu tối đa 75 giây." },
];

const wpm = (a: IeltsAnswer) => wordsPerMinute(a.transcript, a.seconds);

export default function IeltsPractice() {
  const config = useGeminiConfig();
  const [part, setPart] = useState<IeltsPart>(1);
  const [session, setSession] = useState<Session | null>(null);
  const [q, setQ] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [remaining, setRemaining] = useState(0);
  const [answers, setAnswers] = useState<IeltsAnswer[]>([]);
  const [audios, setAudios] = useState<Record<number, string>>({});
  const [notes, setNotes] = useState("");
  const [score, setScore] = useState<IeltsScore | null>(null);
  const [scoring, setScoring] = useState(false);
  const [error, setError] = useState("");
  const [startedAt, setStartedAt] = useState<Date | null>(null);

  const answerIdx = useRef(0);
  const urls = useRef<string[]>([]);
  const remainingRef = useRef(0);
  const onTimeUp = useRef<() => void>(() => {});
  const setTimer = (n: number) => {
    remainingRef.current = n;
    setRemaining(n);
  };

  const capture = useSpeechCapture({
    continuous: true,
    onEnd: (transcript, seconds) => {
      const i = answerIdx.current;
      setAnswers((a) => {
        const next = [...a];
        next[i] = { question: session?.questions[i] ?? "", transcript, seconds };
        return next;
      });
      setPhase("answered");
    },
    onAudio: (url) => {
      urls.current.push(url);
      setAudios((a) => ({ ...a, [answerIdx.current]: url }));
    },
  });

  // One interval drives both countdowns; the time-up handler is refreshed every render
  useEffect(() => {
    onTimeUp.current = () => {
      if (phase === "prep") startSpeaking();
      else if (phase === "speaking") capture.stop();
    };
  });
  useEffect(() => {
    if (phase !== "prep" && phase !== "speaking") return;
    const id = setInterval(() => {
      const left = remainingRef.current - 1;
      setTimer(Math.max(0, left));
      if (left === 0) onTimeUp.current();
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => () => urls.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const limit = (s: Session) => (s.part === 1 ? LIMITS.part1 : s.part === 2 ? LIMITS.part2 : LIMITS.part3);

  const open = (s: Session) => {
    urls.current.forEach((u) => URL.revokeObjectURL(u));
    urls.current = [];
    setSession(s);
    setQ(0);
    setAnswers([]);
    setAudios({});
    setNotes("");
    setScore(null);
    setError("");
    setStartedAt(new Date());
    if (s.part === 2) {
      setTimer(LIMITS.prep);
      setPhase("prep");
    } else setPhase("ready");
  };

  function startSpeaking() {
    if (!session) return;
    answerIdx.current = q;
    setTimer(limit(session));
    setPhase("speaking");
    capture.start();
  }

  const nextQuestion = () => {
    if (!session) return;
    if (q + 1 < session.questions.length) {
      setQ(q + 1);
      setPhase("ready");
      capture.reset();
    } else {
      setPhase("results");
      if (startedAt) logStudySession("Speaking", startedAt);
    }
  };

  const runScoring = async () => {
    if (!config || !session) return;
    setScoring(true);
    setError("");
    try {
      const raw = await generate({
        config,
        system: SCORE_SYSTEM,
        turns: scoreRequest(session.part, answers.filter(Boolean), wpm),
        json: true,
        temperature: 0.3,
      });
      setScore(parseJson<IeltsScore>(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa chấm được.");
    } finally {
      setScoring(false);
    }
  };

  const leave = () => {
    capture.stop();
    setSession(null);
    setPhase("ready");
  };

  /* ---------- Pick a part and topic ---------- */
  if (!session) {
    return (
      <div className={styles.stack}>
        <div className={styles.kinds} role="group" aria-label="Phần thi">
          {PARTS.map((p) => (
            <button key={p.part} type="button" className={styles.kindBtn} aria-pressed={part === p.part} onClick={() => setPart(p.part)}>
              {p.label}
            </button>
          ))}
        </div>
        <p className={styles.muted}>{PARTS.find((p) => p.part === part)?.desc}</p>
        <ul className={styles.setGrid}>
          {part === 1
            ? PART1_TOPICS.map((t) => (
                <li key={t.id}>
                  <button type="button" className={styles.setCard} onClick={() => open({ part: 1, title: t.title, questions: t.questions })}>
                    <span className={styles.setSource}>Part 1</span>
                    <span className={styles.setTitle}>{t.title}</span>
                    <span className={styles.setCount} lang="en">
                      {t.questions[0]}
                    </span>
                  </button>
                </li>
              ))
            : CUE_CARDS.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={styles.setCard}
                    onClick={() =>
                      open(
                        part === 2
                          ? { part: 2, title: c.title, questions: [c.prompt], card: c }
                          : { part: 3, title: c.title, questions: c.discussion }
                      )
                    }
                  >
                    <span className={styles.setSource}>Part {part}</span>
                    <span className={styles.setTitle}>{c.title}</span>
                    <span className={styles.setCount} lang="en">
                      {part === 2 ? c.prompt : c.discussion[0]}
                    </span>
                  </button>
                </li>
              ))}
        </ul>
        <SpeechNotice />
      </div>
    );
  }

  /* ---------- Results ---------- */
  if (phase === "results") {
    const done = answers.filter(Boolean);
    const totalSec = done.reduce((s, a) => s + a.seconds, 0);
    const avgWpm = done.length ? Math.round(done.reduce((s, a) => s + wpm(a), 0) / done.length) : 0;
    return (
      <div className={styles.stack}>
        <section className={styles.panel} aria-labelledby="ielts-results">
          <h2 id="ielts-results" className={styles.panelTitle}>
            Part {session.part}: {session.title}
          </h2>
          <p className={styles.muted}>
            Tổng thời gian nói {formatSeconds(totalSec)} · tốc độ trung bình {avgWpm} từ/phút (người nói lưu loát thường 120–160).
          </p>
          <ol className={styles.answers}>
            {session.questions.map((question, i) => (
              <li key={i}>
                <p className={styles.question} lang="en">
                  {question}
                </p>
                {audios[i] && <audio controls src={audios[i]} />}
                <p lang="en">{answers[i]?.transcript || <span className={styles.muted}>(không có bản chép)</span>}</p>
                {answers[i] && (
                  <p className={styles.muted}>
                    {formatSeconds(answers[i].seconds)} · {wpm(answers[i])} từ/phút
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {score ? (
          <section className={styles.panel} aria-labelledby="ielts-score">
            <h2 id="ielts-score" className={styles.panelTitle}>
              Band ước lượng: {score.overall}
            </h2>
            <p className={styles.muted}>
              Đây là ước lượng của AI dựa trên bản chép lời, không phải điểm thi chính thức. Phát âm không được chấm.
            </p>
            <dl className={styles.bands}>
              {(
                [
                  ["fluency", "Fluency & Coherence"],
                  ["lexical", "Lexical Resource"],
                  ["grammar", "Grammatical Range & Accuracy"],
                ] as const
              ).map(([k, label]) => (
                <div key={k}>
                  <dt>
                    {label} <strong>{score.criteria?.[k]?.band}</strong>
                  </dt>
                  <dd>{score.criteria?.[k]?.comment}</dd>
                </div>
              ))}
            </dl>
            {score.strengths?.length > 0 && (
              <>
                <h3 className={styles.subTitle}>Điểm mạnh</h3>
                <ul className={styles.bullets}>
                  {score.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}
            {score.improvements?.length > 0 && (
              <>
                <h3 className={styles.subTitle}>Cần cải thiện</h3>
                <ul className={styles.bullets}>
                  {score.improvements.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </>
            )}
            {score.sample?.answer && (
              <>
                <h3 className={styles.subTitle}>Câu trả lời mẫu</h3>
                <p className={styles.question} lang="en">
                  {score.sample.question}
                </p>
                <p className={styles.sample} lang="en">
                  {score.sample.answer}
                  <AudioButton text={score.sample.answer} size="sm" variant="subtle" aria-label="Nghe câu trả lời mẫu" />
                </p>
              </>
            )}
          </section>
        ) : config ? (
          <div className={styles.row}>
            <button type="button" className={styles.primaryBtn} onClick={runScoring} disabled={scoring || !done.length}>
              {scoring ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Sparkles size={15} aria-hidden="true" />}
              {scoring ? "Đang chấm…" : "Chấm band bằng AI"}
            </button>
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
          </div>
        ) : (
          <GeminiKeyPanel purpose="Chấm band IELTS" />
        )}

        <div className={styles.row}>
          <button type="button" className={styles.secondaryBtn} onClick={() => open(session)}>
            <RotateCcw size={15} aria-hidden="true" /> Làm lại đề này
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={leave}>
            Chọn đề khác
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Answering ---------- */
  const answer = answers[q];
  return (
    <div className={styles.stack}>
      <button type="button" className={styles.back} onClick={leave}>
        <ArrowLeft size={15} aria-hidden="true" /> Chọn đề khác
      </button>
      <section className={styles.panel} aria-label={`IELTS Part ${session.part}`}>
        <div className={styles.drillMeta}>
          <span>
            Part {session.part} · {session.title}
          </span>
          <span className={styles.count}>
            Câu {q + 1}/{session.questions.length}
          </span>
        </div>

        <p className={styles.target} lang="en">
          {session.questions[q]}
        </p>
        {session.card && (
          <ul className={styles.bullets} lang="en">
            <li className={styles.muted}>You should say:</li>
            {session.card.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}

        {(phase === "prep" || phase === "speaking") && (
          <p className={styles.timer} data-phase={phase} role="timer" aria-live="off">
            <Timer size={18} aria-hidden="true" />
            {phase === "prep" ? "Chuẩn bị" : "Đang nói"} {formatSeconds(remaining)}
          </p>
        )}

        {phase === "prep" && (
          <>
            <label className={styles.field}>
              <span>Ghi chú nhanh (không bắt buộc)</span>
              <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} lang="en" />
            </label>
            <button type="button" className={styles.primaryBtn} onClick={startSpeaking}>
              Bỏ qua chuẩn bị, nói ngay
            </button>
          </>
        )}
        {phase === "speaking" && session.card && notes && <p className={styles.tip}>Ghi chú: {notes}</p>}
        {phase === "speaking" && session.part === 2 && <p className={styles.muted}>Cố nói ít nhất 1 phút.</p>}

        {(phase === "ready" || phase === "speaking") && (
          <MicButton
            listening={capture.listening}
            onStart={startSpeaking}
            onStop={capture.stop}
            label={phase === "ready" ? "Bắt đầu trả lời" : "Nói"}
          />
        )}
        <LiveTranscript transcript={capture.listening ? capture.transcript : ""} interim={capture.interim} />
        {capture.error && (
          <p className={styles.error} role="alert">
            {capture.error}
          </p>
        )}

        {phase === "answered" && (
          <>
            {audios[q] && <audio controls src={audios[q]} />}
            <p lang="en">{answer?.transcript || <span className={styles.muted}>(không nhận dạng được lời nói)</span>}</p>
            {answer && (
              <p className={styles.muted}>
                {formatSeconds(answer.seconds)} · {wpm(answer)} từ/phút
              </p>
            )}
            <div className={styles.row}>
              <button type="button" className={styles.secondaryBtn} onClick={startSpeaking}>
                <RotateCcw size={15} aria-hidden="true" /> Trả lời lại
              </button>
              <button type="button" className={styles.primaryBtn} onClick={nextQuestion}>
                {q + 1 < session.questions.length ? "Câu tiếp theo" : "Xem kết quả"}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
