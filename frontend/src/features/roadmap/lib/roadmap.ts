import { ROUTES } from "@/src/config/routes";
import type { GrammarCEFR, GrammarTopicSummary, UserGrammarProgress } from "@/src/features/grammar/types";
import type { RoadmapStage, RoadmapStep } from "../data/roadmap.data";

export interface StepState {
  done: boolean;
  href: string;
  cta: string;
  /** Grammar steps only: completed/total topics of that level */
  count?: { done: number; total: number };
}

export interface RoadmapContext {
  manualDone: Set<string>;
  grammarTopics: GrammarTopicSummary[];
  grammarProgress: Record<string, UserGrammarProgress>;
}

export function stepState(step: RoadmapStep, level: GrammarCEFR, ctx: RoadmapContext): StepState {
  if (step.kind === "manual") return { done: ctx.manualDone.has(step.id), href: step.href, cta: step.cta };

  const topics = ctx.grammarTopics.filter((t) => t.level === level);
  const isDone = (id: string) => ctx.grammarProgress[id]?.status === "Completed";
  const doneCount = topics.filter((t) => isDone(t.id)).length;
  const next = topics.find((t) => !isDone(t.id));
  return {
    done: topics.length > 0 && doneCount === topics.length,
    href: next ? ROUTES.GRAMMAR_DETAIL(next.id) : ROUTES.GRAMMAR,
    cta: next ? (doneCount > 0 ? "Học tiếp" : "Bắt đầu") : "Ôn lại",
    count: { done: doneCount, total: topics.length },
  };
}

/** States for every stage, plus the first unfinished step in roadmap order (null when all done). */
export function roadmapState(stages: RoadmapStage[], ctx: RoadmapContext) {
  const byStage = stages.map((s) => s.steps.map((step) => stepState(step, s.level, ctx)));
  const all = byStage.flat();
  const pending = stages.flatMap((stage, i) =>
    stage.steps.map((step, j) => ({ stage, step, state: byStage[i][j] })).filter((x) => !x.state.done)
  );
  return { byStage, next: pending[0] ?? null, doneCount: all.filter((s) => s.done).length, total: all.length };
}

const STORAGE_KEY = "octo_roadmap_done_v1";

export function parseManualDone(raw: string | null): Set<string> {
  try {
    const ids: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

// shortcut: manual ticks live in this browser only (raw JSON string as the snapshot); move to the backend if cross-device sync is needed.
const listeners = new Set<() => void>();
const readRaw = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const manualDoneStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    window.addEventListener("storage", cb);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", cb);
    };
  },
  getSnapshot: readRaw,
  getServerSnapshot: () => null,
  toggle(id: string) {
    const ids = parseManualDone(readRaw());
    if (!ids.delete(id)) ids.add(id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    } catch {
      // Private mode / storage blocked: the tick can't persist
    }
    listeners.forEach((l) => l());
  },
};
