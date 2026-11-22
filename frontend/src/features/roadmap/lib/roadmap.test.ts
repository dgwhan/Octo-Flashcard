import { describe, expect, it } from "vitest";
import type { GrammarTopicSummary, UserGrammarProgress } from "@/src/features/grammar/types";
import type { RoadmapStage } from "../data/roadmap.data";
import { roadmapState } from "./roadmap";

const topic = (id: string, level: "A1" | "A2"): GrammarTopicSummary => ({
  id,
  level,
  stage: level === "A1" ? 1 : 2,
  order: 1,
  title: id,
  vietnameseTitle: id,
  description: "",
  estimatedMinutes: 10,
});
const completed = { status: "Completed" } as UserGrammarProgress;

const stages: RoadmapStage[] = [
  {
    level: "A1",
    name: "",
    goal: "",
    steps: [
      { id: "a1-ipa", kind: "manual", title: "", desc: "", href: "/ipa", cta: "" },
      { id: "a1-grammar", kind: "grammar", title: "", desc: "" },
    ],
  },
  { level: "A2", name: "", goal: "", steps: [{ id: "a2-grammar", kind: "grammar", title: "", desc: "" }] },
];
const grammarTopics = [topic("t1", "A1"), topic("t2", "A1"), topic("t3", "A2")];

describe("roadmapState", () => {
  it("starts at the first step", () => {
    const s = roadmapState(stages, { manualDone: new Set(), grammarTopics, grammarProgress: {} });
    expect(s.doneCount).toBe(0);
    expect(s.total).toBe(3);
    expect(s.next?.step.id).toBe("a1-ipa");
  });

  it("derives grammar steps from topic progress and points to the next topic", () => {
    const s = roadmapState(stages, {
      manualDone: new Set(["a1-ipa"]),
      grammarTopics,
      grammarProgress: { t1: completed },
    });
    expect(s.next?.step.id).toBe("a1-grammar");
    expect(s.next?.state.count).toEqual({ done: 1, total: 2 });
    expect(s.next?.state.href).toBe("/grammar/t2");
  });

  it("returns no next step when everything is done", () => {
    const s = roadmapState(stages, {
      manualDone: new Set(["a1-ipa"]),
      grammarTopics,
      grammarProgress: { t1: completed, t2: completed, t3: completed },
    });
    expect(s.doneCount).toBe(3);
    expect(s.next).toBeNull();
    expect(s.byStage[1][0].href).toBe("/grammar");
  });
});
