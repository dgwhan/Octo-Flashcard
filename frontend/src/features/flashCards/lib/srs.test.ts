import { describe, expect, it } from "vitest";
import { Rating } from "ts-fsrs";
import { reviewCard, parseState, previewDue, isDue, formatInterval } from "./srs";
import { buildQueue, nextDueAt, NEW_PER_SESSION } from "./reviewQueue";
import type { FlashcardSet } from "@/src/types/flashCard";

const now = new Date("2026-11-21T08:00:00Z");

describe("FSRS scheduling", () => {
  it("schedules Again sooner than Good, and Good sooner than Easy", async () => {
    const again = await reviewCard(null, Rating.Again, now);
    const good = await reviewCard(null, Rating.Good, now);
    const easy = await reviewCard(null, Rating.Easy, now);
    expect(again.due.getTime()).toBeLessThan(good.due.getTime());
    expect(good.due.getTime()).toBeLessThan(easy.due.getTime());
  });

  it("round-trips the stored JSON and keeps growing intervals", async () => {
    const first = await reviewCard(null, Rating.Good, now);
    const restored = parseState(first.json);
    expect(restored?.dueAt).toBeInstanceOf(Date);
    const second = await reviewCard(restored, Rating.Good, first.due);
    expect(second.due.getTime() - first.due.getTime()).toBeGreaterThan(first.due.getTime() - now.getTime());
  });

  it("treats missing or corrupted state as a new card", async () => {
    expect(parseState(null)).toBeNull();
    expect(parseState("{not json")).toBeNull();
    expect(parseState("{}")).toBeNull();
    const p = await previewDue(parseState("{not json"), now);
    expect(Object.keys(p)).toHaveLength(4);
  });

  it("isDue and formatInterval", () => {
    expect(isDue(null, now)).toBe(true);
    expect(isDue("2026-11-21T07:59:00Z", now)).toBe(true);
    expect(isDue("2026-11-22T08:00:00Z", now)).toBe(false);
    expect(formatInterval(now, new Date(now.getTime() + 10 * 60000))).toBe("10 phút");
    expect(formatInterval(now, new Date(now.getTime() + 3 * 86400000))).toBe("3 ngày");
    expect(formatInterval(now, new Date(now.getTime() + 60 * 86400000))).toBe("2 tháng");
  });
});

describe("review queue", () => {
  const card = (id: string, due?: string) => ({ id, question: id, answer: id, due: due ?? null });
  const sets: FlashcardSet[] = [
    {
      id: "a",
      title: "A",
      createdAt: "",
      flashcards: [card("late", "2026-11-19T00:00:00Z"), card("future", "2026-11-30T00:00:00Z"), card("new1")],
    },
    { id: "b", title: "B", createdAt: "", flashcards: [card("older", "2026-11-10T00:00:00Z")] },
  ];

  it("puts overdue cards first (oldest first), then new cards, and skips future ones", () => {
    expect(buildQueue(sets, now).map((q) => q.card.id)).toEqual(["older", "late", "new1"]);
    expect(nextDueAt(sets, now)?.toISOString()).toBe("2026-11-30T00:00:00.000Z");
  });

  it("caps new cards per session", () => {
    const big: FlashcardSet = {
      id: "c",
      title: "C",
      createdAt: "",
      flashcards: Array.from({ length: 50 }, (_, i) => card(`n${i}`)),
    };
    expect(buildQueue([big], now)).toHaveLength(NEW_PER_SESSION);
  });
});
