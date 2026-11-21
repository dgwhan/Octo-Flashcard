import { describe, expect, it } from "vitest";
import { compareSpeech, normalizeWords, tipsFor, wordsPerMinute } from "./compare";
import { splitSentences, SHADOW_SETS } from "./shadowing.data";
import { SOUND_GROUPS, spokenForm } from "./pronunciation.data";
import { SCENARIOS, feedbackRequest, rolePlaySystem } from "./roleplay";
import { PART1_TOPICS, CUE_CARDS } from "./ielts";
import { parseJson, maskKey } from "./gemini";
import { IPA_PHONEMES } from "@/src/features/ipa/ipa.data";

describe("speech comparison", () => {
  it("normalises case, punctuation and contractions", () => {
    expect(normalizeWords("I'm sure it's FINE, isn't it?")).toEqual(["i", "am", "sure", "it", "is", "fine", "is", "not", "it"]);
    expect(normalizeWords("I can’t go")).toEqual(["i", "can", "not", "go"]);
  });

  it("scores a perfect read at 100 even with contraction differences", () => {
    const r = compareSpeech("I'm going to the park.", "i am going to the park");
    expect(r.score).toBe(100);
    expect(r.missed).toEqual([]);
  });

  it("marks dropped and wrong words", () => {
    const r = compareSpeech("She sells sea shells on the shore.", "she sell sea shell on the sure");
    expect(r.words.filter((w) => !w.ok).map((w) => w.text)).toEqual(["sells", "shells", "shore."]);
    expect(r.missed).toEqual(["sells", "shells", "shore"]);
    expect(r.score).toBe(57);
  });

  it("ignores extra words and handles silence", () => {
    expect(compareSpeech("Take a seat.", "um please take a seat").score).toBe(100);
    expect(compareSpeech("Take a seat.", "").score).toBe(0);
  });

  it("gives tips for typical Vietnamese trouble spots", () => {
    expect(tipsFor("think")[0].sound).toContain("θ");
    expect(tipsFor("worked").map((t) => t.sound)).toContain("-ed");
    expect(tipsFor("street").map((t) => t.sound)).toContain("Cụm phụ âm");
    expect(wordsPerMinute("one two three four", 2)).toBe(120);
  });
});

describe("shadowing sets", () => {
  it("splits sentences and drops speaker labels", () => {
    expect(splitSentences("Storyteller:  I was at a dinner in London. It was very late at night!")).toEqual([
      "I was at a dinner in London.",
      "It was very late at night!",
    ]);
    expect(splitSentences("Too short. This one is long enough to keep.")).toEqual(["This one is long enough to keep."]);
  });

  it("every set has practice sentences and unique ids", () => {
    expect(new Set(SHADOW_SETS.map((s) => s.id)).size).toBe(SHADOW_SETS.length);
    for (const s of SHADOW_SETS) expect(s.sentences.length, s.id).toBeGreaterThan(5);
  });
});

describe("pronunciation groups", () => {
  it("each group links to real IPA sounds and has words + sentences", () => {
    const symbols = new Set(IPA_PHONEMES.map((p) => p.symbol));
    for (const g of SOUND_GROUPS) {
      for (const s of g.symbols) expect(symbols.has(s), `${g.id}: /${s}/`).toBe(true);
      expect(g.words.length).toBeGreaterThanOrEqual(6);
      expect(g.sentences.length).toBeGreaterThanOrEqual(3);
    }
    expect(spokenForm("cat – cap – can")).toBe("cat cap can");
  });
});

describe("role-play and IELTS content", () => {
  it("scenarios are complete", () => {
    expect(SCENARIOS.length).toBe(10);
    for (const s of SCENARIOS) {
      expect(s.opening && s.goal && s.aiRole && s.learnerGoal, s.id).toBeTruthy();
      expect(rolePlaySystem(s)).toContain(s.level);
    }
    const req = feedbackRequest(SCENARIOS[0], [
      { role: "model", text: "Hi!" },
      { role: "user", text: "a coffee please" },
    ]);
    expect(req[0].text).toContain("LEARNER: a coffee please");
  });

  it("IELTS sets have the right number of questions", () => {
    for (const t of PART1_TOPICS) expect(t.questions).toHaveLength(4);
    for (const c of CUE_CARDS) {
      expect(c.bullets).toHaveLength(4);
      expect(c.discussion).toHaveLength(3);
    }
  });
});

describe("gemini helpers", () => {
  it("parses fenced JSON and masks keys", () => {
    expect(parseJson<{ a: number }>('```json\n{"a": 1}\n```')).toEqual({ a: 1 });
    expect(() => parseJson("not json")).toThrow();
    expect(maskKey("AIzaSyExampleKey1234")).toBe("AIza…1234");
  });
});
