export interface HeatmapRow {
  date: string;
  totalMinutes: number;
}

export interface HeatDay {
  date: string; // yyyy-mm-dd (local)
  minutes: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const HEATMAP_WEEKS = 12;

export const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const levelFor = (minutes: number): HeatDay["level"] =>
  minutes <= 0 ? 0 : minutes < 10 ? 1 : minutes < 20 ? 2 : minutes < 40 ? 3 : 4;

/** Monday 00:00 of the first week shown. */
export function heatmapStart(today = new Date(), weeks = HEATMAP_WEEKS): Date {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const sinceMonday = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - sinceMonday - (weeks - 1) * 7);
  return d;
}

/**
 * Week columns (Mon→Sun), oldest first; days after today are left out of the last column.
 * shortcut: the backend groups by the UTC date of each session, so a session before 07:00 in Vietnam lands on the previous day; group server-side by user timezone if that matters.
 */
export function buildHeatmap(rows: HeatmapRow[], today = new Date(), weeks = HEATMAP_WEEKS): HeatDay[][] {
  const byDay = new Map<string, number>();
  for (const r of rows) {
    const k = String(r.date).slice(0, 10);
    byDay.set(k, (byDay.get(k) ?? 0) + (r.totalMinutes || 0));
  }
  const todayKey = dayKey(today);
  const cursor = heatmapStart(today, weeks);
  const columns: HeatDay[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: HeatDay[] = [];
    for (let i = 0; i < 7; i++) {
      const k = dayKey(cursor);
      if (k > todayKey) break;
      const minutes = byDay.get(k) ?? 0;
      col.push({ date: k, minutes, level: levelFor(minutes) });
      cursor.setDate(cursor.getDate() + 1);
    }
    columns.push(col);
  }
  return columns;
}
