"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { AudioButton } from "@/src/components/ui/AudioButton";
import { voicePlayer } from "@/src/lib/voice/voice";
import { useSignedIn } from "@/src/features/auth/hooks/useCurrentUser";
import SaveToDeckButton from "@/src/features/flashcards/components/SaveToDeckButton";
import { groupByTopic, phrasebookApi, SavedPhrase } from "../lib/phrasebook";
import styles from "../speaking.module.css";

/** /speaking/phrasebook: phrases and corrected sentences saved from role-play feedback, grouped by topic. */
export default function PhrasebookPage() {
  const signedIn = useSignedIn();
  const [items, setItems] = useState<SavedPhrase[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [topic, setTopic] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!signedIn) return;
    let live = true;
    phrasebookApi.list().then(
      (list) => live && setItems(list ?? []),
      (err) => live && setLoadError(err instanceof Error ? err.message : "Không tải được sổ tay.")
    );
    return () => {
      live = false;
    };
  }, [signedIn]);

  const remove = async (p: SavedPhrase) => {
    if (!window.confirm(`Xóa “${p.text}” khỏi sổ tay?`)) return;
    setActionError("");
    try {
      await phrasebookApi.remove(p.id);
      setItems((list) => list?.filter((x) => x.id !== p.id) ?? null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Không xóa được.");
    }
  };

  if (signedIn === false) {
    return (
      <section className={styles.panel}>
        <p className={styles.muted}>
          <Lock size={15} aria-hidden="true" /> Đăng nhập để xem các cụm từ và câu bạn đã lưu từ phần nhận xét hội thoại.
        </p>
        <Link href={ROUTES.AUTH.LOGIN} className={styles.primaryBtn}>
          Đăng nhập
        </Link>
      </section>
    );
  }

  if (loadError) {
    return (
      <p className={styles.error} role="alert">
        {loadError}
      </p>
    );
  }

  if (!items) return <p className={styles.muted}>Đang tải sổ tay…</p>;

  if (items.length === 0) {
    return (
      <section className={styles.panel}>
        <p>Sổ tay đang trống.</p>
        <p className={styles.muted}>
          Hoàn thành một tình huống nhập vai, rồi bấm “Lưu vào sổ tay” cạnh câu nên nói lại hoặc cụm từ nên dùng. Các câu sẽ
          được xếp theo chủ đề ở đây.
        </p>
        <Link href={ROUTES.SPEAKING_ROLEPLAY} className={styles.primaryBtn}>
          Luyện hội thoại nhập vai <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
    );
  }

  const groups = groupByTopic(items);
  const shown = topic ? groups.filter((g) => g.topic === topic) : groups;

  return (
    <div className={styles.stack}>
      <div className={styles.chips} role="group" aria-label="Lọc theo chủ đề">
        <button type="button" className={styles.chip} aria-pressed={topic === ""} onClick={() => setTopic("")}>
          Tất cả ({items.length})
        </button>
        {groups.map((g) => (
          <button key={g.topic} type="button" className={styles.chip} aria-pressed={topic === g.topic} onClick={() => setTopic(g.topic)}>
            {g.label} ({g.items.length})
          </button>
        ))}
      </div>
      {actionError && (
        <p className={styles.error} role="alert">
          {actionError}
        </p>
      )}

      {shown.map((g) => (
        <section key={g.topic} className={styles.panel} aria-labelledby={`topic-${g.topic}`}>
          <h2 id={`topic-${g.topic}`} className={styles.panelTitle}>
            {g.label}
          </h2>
          <ul className={styles.corrections}>
            {g.items.map((p) => (
              <li key={p.id}>
                <p className={styles.better} lang="en">
                  {p.text}
                  <AudioButton player={voicePlayer} text={p.text} size="sm" variant="subtle" aria-label={`Nghe: ${p.text}`} />
                </p>
                {p.meaning && <p className={styles.muted}>{p.meaning}</p>}
                <div className={styles.phraseMeta}>
                  <span>
                    {p.kind === "sentence" ? "Câu nên nói lại" : "Cụm từ"}
                    {p.scenarioTitle && <> · {p.scenarioTitle}</>}
                  </span>
                  <SaveToDeckButton front={p.text} back={p.meaning} label="Tạo flashcard" />
                  <button type="button" className={styles.linkBtn} onClick={() => remove(p)}>
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
