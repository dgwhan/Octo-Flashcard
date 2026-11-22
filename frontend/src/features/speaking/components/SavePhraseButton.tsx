"use client";

import { useState } from "react";
import Link from "next/link";
import { BookmarkPlus, Check, Loader2, AlertCircle } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { useSignedIn } from "@/src/features/auth/hooks/useCurrentUser";
import { phrasebookApi, NewSavedPhrase } from "../lib/phrasebook";
// Same look as the flashcard save button, so the two actions read as siblings
import styles from "@/src/features/flashcards/components/SaveToDeckButton.module.css";

type Status = "idle" | "saving" | "saved" | "duplicate" | "error";

/** Saves a phrase or corrected sentence to the speaking phrasebook (not to flashcards). */
export default function SavePhraseButton({ phrase, label = "Lưu vào sổ tay" }: { phrase: NewSavedPhrase; label?: string }) {
  const signedIn = useSignedIn();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  if (signedIn === false) {
    return (
      <Link href={ROUTES.AUTH.LOGIN} className={styles.btn}>
        <BookmarkPlus size={15} aria-hidden="true" />
        Đăng nhập để lưu
      </Link>
    );
  }

  const save = async () => {
    setStatus("saving");
    try {
      const { duplicate } = await phrasebookApi.save(phrase);
      setStatus(duplicate ? "duplicate" : "saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không lưu được.");
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
          <BookmarkPlus size={15} aria-hidden="true" />
        )}
        {status === "saved" ? "Đã lưu" : status === "duplicate" ? "Đã có trong sổ tay" : label}
      </button>
      <span className={styles.status} role="status" aria-live="polite">
        {status === "error" && (
          <>
            <AlertCircle size={13} aria-hidden="true" /> {error}
          </>
        )}
      </span>
    </span>
  );
}
