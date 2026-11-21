"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { AudioButton } from "@/src/components/ui/AudioButton";
import SaveToDeckButton from "@/src/features/flashcards/components/SaveToDeckButton";
import { PHRASES, PHRASE_GROUPS, PHRASE_LEVELS } from "../data";
import { splitExample, plainExample, foldText } from "../lib/text";
import type { PhraseKind, PhraseLevel } from "../types";
import styles from "./PhrasesPage.module.css";

const PAGE = 24;
const KINDS: { value: PhraseKind | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "collocation", label: "Collocations" },
  { value: "idiom", label: "Idioms" },
];
const GROUP_LABEL = Object.fromEntries(PHRASE_GROUPS.map((g) => [g.id, g.label]));
const SEARCH_INDEX = PHRASES.map((p) => foldText(`${p.phrase} ${p.meaning} ${plainExample(p.example)}`));
const countBy = (kind: PhraseKind | "all") => (kind === "all" ? PHRASES.length : PHRASES.filter((p) => p.kind === kind).length);

export default function PhrasesPage() {
  const [kind, setKind] = useState<PhraseKind | "all">("all");
  const [group, setGroup] = useState("all");
  const [level, setLevel] = useState<PhraseLevel | "all">("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);

  const results = useMemo(() => {
    const q = foldText(query.trim());
    return PHRASES.filter(
      (p, i) =>
        (kind === "all" || p.kind === kind) &&
        (group === "all" || p.group === group) &&
        (level === "all" || p.level === level) &&
        (!q || SEARCH_INDEX[i].includes(q))
    );
  }, [kind, group, level, query]);

  // Any filter change starts the list from the top again
  const refilter = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setVisible(PAGE);
  };
  const pickKind = refilter((k: PhraseKind | "all") => {
    setKind(k);
    setGroup("all");
  });
  const pickGroup = refilter(setGroup);
  const pickLevel = refilter(setLevel);
  const search = refilter(setQuery);
  const filtered = kind !== "all" || group !== "all" || level !== "all" || query !== "";

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => search(e.target.value)}
            aria-label="Tìm cụm từ, nghĩa tiếng Việt hoặc câu ví dụ"
            placeholder="Tìm: make a decision, quyết định, rain…"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.kinds} role="group" aria-label="Loại">
          {KINDS.map((k) => (
            <button
              key={k.value}
              type="button"
              className={styles.kindBtn}
              aria-pressed={kind === k.value}
              onClick={() => pickKind(k.value)}
            >
              {k.label} <span className={styles.kindCount}>{countBy(k.value)}</span>
            </button>
          ))}
        </div>

        {kind !== "all" && (
          <div className={styles.chips} role="group" aria-label={kind === "idiom" ? "Chủ đề" : "Mẫu kết hợp"}>
            <button type="button" className={styles.chip} aria-pressed={group === "all"} onClick={() => pickGroup("all")}>
              Tất cả nhóm
            </button>
            {PHRASE_GROUPS.filter((g) => g.kind === kind).map((g) => (
              <button
                key={g.id}
                type="button"
                className={styles.chip}
                aria-pressed={group === g.id}
                onClick={() => pickGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.chips} role="group" aria-label="Cấp độ CEFR">
          <button type="button" className={styles.chip} aria-pressed={level === "all"} onClick={() => pickLevel("all")}>
            Mọi cấp độ
          </button>
          {PHRASE_LEVELS.map((l) => (
            <button key={l} type="button" className={styles.chip} aria-pressed={level === l} onClick={() => pickLevel(l)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.summary}>
        <p role="status" aria-live="polite">
          {results.length} cụm từ{filtered ? " phù hợp" : ""}
        </p>
        {filtered && (
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              pickKind("all");
              setLevel("all");
              setQuery("");
            }}
          >
            <X size={14} aria-hidden="true" /> Bỏ lọc
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>Không có cụm từ nào khớp. Thử từ khóa ngắn hơn hoặc bỏ bớt bộ lọc.</p>
      ) : (
        <ul className={styles.list}>
          {results.slice(0, visible).map((p) => {
            const plain = plainExample(p.example);
            return (
              <li key={p.id} className={styles.item}>
                <div className={styles.itemHead}>
                  <h2 className={styles.phrase} lang="en">
                    {p.phrase}
                  </h2>
                  <span className={styles.tags}>
                    <span className={styles.tag} data-kind={p.kind}>
                      {p.kind === "idiom" ? "Idiom" : "Collocation"}
                    </span>
                    <span className={styles.tag}>{p.level}</span>
                  </span>
                </div>
                <p className={styles.meaning}>{p.meaning}</p>
                <p className={styles.example} lang="en">
                  {splitExample(p.example).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}
                </p>
                <p className={styles.exampleVi}>{p.exampleVi}</p>
                <div className={styles.actions}>
                  <span className={styles.group}>{GROUP_LABEL[p.group]}</span>
                  <AudioButton text={plain} size="sm" variant="subtle" aria-label={`Nghe câu ví dụ: ${plain}`} />
                  <SaveToDeckButton front={p.phrase} back={`${p.meaning}\n\n${plain}`} label="Lưu thẻ" />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {visible < results.length && (
        <button type="button" className={styles.more} onClick={() => setVisible((v) => v + PAGE)}>
          Xem thêm {Math.min(PAGE, results.length - visible)} cụm từ
          <span className={styles.moreCount}>
            {visible}/{results.length}
          </span>
        </button>
      )}
    </div>
  );
}
