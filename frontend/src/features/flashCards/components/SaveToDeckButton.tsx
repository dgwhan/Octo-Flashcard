"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { PlusCircle, Check, Loader2, AlertCircle } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { getAuthToken } from "@/src/lib/api";
import { flashCardApi } from "../api/flashCard.api";
import { saveToDefaultDeck, SAVED_DECK_TITLE } from "../savedDeck";
import styles from "./SaveToDeckButton.module.css";

interface SaveToDeckButtonProps {
  front: string;
  back: string;
  label?: string;
}

type Status = "idle" | "saving" | "saved" | "duplicate" | "error";

const noopSubscribe = () => () => {};

/** One-tap "save to my deck", shared by every module. Logged-out users get the create page, pre-filled. */
export default function SaveToDeckButton({ front, back, label = "Lưu vào bộ thẻ" }: SaveToDeckButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // server snapshot assumes signed-in so SSR and hydration agree; the client then swaps in the real value
  const signedIn = useSyncExternalStore(noopSubscribe, () => !!getAuthToken(), () => true);

  if (!signedIn) {
    return (
      <Link
        href={`${ROUTES.FLASHCARDS_CREATE}?front=${encodeURIComponent(front)}&back=${encodeURIComponent(back)}`}
        className={styles.btn}
      >
        <PlusCircle size={15} aria-hidden="true" />
        {label}
      </Link>
    );
  }

  const save = async () => {
    setStatus("saving");
    try {
      const result = await saveToDefaultDeck({ question: front, answer: back }, flashCardApi);
      setStatus(result === "duplicate" ? "duplicate" : "saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không lưu được thẻ.");
      setStatus("error");
    }
  };

  const done = status === "saved" || status === "duplicate";
  return (
    <span className={styles.wrap}>
      <button type="button" className={styles.btn} onClick={save} disabled={status === "saving" || done} data-state={status}>
        {status === "saving" ? (
          <Loader2 size={15} className="animate-spin" aria-hidden="true" />
        ) : done ? (
          <Check size={15} aria-hidden="true" />
        ) : (
          <PlusCircle size={15} aria-hidden="true" />
        )}
        {status === "saved" ? "Đã lưu" : status === "duplicate" ? "Đã có trong bộ" : label}
      </button>
      <span className={styles.status} role="status" aria-live="polite">
        {status === "saved" && <>Đã thêm vào bộ “{SAVED_DECK_TITLE}”.</>}
        {status === "error" && (
          <>
            <AlertCircle size={13} aria-hidden="true" /> {error}
          </>
        )}
      </span>
    </span>
  );
}
