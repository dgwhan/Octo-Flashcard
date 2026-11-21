"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, Loader2, ExternalLink, ShieldCheck } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { useUserSettings, saveGeminiKey, removeGeminiKey, updateUserSettings } from "@/src/lib/userSettings";
import styles from "../settings.module.css";

const DEFAULT_MODEL = "gemini-3.1-flash-lite";

/** Add, replace or remove the account's Gemini key. The key goes to our server once and never comes back. */
export default function GeminiKeySettings() {
  const { status, settings } = useUserSettings();
  const [editing, setEditing] = useState(false);
  const [key, setKey] = useState("");
  const [model, setModel] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  if (status === "anonymous") {
    return (
      <p className={styles.muted}>
        <Link href={`${ROUTES.AUTH.LOGIN}?redirect=${ROUTES.SETTINGS}`} className={styles.linkBtn}>
          Đăng nhập
        </Link>{" "}
        để thêm API key. Key được lưu mã hoá theo tài khoản, dùng được trên mọi thiết bị.
      </p>
    );
  }

  const run = async (action: () => Promise<void>, done: string) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
      setNotice(done);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không lưu được.");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;
    const ok = await run(() => saveGeminiKey(key, model || undefined), "Đã kiểm tra và lưu API key.");
    if (ok) {
      setKey("");
      setEditing(false);
    }
  };

  const remove = () => {
    if (!window.confirm("Xoá API key khỏi tài khoản? Hội thoại AI, chấm IELTS và giọng Gemini sẽ ngừng hoạt động.")) return;
    run(removeGeminiKey, "Đã xoá API key.");
  };

  const saveModel = (e: React.FormEvent) => {
    e.preventDefault();
    run(() => updateUserSettings({ geminiModel: model.trim() }), "Đã lưu model.");
  };

  return (
    <div className={styles.stack}>
      <p className={styles.secure}>
        <ShieldCheck size={16} aria-hidden="true" />
        Key được mã hoá và lưu trên máy chủ theo tài khoản của bạn. Trình duyệt không giữ key và máy chủ không bao giờ gửi
        lại toàn bộ key.
      </p>

      {settings.hasGeminiKey && !editing ? (
        <div className={styles.keyRow}>
          <KeyRound size={16} aria-hidden="true" />
          <span>
            Đang dùng key <code>{settings.geminiKeyHint}</code> · model {settings.geminiModel}
          </span>
          <button type="button" className={styles.linkBtn} onClick={() => setEditing(true)} disabled={busy}>
            Thay key
          </button>
          <button type="button" className={styles.linkBtn} onClick={remove} disabled={busy}>
            Xoá key
          </button>
        </div>
      ) : (
        <form className={styles.stack} onSubmit={submit}>
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
          <label className={styles.field}>
            <span>Model (để trống dùng {DEFAULT_MODEL})</span>
            <input value={model} onChange={(e) => setModel(e.target.value)} spellCheck={false} placeholder={DEFAULT_MODEL} />
          </label>
          <div className={styles.row}>
            <button type="submit" className={styles.primaryBtn} disabled={busy || !key.trim()}>
              {busy && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
              {busy ? "Đang kiểm tra…" : "Kiểm tra và lưu"}
            </button>
            {settings.hasGeminiKey && (
              <button type="button" className={styles.linkBtn} onClick={() => setEditing(false)}>
                Huỷ
              </button>
            )}
          </div>
        </form>
      )}

      {settings.hasGeminiKey && !editing && (
        <form className={styles.inline} onSubmit={saveModel}>
          <label className={styles.field}>
            <span>Đổi model</span>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              spellCheck={false}
              placeholder={settings.geminiModel || DEFAULT_MODEL}
            />
          </label>
          <button type="submit" className={styles.secondaryBtn} disabled={busy || !model.trim()}>
            Lưu model
          </button>
        </form>
      )}

      <p className={styles.status} role="status" aria-live="polite">
        {error ? <span className={styles.error}>{error}</span> : notice}
      </p>
    </div>
  );
}
