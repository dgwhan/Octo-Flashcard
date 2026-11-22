"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Checkbox, SuckerRow } from "@/src/components/ui";
import { grammarService } from "@/src/features/grammar/api/grammar.api";
import type { GrammarTopicSummary, UserGrammarProgress } from "@/src/features/grammar/types";
import { ROADMAP_STAGES } from "../data/roadmap.data";
import { manualDoneStore, parseManualDone, roadmapState } from "../lib/roadmap";
import styles from "./RoadmapPage.module.css";

export default function RoadmapPage({ grammarTopics }: { grammarTopics: GrammarTopicSummary[] }) {
  const rawDone = useSyncExternalStore(
    manualDoneStore.subscribe,
    manualDoneStore.getSnapshot,
    manualDoneStore.getServerSnapshot
  );
  const manualDone = useMemo(() => parseManualDone(rawDone), [rawDone]);
  const [grammarProgress, setGrammarProgress] = useState<Record<string, UserGrammarProgress>>({});

  useEffect(() => {
    let alive = true;
    grammarService
      .getRoadmapProgress(grammarTopics.map((t) => t.id))
      .then((r) => alive && setGrammarProgress(r.progressMap))
      .catch((err) => console.error("[RoadmapPage] Grammar progress load failed:", err));
    return () => {
      alive = false;
    };
  }, [grammarTopics]);

  const { byStage, next, doneCount, total } = useMemo(
    () => roadmapState(ROADMAP_STAGES, { manualDone, grammarTopics, grammarProgress }),
    [manualDone, grammarTopics, grammarProgress]
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Lộ trình học</p>
          <h1 className={styles.title}>
            Từ A1 đến C1,
            <br />
            <em>năm</em> chặng.
          </h1>
          <p className={styles.lead}>
            Mỗi chặng gom phát âm, từ vựng, ngữ pháp, nghe và nói theo đúng cấp độ. Đánh dấu bước bạn đã xong; bước ngữ
            pháp tự cập nhật theo tiến độ các chủ điểm.
          </p>
        </div>

        {next ? (
          <Link href={next.state.href} className={styles.nextCard}>
            <span className={styles.nextLabel}>Bước tiếp theo · {next.stage.level}</span>
            <span className={styles.nextTitle}>{next.step.title}</span>
            <span className={styles.nextDesc}>{next.step.desc}</span>
            <span className={styles.nextCta}>
              {next.state.cta} <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ) : (
          <div className={styles.nextCard}>
            <span className={styles.nextLabel}>Hoàn thành</span>
            <span className={styles.nextTitle}>Bạn đã đi hết lộ trình!</span>
            <span className={styles.nextDesc}>Tiếp tục ôn flashcard mỗi ngày để giữ phong độ.</span>
          </div>
        )}
      </header>

      <section className={styles.progress} aria-label="Tiến độ lộ trình">
        <span className={styles.progressValue}>
          {doneCount}
          <span className={styles.progressOf}>/{total}</span>
        </span>
        <span className={styles.progressLabel}>bước đã hoàn thành</span>
        <span
          className={styles.meter}
          role="progressbar"
          aria-label="Tiến độ toàn lộ trình"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={doneCount}
        >
          <span style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }} />
        </span>
      </section>

      {ROADMAP_STAGES.map((stage, i) => {
        const states = byStage[i];
        const done = states.filter((s) => s.done).length;
        return (
          <section key={stage.level} className={styles.stage} aria-labelledby={`roadmap-${stage.level}`}>
            <div className={styles.stageHead}>
              <h2 id={`roadmap-${stage.level}`} className={styles.stageTitle}>
                <span className={styles.stageNum}>Chặng {i + 1}</span>
                {stage.name}
                <span className={styles.stageLevel}>{stage.level}</span>
              </h2>
              <span className={styles.stageProgress} aria-label={`Đã xong ${done}/${states.length} bước`}>
                <SuckerRow count={states.length} filled={done} />
                <span>
                  {done}/{states.length}
                </span>
              </span>
            </div>
            <p className={styles.goal}>{stage.goal}</p>

            <ol className={styles.steps}>
              {stage.steps.map((step, j) => {
                const st = states[j];
                return (
                  <li key={step.id} className={styles.step} data-done={st.done}>
                    <Checkbox
                      id={`roadmap-step-${step.id}`}
                      checked={st.done}
                      disabled={step.kind === "grammar"}
                      className={step.kind === "grammar" ? styles.auto : undefined}
                      onChange={() => manualDoneStore.toggle(step.id)}
                      label={step.title}
                      description={
                        st.count
                          ? `${step.desc} · ${st.count.done}/${st.count.total} chủ điểm, tự cập nhật`
                          : step.desc
                      }
                    />
                    <Link href={st.href} className={styles.stepAction}>
                      {st.cta} <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
