"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { KeyRound, Loader2, ExternalLink } from "lucide-react";
import {
  CONFIG_EVENT,
  DEFAULT_MODEL,
  GeminiConfig,
  clearConfig,
  loadConfig,
  maskKey,
  saveConfig,
  testConfig,
} from "../lib/gemini";
import styles from "../speaking.module.css";

const subscribe = (cb: () => void) => {
  window.addEventListener(CONFIG_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONFIG_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const snapshot = () => {
  const c = loadConfig();
  return c ? JSON.stringify(c) : "";
};

/** The saved Gemini key/model, or null. Updates live when the key panel saves or clears. */
export function useGeminiConfig(): GeminiConfig | null {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  return useMemo(() => (raw ? (JSON.parse(raw) as GeminiConfig) : null), [raw]);
}

export default function GeminiKeyPanel({ purpose }: { purpose: string }) {
  const config = useGeminiConfig();
  const [editing, setEditing] = useState(false);
  const [key, setKey] = useState("");
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (config && !editing) {
    return (
      <div className={styles.keyBar}>
        <KeyRound size={16} aria-hidden="true" />
        <span>
          Đang dùng key <code>{maskKey(config.key)}</code> · {config.model} ·{" "}
          {config.remembered ? "lưu trên trình duyệt này" : "chỉ trong phiên này"}
        </span>
        <button type="button" className={styles.linkBtn} onClick={() => setEditing(true)}>
          Đổi key
        </button>
        <button type="button" className={styles.linkBtn} onClick={clearConfig}>
          Xóa key
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;
    setBusy(true);
    setError("");
    try {
      await testConfig({ key: key.trim(), model: model.trim() || DEFAULT_MODEL });
      saveConfig({ key: key.trim(), model: model.trim() || DEFAULT_MODEL, remembered: remember });
      setKey("");
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không kiểm tra được key.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={styles.keyForm} onSubmit={submit}>
      <h2 className={styles.panelTitle}>Dùng API key Gemini của bạn</h2>
      <p className={styles.muted}>
        {purpose} cần gọi AI. Bạn dùng key Gemini của chính mình: trình duyệt gửi thẳng tới Google, máy chủ Octo không nhận
        và không lưu key. Gói miễn phí của Google AI Studio đủ cho việc luyện tập hằng ngày.
      </p>
      <a className={styles.extLink} href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
        Lấy key miễn phí tại Google AI Studio <ExternalLink size={13} aria-hidden="true" />
      </a>

      <label className={styles.field}>
        <span>Gemini API key</span>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="AIza…"
          required
        />
      </label>
      <details className={styles.advanced}>
        <summary>Tùy chọn nâng cao</summary>
        <label className={styles.field}>
          <span>Model</span>
          <input value={model} onChange={(e) => setModel(e.target.value)} spellCheck={false} />
        </label>
      </details>
      <label className={styles.check}>
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        Ghi nhớ trên trình duyệt này (đừng chọn nếu dùng máy chung)
      </label>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.row}>
        <button type="submit" className={styles.primaryBtn} disabled={busy || !key.trim()}>
          {busy && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
          {busy ? "Đang kiểm tra…" : "Kiểm tra và dùng key"}
        </button>
        {config && (
          <button type="button" className={styles.linkBtn} onClick={() => setEditing(false)}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
