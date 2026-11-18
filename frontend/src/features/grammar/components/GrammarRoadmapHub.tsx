"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, Clock, RotateCcw, Check } from "lucide-react";
import { GRAMMAR_ROADMAP_TOPICS } from "../grammar.data";
import { GrammarTopic, UserGrammarProgress, GrammarRoadmapStats } from "../grammar.types";
import { grammarService } from "../grammar.service";
import { Badge, SuckerRow } from "@/src/components/ui";
import type { BadgeVariant } from "@/src/components/ui";
import styles from "./GrammarRoadmapHub.module.css";

const STAGES = [
  { id: 1 as const, name: "Nền tảng", levels: "A1 – A2" },
  { id: 2 as const, name: "Trung cấp", levels: "B1" },
  { id: 3 as const, name: "Nâng cao", levels: "B2 – C1" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function GrammarRoadmapHub() {
  const [selectedStage, setSelectedStage] = useState<1 | 2 | 3 | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [progressMap, setProgressMap] = useState<Record<string, UserGrammarProgress>>({});
  const [stats, setStats] = useState<GrammarRoadmapStats>({
    totalTopicsCount: GRAMMAR_ROADMAP_TOPICS.length,
    completedTopicsCount: 0,
    inProgressTopicsCount: 0,
    completionPercentage: 0,
    averagePracticeScore: 0,
    averageMasteryScore: 0,
    nextRecommendedTopicId: GRAMMAR_ROADMAP_TOPICS[0].id,
  });

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await grammarService.getRoadmapProgress();
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
  }, []);

  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GRAMMAR_ROADMAP_TOPICS.filter((topic) => {
      if (selectedStage !== "all" && topic.stage !== selectedStage) return false;
      if (!q) return true;
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.vietnameseTitle.toLowerCase().includes(q) ||
        topic.description.toLowerCase().includes(q)
      );
    });
  }, [selectedStage, searchQuery]);

  const nextTopic = useMemo(
    () =>
      GRAMMAR_ROADMAP_TOPICS.find((t) => t.id === stats.nextRecommendedTopicId) ?? GRAMMAR_ROADMAP_TOPICS[0],
    [stats.nextRecommendedTopicId]
  );
  const nextStarted = progressMap[nextTopic.id]?.status === "InProgress";

  return (
    <div className={styles.page}>
      {/* ---------- Header: title left, "next card" right ---------- */}
      <header className={styles.header}>
        <div className={styles.headText}>
          <p className={styles.eyebrow}>04 · Ngữ pháp</p>
          <h1 className={styles.title}>
            Mười lăm chủ điểm,
            <br />
            <em>ba</em> chặng.
          </h1>
          <p className={styles.lead}>
            Đi từ thì hiện tại đơn tới câu đảo ngữ. Mỗi chủ điểm có ba bước: đọc lý thuyết, làm bài thực hành, rồi ôn
            bằng flashcard và một bài kiểm tra ngắn.
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

      {/* ---------- Progress: one sucker per topic ---------- */}
      <section className={styles.progress} aria-label="Tiến độ lộ trình">
        <div className={styles.progressHead}>
          <span className={styles.progressValue}>
            {stats.completedTopicsCount}
            <span className={styles.progressOf}>/{stats.totalTopicsCount}</span>
          </span>
          <span className={styles.progressLabel}>chủ điểm đã hoàn thành</span>
        </div>
        <SuckerRow
          count={stats.totalTopicsCount}
          filled={stats.completedTopicsCount}
          className={styles.progressSuckers}
        />
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
        <div className={styles.stageTabs} role="group" aria-label="Lọc theo chặng">
          {[{ id: "all" as const, name: "Tất cả", levels: "15" }, ...STAGES].map((st) => (
            <button
              key={st.id}
              type="button"
              aria-pressed={selectedStage === st.id}
              className={styles.stageTab}
              onClick={() => setSelectedStage(st.id)}
            >
              {st.name}
              <span className={styles.stageTabMeta}>{st.levels}</span>
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

      {/* ---------- Roadmap: grouped by stage ---------- */}
      {STAGES.map((stage) => {
        const topics = filteredTopics.filter((t) => t.stage === stage.id);
        if (topics.length === 0) return null;
        return (
          <section key={stage.id} className={styles.stage} aria-labelledby={`stage-${stage.id}`}>
            <h2 id={`stage-${stage.id}`} className={styles.stageTitle}>
              <span className={styles.stageNum}>Chặng {stage.id}</span>
              {stage.name}
              <span className={styles.stageLevels}>{stage.levels}</span>
            </h2>
            <ol className={styles.topicList}>
              {topics.map((topic) => (
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

function TopicRow({ topic, progress }: { topic: GrammarTopic; progress?: UserGrammarProgress }) {
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
