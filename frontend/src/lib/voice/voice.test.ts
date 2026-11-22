import { describe, expect, it } from "vitest";
import { splitSentences } from "./voice";

describe("splitSentences", () => {
  it("splits a reply into sentences, keeping punctuation and closing quotes", () => {
    expect(splitSentences('Good evening! Welcome to the bistro. Table for one? "Great."')).toEqual([
      "Good evening!",
      "Welcome to the bistro.",
      "Table for one?",
      '"Great."',
    ]);
  });

  it("keeps a trailing fragment without punctuation and a single sentence as is", () => {
    expect(splitSentences("Sure... let me check that for you")).toEqual(["Sure...", "let me check that for you"]);
    expect(splitSentences("We need to make a decision by Friday.")).toEqual(["We need to make a decision by Friday."]);
    expect(splitSentences("   ")).toEqual([]);
  });
});
