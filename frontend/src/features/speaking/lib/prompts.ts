/** System prompts and request builders for the Gemini calls (role-play feedback, IELTS scoring). */
import type { AiTurn as Turn } from "@/src/lib/ai";
import type { IeltsAnswer, IeltsPart, Scenario } from "../types";

export function rolePlaySystem(s: Scenario) {
  return [
    `You are role-playing as ${s.aiRole}. The learner plays ${s.learnerRole}; their goal is to ${s.learnerGoal}.`,
    `The learner is a Vietnamese learner of English at CEFR level ${s.level}. Use natural spoken English suited to ${s.level}.`,
    "Reply in 1 to 3 short sentences and usually end with one question so the conversation keeps going.",
    "Stay in character. Do not correct mistakes during the conversation; feedback comes at the end.",
    "If you cannot understand the learner, ask them to say it another way. If they write in Vietnamese, answer in simple English and encourage them to try in English.",
    "The learner's words come from speech recognition, so ignore missing punctuation and small recognition errors.",
    "Plain text only: no markdown, no emojis, no stage directions.",
  ].join("\n");
}

export const FEEDBACK_SYSTEM = [
  "You are an English speaking coach for Vietnamese learners.",
  "You receive the transcript of a role-play. Assess only the LEARNER's turns.",
  "The learner's text comes from speech recognition: ignore punctuation, capitalisation and obvious recognition slips.",
  "Return JSON only, with this exact shape:",
  '{"summary": string, "goalReached": boolean, "scores": {"fluency": 1-5, "grammar": 1-5, "vocabulary": 1-5, "interaction": 1-5}, "corrections": [{"original": string, "better": string, "explanation": string}], "phrases": [{"phrase": string, "meaning": string}]}',
  "summary: 2-3 sentences in Vietnamese, encouraging and specific.",
  "corrections: at most 6, only real errors or clearly unnatural phrasing; original = the learner's words, better = a natural version, explanation = one short sentence in Vietnamese.",
  "phrases: up to 5 useful English phrases for this situation that the learner did not use, with Vietnamese meanings.",
].join("\n");

export function feedbackRequest(s: Scenario, turns: Turn[]): Turn[] {
  const transcript = turns.map((t) => `${t.role === "user" ? "LEARNER" : "PARTNER"}: ${t.text}`).join("\n");
  return [
    {
      role: "user",
      text: `Scenario: ${s.title} (${s.level}). Learner's goal: ${s.learnerGoal}.\n\nTranscript:\n${transcript}`,
    },
  ];
}

export const SCORE_SYSTEM = [
  "You are an experienced IELTS Speaking examiner.",
  "You receive a candidate's answers as TRANSCRIPTS produced by speech recognition, with the speaking time and words per minute.",
  "Estimate bands (0-9 in 0.5 steps) for Fluency and Coherence, Lexical Resource, and Grammatical Range and Accuracy.",
  "Pronunciation cannot be judged from text: do not score it and do not mention recognition errors.",
  "Be realistic like a real examiner: very short, memorised-sounding or off-topic answers score low.",
  "Return JSON only, with this exact shape:",
  '{"overall": number, "criteria": {"fluency": {"band": number, "comment": string}, "lexical": {"band": number, "comment": string}, "grammar": {"band": number, "comment": string}}, "strengths": string[], "improvements": string[], "sample": {"question": string, "answer": string}}',
  "overall = average of the three criteria rounded to the nearest 0.5.",
  "comment, strengths (max 3) and improvements (max 4) are in Vietnamese, short and specific, quoting the candidate's words where useful.",
  "sample: rewrite the answer to the weakest question in natural English about one band higher than the candidate.",
].join("\n");

export function scoreRequest(part: IeltsPart, answers: IeltsAnswer[], wpm: (a: IeltsAnswer) => number): Turn[] {
  const body = answers
    .map((a, i) => `Q${i + 1}: ${a.question}\nTime: ${a.seconds}s, ${wpm(a)} words/min\nAnswer: ${a.transcript || "(no answer)"}`)
    .join("\n\n");
  return [{ role: "user", text: `IELTS Speaking Part ${part}.\n\n${body}` }];
}
