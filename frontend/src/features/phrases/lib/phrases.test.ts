import { describe, expect, it } from "vitest";
import { PHRASES, PHRASE_GROUPS } from "../data";
import { splitExample, plainExample, foldText } from "./text";

describe("phrase bank", () => {
  it("has 500 entries: 300 collocations and 200 idioms", () => {
    expect(PHRASES).toHaveLength(500);
    expect(PHRASES.filter((p) => p.kind === "collocation")).toHaveLength(300);
    expect(PHRASES.filter((p) => p.kind === "idiom")).toHaveLength(200);
  });

  it("has unique ids, groups and phrases", () => {
    expect(new Set(PHRASES.map((p) => p.id)).size).toBe(PHRASES.length);
    expect(new Set(PHRASE_GROUPS.map((g) => g.id)).size).toBe(PHRASE_GROUPS.length);
    const phrases = PHRASES.map((p) => p.phrase.toLowerCase());
    const dupes = phrases.filter((p, i) => phrases.indexOf(p) !== i);
    expect(dupes).toEqual([]);
  });

  it("every entry is complete and marks exactly one phrase in its example", () => {
    for (const p of PHRASES) {
      expect(p.phrase.trim() && p.meaning.trim() && p.exampleVi.trim(), p.id).toBeTruthy();
      const parts = splitExample(p.example);
      expect(parts.length, `${p.id}: ${p.example}`).toBe(3);
      expect(parts[1].trim().length, p.id).toBeGreaterThan(0);
      expect(p.exampleVi, p.id).not.toMatch(/\[|\]/);
    }
  });

  it("helpers strip markers and fold Vietnamese for search", () => {
    expect(splitExample("We need to [make a decision] now.")).toEqual(["We need to ", "make a decision", " now."]);
    expect(plainExample("[Take a seat], please.")).toBe("Take a seat, please.");
    expect(foldText("Quyết Định")).toBe("quyet dinh");
  });
});
