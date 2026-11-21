import { describe, expect, it } from "vitest";
import { compareSpeech, normalizeWords, tipsFor, wordsPerMinute } from "./compare";
import { splitSentences, SHADOW_SETS } from "../data/shadowing.data";
import { SOUND_GROUPS, spokenForm } from "../data/pronunciation.data";
import { SCENARIOS } from "../data/scenarios";
import { feedbackRequest, rolePlaySystem } from "./prompts";
import { PART1_TOPICS, CUE_CARDS } from "../data/ielts";
import { parseJson, pcmToWav, extractPcm, trimTail } from "@/src/lib/ai";
import { IPA_PHONEMES } from "@/src/features/ipa/data/ipa.data";

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
  });
});

describe("gemini tts", () => {
  it("wraps PCM in a playable WAV header", () => {
    const wav = new DataView(pcmToWav(new Uint8Array([1, 2, 3, 4]), 24000));
    const tag = (o: number) => String.fromCharCode(...new Uint8Array(wav.buffer, o, 4));
    expect([tag(0), tag(8), tag(12), tag(36)]).toEqual(["RIFF", "WAVE", "fmt ", "data"]);
    expect(wav.getUint32(24, true)).toBe(24000);
    expect(wav.getUint32(40, true)).toBe(4);
    expect(wav.getUint8(44)).toBe(1);
    expect(wav.byteLength).toBe(48);
  });
});

describe("gemini tts cleanup", () => {
  const pcm16 = (samples: number[]) => {
    const v = new DataView(new ArrayBuffer(samples.length * 2));
    samples.forEach((x, i) => v.setInt16(i * 2, x, true));
    return new Uint8Array(v.buffer);
  };

  it("reads only the data chunk of a WAV, dropping header and trailing metadata", () => {
    const wav = new Uint8Array(pcmToWav(pcm16([100, -100, 200]), 16000));
    const withMeta = new Uint8Array([...wav, ...new TextEncoder().encode("LIST"), 4, 0, 0, 0, 9, 9, 9, 9]);
    const { pcm, rate } = extractPcm(withMeta, "audio/wav");
    expect(rate).toBe(16000);
    expect([...pcm]).toEqual([...pcm16([100, -100, 200])]);
  });

  it("treats non-WAV bytes as raw PCM and uses the rate from the mime type", () => {
    const { pcm, rate } = extractPcm(pcm16([1, 2, 3]), "audio/L16;codec=pcm;rate=24000");
    expect(rate).toBe(24000);
    expect(pcm.length).toBe(6);
  });

  it("cuts a quiet hiss tail and fades the end to zero", () => {
    const rate = 1000; // 10-sample windows, 80-sample breath, 30-sample fade
    const speech = Array.from({ length: 200 }, (_, i) => (i % 2 ? 10000 : -10000));
    const hiss = Array.from({ length: 500 }, (_, i) => (i % 2 ? 300 : -300));
    const out = new DataView(trimTail(pcm16([...speech, ...hiss]), rate).buffer);
    expect(out.byteLength / 2).toBe(280);
    expect(Math.abs(out.getInt16(278 * 2, true))).toBeLessThanOrEqual(20);
    expect(Math.abs(out.getInt16(100 * 2, true))).toBe(10000);
  });
});
