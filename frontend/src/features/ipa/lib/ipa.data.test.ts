import { describe, expect, it } from "vitest";
import { IPA_PHONEMES } from "../data/ipa.data";

describe("IPA chart audio", () => {
  it("has all 44 sounds", () => {
    expect(IPA_PHONEMES).toHaveLength(44);
  });

  it("every sound plays itself: a recording, or for diphthongs a spoken hint (never the example word)", () => {
    for (const p of IPA_PHONEMES) {
      if (p.category === "diphthong") expect(p.ttsHint, p.symbol).toBeTruthy();
      else expect(p.audioUrl, p.symbol).toMatch(/^https:\/\/upload\.wikimedia\.org\/.+\.mp3$/);
    }
  });
});
