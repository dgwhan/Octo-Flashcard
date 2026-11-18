"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, Clock, RotateCcw, Check } from "lucide-react";
import type { GrammarTopicSummary, UserGrammarProgress, GrammarRoadmapStats, GrammarCEFR } from "../grammar.types";
import { grammarService } from "../grammar.service";
import { Badge, SuckerRow } from "@/src/components/ui";
import type { BadgeVariant } from "@/src/components/ui";
import styles from "./GrammarRoadmapHub.module.css";

// One stage per CEFR level; each stage is one of Octo's tentacles.
const STAGES: { id: 1 | 2 | 3 | 4 | 5; level: GrammarCEFR; name: string }[] = [
  { id: 1, level: "A1", name: "Khởi đầu" },
  { id: 2, level: "A2", name: "Sơ cấp" },
  { id: 3, level: "B1", name: "Trung cấp" },
  { id: 4, level: "B2", name: "Trung cao" },
  { id: 5, level: "C1", name: "Nâng cao" },
];

const pad = (n: number) => String(n).padStart(2, "0");

interface GrammarRoadmapHubProps {
  /** Light list from the server page: keeps theory/exercises out of the client bundle. */
  topics: GrammarTopicSummary[];
}

export default function GrammarRoadmapHub({ topics }: GrammarRoadmapHubProps) {
  const orderedIds = useMemo(() => topics.map((t) => t.id), [topics]);
  const [selectedStage, setSelectedStage] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [progressMap, setProgressMap] = useState<Record<string, UserGrammarProgress>>({});
  const [stats, setStats] = useState<GrammarRoadmapStats>({
    totalTopicsCount: topics.length,
    completedTopicsCount: 0,
    inProgressTopicsCount: 0,
    completionPercentage: 0,
    averagePracticeScore: 0,
    averageMasteryScore: 0,
    nextRecommendedTopicId: topics[0]?.id ?? null,
  });

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await grammarService.getRoadmapProgress(orderedIds);
        if (isMounted) {
          setProgressMap(data.progressMap);
          setStats(data.stats);
        }
      } catch (err) {
        console.error("[GrammarRoadmapHub] Load error:", err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [orderedIds]);

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return topics.filter((topic) => {
      if (selectedStage !== "all" && topic.stage !== selectedStage) return false;
      if (!q) return true;
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.vietnameseTitle.toLowerCase().includes(q) ||
        topic.description.toLowerCase().includes(q)
      );
    });
  }, [topics, selectedStage, searchQuery]);

  const nextTopic = topics.find((t) => t.id === stats.nextRecommendedTopicId) ?? topics[0];
  const nextStarted = progressMap[nextTopic.id]?.status === "InProgress";
  const completedCount = topics.filter((t) => progressMap[t.id]?.status === "Completed").length;

  return (
    <div className={styles.page}>
      {/* ---------- Header: title left, "next card" right ---------- */}
      <header className={styles.header}>
        <div className={styles.headText}>
          <p className={styles.eyebrow}>04 · Ngữ pháp</p>
          <h1 className={styles.title}>
            {topics.length} chủ điểm,
            <br />
            <em>năm</em> chặng.
          </h1>
          <p className={styles.lead}>
            Từ mạo từ a/an/the đến câu chẻ và bị động khách quan, xếp theo năm cấp A1–C1. Mỗi chủ điểm có lý thuyết,
            bài thực hành, bộ bài nâng cao, flashcard và một bài kiểm tra ngắn.
          </p>
        </div>

        <Link href={`/grammar/${nextTopic.id}`} className={styles.nextCard}>
          <span className={styles.nextLabel}>{nextStarted ? "Đang học dở" : "Bài nên học tiếp"}</span>
          <span className={styles.nextNum}>{pad(nextTopic.order)}</span>
          <span className={styles.nextTitle}>{nextTopic.vietnameseTitle}</span>
          <span className={styles.nextEn}>{nextTopic.title}</span>
          <span className={styles.nextCta}>
            {nextStarted ? "Tiếp tục" : "Bắt đầu"}
            <ArrowRight size={16} />
          </span>
        </Link>
      </header>

      {/* ---------- Progress ---------- */}
      <section className={styles.progress} aria-label="Tiến độ lộ trình">
        <div className={styles.progressHead}>
          <span className={styles.progressValue}>
            {completedCount}
            <span className={styles.progressOf}>/{topics.length}</span>
          </span>
          <span className={styles.progressLabel}>chủ điểm đã hoàn thành</span>
        </div>
        <dl className={styles.progressStats}>
          <div>
            <dt>Đang học</dt>
            <dd>{stats.inProgressTopicsCount}</dd>
          </div>
          <div>
            <dt>Điểm thực hành TB</dt>
            <dd>{stats.averagePracticeScore > 0 ? `${stats.averagePracticeScore}%` : "–"}</dd>
          </div>
          <div>
            <dt>Độ thuần thục TB</dt>
            <dd>{stats.averageMasteryScore > 0 ? `${stats.averageMasteryScore}%` : "–"}</dd>
          </div>
        </dl>
      </section>

      {/* ---------- Toolbar ---------- */}
      <div className={styles.toolbar}>
        <div className={styles.stageTabs} role="group" aria-label="Lọc theo cấp độ">
          <button
            type="button"
            aria-pressed={selectedStage === "all"}
            className={styles.stageTab}
            onClick={() => setSelectedStage("all")}
          >
            Tất cả
            <span className={styles.stageTabMeta}>{topics.length}</span>
          </button>
          {STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              aria-pressed={selectedStage === st.id}
              className={styles.stageTab}
              onClick={() => setSelectedStage(st.id)}
            >
              {st.level}
              <span className={styles.stageTabMeta}>{topics.filter((t) => t.stage === st.id).length}</span>
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Tìm chủ điểm ngữ pháp</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm chủ điểm…"
          />
        </label>
      </div>

      {/* ---------- Roadmap: one section per stage, each with its own tentacle of progress ---------- */}
      {STAGES.map((stage) => {
        const stageTopics = topics.filter((t) => t.stage === stage.id);
        const shown = filteredTopics.filter((t) => t.stage === stage.id);
        if (shown.length === 0) return null;
        const done = stageTopics.filter((t) => progressMap[t.id]?.status === "Completed").length;
        return (
          <section key={stage.id} className={styles.stage} aria-labelledby={`stage-${stage.id}`}>
            <div className={styles.stageHead}>
              <h2 id={`stage-${stage.id}`} className={styles.stageTitle}>
                <span className={styles.stageNum}>Chặng {stage.id}</span>
                {stage.name}
                <span className={styles.stageLevels}>{stage.level}</span>
              </h2>
              <span className={styles.stageProgress} aria-label={`Đã hoàn thành ${done}/${stageTopics.length} chủ điểm`}>
                <SuckerRow count={stageTopics.length} filled={done} />
                <span>
                  {done}/{stageTopics.length}
                </span>
              </span>
            </div>
            <ol className={styles.topicList}>
              {shown.map((topic) => (
                <TopicRow key={topic.id} topic={topic} progress={progressMap[topic.id]} />
              ))}
            </ol>
          </section>
        );
      })}

      {filteredTopics.length === 0 && (
        <div className={styles.empty}>
          <SuckerRow count={5} />
          <p className={styles.emptyTitle}>Không có chủ điểm nào khớp “{searchQuery}”.</p>
          <button
            type="button"
            className={styles.textBtn}
            onClick={() => {
              setSearchQuery("");
              setSelectedStage("all");
            }}
          >
            Xoá bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

function TopicRow({ topic, progress }: { topic: GrammarTopicSummary; progress?: UserGrammarProgress }) {
  const status = progress?.status ?? "NotStarted";
  const steps = [
    { label: "Lý thuyết", done: !!progress?.isTheoryCompleted },
    { label: "Thực hành", done: !!progress?.isPracticeCompleted },
    { label: "Ôn tập", done: !!progress?.isReviewCompleted },
  ];
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <li>
      <Link href={`/grammar/${topic.id}`} className={styles.topicRow} data-status={status}>
        <span className={styles.topicNum}>{status === "Completed" ? <Check size={28} /> : pad(topic.order)}</span>

        <span className={styles.topicBody}>
          <span className={styles.topicMeta}>
            <Badge variant={topic.level.toLowerCase() as BadgeVariant} size="sm">
              {topic.level}
            </Badge>
            <span className={styles.topicTime}>
              <Clock size={12} aria-hidden="true" /> {topic.estimatedMinutes} phút
            </span>
          </span>
          <span className={styles.topicTitle}>{topic.vietnameseTitle}</span>
          <span className={styles.topicEn}>{topic.title}</span>
          <span className={styles.topicDesc}>{topic.description}</span>
        </span>

        <span className={styles.topicSide}>
          <span
            className={styles.steps}
            aria-label={`Đã xong ${doneCount}/3 bước: ${steps.map((s) => `${s.label} ${s.done ? "xong" : "chưa"}`).join(", ")}`}
          >
            <SuckerRow count={3} filled={doneCount} />
            <span className={styles.stepsText}>
              {status === "Completed"
                ? `Thuần thục ${progress?.masteryScore ?? 0}%`
                : status === "InProgress"
                  ? `${doneCount}/3 bước`
                  : "Chưa bắt đầu"}
            </span>
          </span>
          <span className={styles.topicAction}>
            {status === "Completed" ? (
              <>
                <RotateCcw size={15} /> Ôn lại
              </>
            ) : (
              <>
                {status === "InProgress" ? "Tiếp tục" : "Bắt đầu"} <ArrowRight size={15} />
              </>
            )}
          </span>
        </span>
      </Link>
    </li>
  );
}
