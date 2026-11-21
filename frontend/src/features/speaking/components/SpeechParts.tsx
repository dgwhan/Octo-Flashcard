"use client";

import Link from "next/link";
import { Mic, Square, Info } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import type { SpeechCheck } from "../lib/compare";
import { tipsFor } from "../lib/compare";
import { useSpeechSupport } from "../hooks/useSpeechCapture";
import styles from "../speaking.module.css";

export function MicButton({
  listening,
  onStart,
  onStop,
  disabled,
  label = "Bấm để nói",
  compact,
}: {
  listening: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
  label?: string;
  /** Icon only; the label stays for screen readers */
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      className={styles.mic}
      data-listening={listening}
      onClick={listening ? onStop : onStart}
      disabled={disabled}
      aria-pressed={listening}
    >
      <span className={styles.micIcon} aria-hidden="true">
        {listening ? <Square size={18} /> : <Mic size={22} />}
      </span>
      <span className={compact ? styles.srOnly : undefined}>{listening ? "Dừng" : label}</span>
    </button>
  );
}

/** Live transcript while speaking. */
export function LiveTranscript({ transcript, interim }: { transcript: string; interim: string }) {
  if (!transcript && !interim) return null;
  return (
    <p className={styles.live} aria-live="polite">
      {transcript} <span className={styles.interim}>{interim}</span>
    </p>
  );
}

/** Target sentence with each word marked heard / missed, plus score and tips. */
export function SpeechResult({ check, heard }: { check: SpeechCheck; heard: string }) {
  const tips = check.missed.flatMap((w) => tipsFor(w).map((t) => ({ word: w, ...t }))).slice(0, 3);
  return (
    <div className={styles.result}>
      <div className={styles.scoreRow}>
        <span className={styles.score} data-band={check.score >= 85 ? "high" : check.score >= 60 ? "mid" : "low"}>
          {check.score}%
        </span>
        <span className={styles.scoreLabel}>
          {check.score >= 85 ? "Rất tốt" : check.score >= 60 ? "Khá, luyện thêm vài từ" : "Nghe lại mẫu rồi thử lần nữa"}
        </span>
      </div>
      <p className={styles.diff} lang="en">
        {check.words.map((w, i) => (
          <span key={i} className={w.counted && !w.ok ? styles.miss : styles.hit}>
            {w.text}{" "}
          </span>
        ))}
      </p>
      <p className={styles.heard}>
        Máy nghe được: <span lang="en">{heard || "(không nghe rõ)"}</span>
      </p>
      {tips.length > 0 && (
        <ul className={styles.tips}>
          {tips.map((t) => (
            <li key={`${t.word}-${t.sound}`}>
              <strong lang="en">{t.word}</strong> · {t.sound}: {t.text}
            </li>
          ))}
          <li>
            <Link href={ROUTES.IPA}>Xem cách đặt lưỡi, môi trên bảng IPA</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

/** Browser support + where the audio goes. */
export function SpeechNotice() {
  const support = useSpeechSupport();
  return (
    <p className={styles.notice} data-warn={!support.recognition}>
      <Info size={15} aria-hidden="true" />
      {support.recognition ? (
        <span>
          Nhận dạng giọng nói do trình duyệt xử lý (Chrome, Edge gửi âm thanh tới máy chủ Google). Bản ghi âm của bạn chỉ
          nằm trên máy, không tải lên Octo.
        </span>
      ) : (
        <span>
          Trình duyệt này chưa hỗ trợ nhận dạng giọng nói, nên bạn vẫn ghi âm và nghe lại được nhưng không được chấm. Dùng
          Chrome hoặc Edge để được chấm từng từ.
        </span>
      )}
    </p>
  );
}

export function formatSeconds(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.max(0, s % 60)).padStart(2, "0")}`;
}
