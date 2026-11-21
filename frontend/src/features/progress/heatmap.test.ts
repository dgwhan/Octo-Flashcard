import { describe, expect, it } from "vitest";
import { buildHeatmap, heatmapStart, levelFor, dayKey } from "./heatmap";
import { sessionMinutes } from "@/src/lib/studyLog";

describe("heatmap", () => {
  const today = new Date(2026, 10, 21); // Saturday

  it("starts on a Monday and ends today", () => {
    const start = heatmapStart(today, 12);
    expect(start.getDay()).toBe(1);
    const cols = buildHeatmap([], today, 12);
    expect(cols).toHaveLength(12);
    expect(cols[0][0].date).toBe(dayKey(start));
    expect(cols.at(-1)!.at(-1)!.date).toBe("2026-11-21");
    expect(cols.at(-1)).toHaveLength(6); // Mon-Sat
  });

  it("sums minutes per day and buckets intensity", () => {
    const cols = buildHeatmap(
      [
        { date: "2026-11-20T00:00:00", totalMinutes: 15 },
        { date: "2026-11-20", totalMinutes: 30 },
      ],
      today
    );
    const day = cols.flat().find((d) => d.date === "2026-11-20")!;
    expect(day.minutes).toBe(45);
    expect(day.level).toBe(4);
    expect([0, 5, 15, 25, 60].map(levelFor)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("study log", () => {
  it("clamps session length to 1-120 minutes", () => {
    const t = new Date("2026-11-21T08:00:00Z");
    expect(sessionMinutes(t, t)).toBe(1);
    expect(sessionMinutes(t, new Date(t.getTime() + 25 * 60000))).toBe(25);
    expect(sessionMinutes(t, new Date(t.getTime() + 5 * 3600000))).toBe(120);
  });
});
