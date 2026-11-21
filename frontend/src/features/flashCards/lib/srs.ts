import { DefaultScheduler, Rating } from "ts-fsrs";
import type { DefaultSchedulerCard } from "ts-fsrs";

/**
 * Spaced repetition with FSRS (ts-fsrs v6, FSRS-7 model).
 * The backend stores `due` + the card state as opaque JSON; all scheduling happens here.
 */
type Scheduler = DefaultScheduler<"FSRS-7">;
export type SrsCard = DefaultSchedulerCard<"FSRS-7">;

export const GRADES = [
  { grade: Rating.Again, label: "Quên", key: "1" },
  { grade: Rating.Hard, label: "Khó", key: "2" },
  { grade: Rating.Good, label: "Được", key: "3" },
  { grade: Rating.Easy, label: "Dễ", key: "4" },
] as const;
export type SrsGrade = (typeof GRADES)[number]["grade"];

let schedulerPromise: Promise<Scheduler> | null = null;
const getScheduler = () => (schedulerPromise ??= DefaultScheduler({ desiredRetention: 0.9 }));

/** Parse a stored state; dates come back from JSON as strings and must be revived. */
export function parseState(json: string | null | undefined): SrsCard | null {
  if (!json) return null;
  try {
    const raw = JSON.parse(json);
    if (!raw || typeof raw !== "object" || !raw.dueAt) return null;
    return { ...raw, dueAt: new Date(raw.dueAt), lastReviewAt: raw.lastReviewAt ? new Date(raw.lastReviewAt) : raw.lastReviewAt };
  } catch {
    return null; // corrupted state: treat the card as new rather than block the review
  }
}

export async function reviewCard(state: SrsCard | null, grade: SrsGrade, now = new Date()) {
  const s = await getScheduler();
  const { card } = s.review({ card: state ?? s.newCard({ now }), grade, now });
  return { state: card, due: card.dueAt as Date, json: JSON.stringify(card) };
}

/** When each grade would schedule the card next, for the button captions. */
export async function previewDue(state: SrsCard | null, now = new Date()): Promise<Record<number, Date>> {
  const s = await getScheduler();
  const out: Record<number, Date> = {};
  for (const item of s.preview({ card: state ?? s.newCard({ now }), now })) out[item.grade] = item.card.dueAt as Date;
  return out;
}

/** New cards (never reviewed) count as due so they enter the queue. */
export const isDue = (due: string | null | undefined, now = new Date()) => !due || new Date(due).getTime() <= now.getTime();

/** "10 phút", "3 ngày", "2 tháng" */
export function formatInterval(from: Date, to: Date): string {
  const min = Math.max(1, Math.round((to.getTime() - from.getTime()) / 60000));
  if (min < 60) return `${min} phút`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} giờ`;
  const d = Math.round(h / 24);
  if (d < 31) return `${d} ngày`;
  const mo = Math.round(d / 30);
  return mo < 12 ? `${mo} tháng` : `${Math.round(mo / 12)} năm`;
}
