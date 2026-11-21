"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Award } from "lucide-react";
import { ROUTES } from "@/src/config/routes";
import { apiClient, getAuthToken } from "@/src/lib/api";
import { SuckerRow } from "@/src/components/ui";
import { flashCardApi } from "@/src/features/flashCards/api/flashCard.api";
import { dueCount } from "@/src/features/flashCards/reviewQueue";
import { grammarService } from "@/src/features/grammar/grammar.service";
import type { GrammarRoadmapStats } from "@/src/features/grammar/grammar.types";
import { buildHeatmap, heatmapStart, dayKey, HeatmapRow, HeatDay, HEATMAP_WEEKS } from "./heatmap";
import styles from "./ProgressPage.module.css";

interface Summary {
  level: number;
  expPoints: number;
  nextLevelXp: number;
  streak: number;
  dailyTargetMinutes: number;
  focusedMinutesToday: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  thresholdValue: number;
  isUnlocked: boolean;
  earnedAt?: string | null;
}

interface Data {
  summary: Summary | null;
  badges: Badge[] | null;
  heatmap: HeatDay[][] | null;
  due: number | null;
  grammar: GrammarRoadmapStats | null;
}

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const fmtDay = (k: string) => new Date(`${k}T00:00:00`).toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" });
const value = <T,>(r: PromiseSettledResult<T>) => (r.status === "fulfilled" ? r.value : null);

export default function ProgressPage({ grammarTopicIds }: { grammarTopicIds: string[] }) {
  const [phase, setPhase] = useState<"loading" | "auth" | "ready">("loading");
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (!getAuthToken()) {
      setPhase("auth");
      return;
    }
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    // Each section loads on its own so one failing API doesn't blank the page
    Promise.allSettled([
      apiClient.get<Summary>("/gamification/summary"),
      apiClient.get<Badge[]>("/gamification/badges"),
      apiClient.get<HeatmapRow[]>(
        `/focus/heatmap?startDate=${dayKey(heatmapStart(today))}&endDate=${dayKey(tomorrow)}`
      ),
      flashCardApi.getAll(),
      grammarService.getRoadmapProgress(grammarTopicIds),
    ]).then(([summary, badges, heat, sets, grammar]) => {
      const rows = value(heat);
      const deck = value(sets);
      setData({
        summary: value(summary) as Summary | null,
        badges: value(badges) as Badge[] | null,
        heatmap: Array.isArray(rows) ? buildHeatmap(rows, today) : null,
        due: deck ? dueCount(deck) : null,
        grammar: value(grammar)?.stats ?? null,
      });
      setPhase("ready");
    });
  }, [grammarTopicIds]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Tiến độ của tôi</p>
        <h1 className={styles.title}>Mỗi ngày một xúc tu</h1>
        <p className={styles.lead}>
          Chuỗi ngày học, thời gian học và huy hiệu được cộng mỗi khi bạn hoàn thành một phiên ôn flashcard hoặc một bài
          ngữ pháp.
        </p>
      </header>

      {phase === "loading" && (
        <p className={styles.state} role="status">
          <SuckerRow count={5} /> Đang tải tiến độ…
        </p>
      )}

      {phase === "auth" && (
        <div className={styles.state}>
          <Lock size={20} aria-hidden="true" />
          <p>Đăng nhập để xem chuỗi ngày học, huy hiệu và lịch ôn của bạn.</p>
          <Link href={`${ROUTES.AUTH.LOGIN}?redirect=${ROUTES.PROGRESS}`} className={styles.primaryBtn}>
            Đăng nhập
          </Link>
        </div>
      )}

      {phase === "ready" && data && <ProgressBody data={data} />}
    </div>
  );
}

function ProgressBody({ data }: { data: Data }) {
  const { summary, badges, heatmap, due, grammar } = data;
  const thisWeek = heatmap?.at(-1) ?? [];
  const daysThisWeek = thisWeek.filter((d) => d.minutes > 0).length;
  const target = summary?.dailyTargetMinutes || 0;
  const todayMin = summary?.focusedMinutesToday ?? 0;
  const targetHit = target > 0 && todayMin >= target;
  const xpPct = summary && summary.nextLevelXp > 0 ? Math.min(100, (summary.expPoints / summary.nextLevelXp) * 100) : 0;
  const activeDays = heatmap?.flat().filter((d) => d.minutes > 0).length ?? 0;
  const totalMinutes = heatmap?.flat().reduce((a, d) => a + d.minutes, 0) ?? 0;
  const unlocked = badges?.filter((b) => b.isUnlocked) ?? [];

  return (
    <>
      {/* ---------- Key numbers ---------- */}
      <section className={styles.stats} aria-label="Tổng quan">
        <div className={styles.stat}>
          <span className={styles.statValue}>{summary ? summary.streak : "–"}</span>
          <span className={styles.statLabel}>ngày học liên tiếp</span>
          <SuckerRow count={7} filled={daysThisWeek} className={styles.weekRow} />
          <span className={styles.statNote}>{daysThisWeek}/7 ngày trong tuần này</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.statValue}>
            {summary ? todayMin : "–"}
            <small> / {target || "–"} phút</small>
          </span>
          <span className={styles.statLabel}>{targetHit ? "Đã đạt mục tiêu hôm nay" : "học hôm nay"}</span>
          {target > 0 && (
            <span
              className={styles.meter}
              role="progressbar"
              aria-label="Mục tiêu hôm nay"
              aria-valuemin={0}
              aria-valuemax={target}
              aria-valuenow={Math.min(todayMin, target)}
            >
              <span className={targetHit ? styles.meterGold : ""} style={{ width: `${Math.min(100, (todayMin / target) * 100)}%` }} />
            </span>
          )}
        </div>

        <div className={styles.stat}>
          <span className={styles.statValue}>{summary ? `Cấp ${summary.level}` : "–"}</span>
          <span className={styles.statLabel}>
            {summary ? `${Math.round(summary.expPoints)} / ${Math.round(summary.nextLevelXp)} XP` : "Chưa tải được cấp độ"}
          </span>
          {summary && (
            <span
              className={styles.meter}
              role="progressbar"
              aria-label="Kinh nghiệm tới cấp tiếp theo"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(xpPct)}
            >
              <span style={{ width: `${xpPct}%` }} />
            </span>
          )}
        </div>
      </section>

      {/* ---------- Next actions ---------- */}
      <section className={styles.next} aria-label="Việc tiếp theo">
        <Link href={ROUTES.FLASHCARDS_REVIEW} className={styles.nextItem}>
          <span className={styles.nextNum}>01</span>
          <span className={styles.nextText}>
            <strong>{due === null ? "Ôn flashcard" : due > 0 ? `${due} thẻ cần ôn hôm nay` : "Không còn thẻ đến hạn"}</strong>
            <span>Lặp lại ngắt quãng FSRS</span>
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link
          href={grammar?.nextRecommendedTopicId ? ROUTES.GRAMMAR_DETAIL(grammar.nextRecommendedTopicId) : ROUTES.GRAMMAR}
          className={styles.nextItem}
        >
          <span className={styles.nextNum}>02</span>
          <span className={styles.nextText}>
            <strong>
              {grammar ? `Ngữ pháp: ${grammar.completedTopicsCount}/${grammar.totalTopicsCount} chủ điểm` : "Lộ trình ngữ pháp"}
            </strong>
            <span>{grammar?.nextRecommendedTopicId ? "Học tiếp chủ điểm gợi ý" : "Mở lộ trình A1–C1"}</span>
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>

      {/* ---------- Heatmap ---------- */}
      <section className={styles.block} aria-labelledby="heat-title">
        <div className={styles.blockHead}>
          <h2 id="heat-title" className={styles.blockTitle}>
            {HEATMAP_WEEKS} tuần gần nhất
          </h2>
          {heatmap && (
            <p className={styles.blockNote}>
              {activeDays} ngày có học · {totalMinutes} phút
            </p>
          )}
        </div>
        {heatmap ? (
          <div className={styles.heatWrap}>
            <div className={styles.heatDays} aria-hidden="true">
              {WEEKDAYS.map((d, i) => (
                <span key={d}>{i % 2 === 0 ? d : ""}</span>
              ))}
            </div>
            <div
              className={styles.heat}
              role="img"
              aria-label={`Lịch học ${HEATMAP_WEEKS} tuần: ${activeDays} ngày có học, tổng ${totalMinutes} phút.`}
            >
              {heatmap.map((week) => (
                <div key={week[0]?.date} className={styles.heatCol}>
                  {week.map((d) => (
                    <span
                      key={d.date}
                      className={styles.cell}
                      data-level={d.level}
                      title={`${fmtDay(d.date)}: ${d.minutes} phút`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className={styles.legend} aria-hidden="true">
              Ít
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className={styles.cell} data-level={l} />
              ))}
              Nhiều
            </div>
          </div>
        ) : (
          <p className={styles.muted}>Chưa tải được lịch học.</p>
        )}
      </section>

      {/* ---------- Badges ---------- */}
      <section className={styles.block} aria-labelledby="badge-title">
        <div className={styles.blockHead}>
          <h2 id="badge-title" className={styles.blockTitle}>
            Huy hiệu
          </h2>
          {badges && (
            <p className={styles.blockNote}>
              {unlocked.length}/{badges.length} đã mở
            </p>
          )}
        </div>
        {badges === null ? (
          <p className={styles.muted}>Chưa tải được huy hiệu.</p>
        ) : badges.length === 0 ? (
          <p className={styles.muted}>Hệ thống chưa có huy hiệu nào.</p>
        ) : (
          <ul className={styles.badges}>
            {[...badges]
              .sort((a, b) => Number(b.isUnlocked) - Number(a.isUnlocked) || a.thresholdValue - b.thresholdValue)
              .map((b) => (
                <li key={b.id} className={styles.badge} data-unlocked={b.isUnlocked}>
                  <span className={styles.badgeIcon}>
                    {b.isUnlocked ? <Award size={20} aria-hidden="true" /> : <Lock size={16} aria-hidden="true" />}
                  </span>
                  <span>
                    <strong className={styles.badgeName}>{b.name}</strong>
                    <span className={styles.badgeDesc}>{b.description}</span>
                    <span className={styles.badgeMeta}>
                      {b.isUnlocked
                        ? b.earnedAt
                          ? `Mở ngày ${new Date(b.earnedAt).toLocaleDateString("vi-VN")}`
                          : "Đã mở"
                        : "Chưa mở"}
                    </span>
                  </span>
                </li>
              ))}
          </ul>
        )}
      </section>
    </>
  );
}
