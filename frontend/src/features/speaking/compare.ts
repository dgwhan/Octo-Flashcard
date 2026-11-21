/**
 * Word-level comparison between a target sentence and what speech recognition heard.
 * Contractions are expanded on both sides so "I'm" and "I am" count as the same.
 */

const RULES: [RegExp, string][] = [
  [/\bcan't\b/g, "can not"],
  [/\bcannot\b/g, "can not"],
  [/\bwon't\b/g, "will not"],
  [/\bshan't\b/g, "shall not"],
  [/n't\b/g, " not"],
  [/'m\b/g, " am"],
  [/'re\b/g, " are"],
  [/'ll\b/g, " will"],
  [/'ve\b/g, " have"],
  [/'d\b/g, " would"],
  [/'s\b/g, " is"],
];

// shortcut: digits stay digits ("20" ≠ "twenty"); add number-to-words if sentences with numbers start failing
export function normalizeWords(text: string): string[] {
  let s = text.toLowerCase().replace(/[’‘`]/g, "'");
  for (const [re, to] of RULES) s = s.replace(re, to);
  return s
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/'/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

export interface WordMark {
  text: string;
  ok: boolean;
  /** false for tokens like "—" that carry no word */
  counted: boolean;
}

export interface SpeechCheck {
  words: WordMark[];
  score: number;
  missed: string[];
}

/** Longest common subsequence; returns the matched indexes in `a`. */
function lcsMatches(a: string[], b: string[]): Set<number> {
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      hit.add(i);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return hit;
}

export function compareSpeech(target: string, spoken: string): SpeechCheck {
  const display = target.split(/\s+/).filter(Boolean);
  const owner: number[] = [];
  const tokens: string[] = [];
  display.forEach((w, i) =>
    normalizeWords(w).forEach((t) => {
      tokens.push(t);
      owner.push(i);
    })
  );
  const hit = lcsMatches(tokens, normalizeWords(spoken));

  const words: WordMark[] = display.map((text, i) => {
    const mine = owner.flatMap((o, k) => (o === i ? [k] : []));
    return { text, counted: mine.length > 0, ok: mine.every((k) => hit.has(k)) };
  });
  const counted = words.filter((w) => w.counted);
  const okCount = counted.filter((w) => w.ok).length;
  const missed = [
    ...new Set(counted.filter((w) => !w.ok).map((w) => w.text.toLowerCase().replace(/[^a-z'’-]/g, ""))),
  ].filter(Boolean);
  return { words, score: counted.length ? Math.round((okCount / counted.length) * 100) : 0, missed };
}

/** Words per minute, for fluency feedback. */
export const wordsPerMinute = (transcript: string, seconds: number) =>
  seconds > 0 ? Math.round((normalizeWords(transcript).length / seconds) * 60) : 0;

/** Short pronunciation hints for a word Vietnamese learners often miss. */
export function tipsFor(word: string): { sound: string; text: string }[] {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  const tips: { sound: string; text: string }[] = [];
  if (/th/.test(w)) tips.push({ sound: "/θ/ /ð/", text: "Đặt đầu lưỡi giữa hai hàm răng rồi thổi hơi, đừng đọc thành 't' hay 'đ'." });
  if (/^(str|spl|spr|scr|st|sp|sk|sm|sn|sl|bl|cl|fl|gl|pl|br|cr|dr|fr|gr|pr|tr)/.test(w))
    tips.push({ sound: "Cụm phụ âm", text: "Đọc liền các phụ âm đầu, không chèn âm 'ơ' vào giữa." });
  if (/ed$/.test(w)) tips.push({ sound: "-ed", text: "Đuôi -ed đọc /t/, /d/ hoặc /ɪd/; đừng bỏ đuôi." });
  else if (/[^s]s$|es$/.test(w)) tips.push({ sound: "-s", text: "Bật rõ đuôi /s/ hoặc /z/ ở cuối từ." });
  else if (/[bcdfgklmnpqtvxz]$/.test(w)) tips.push({ sound: "Âm cuối", text: "Đóng khẩu hình dứt khoát ở âm cuối, đừng nuốt âm." });
  if (/sh|tion|sion/.test(w)) tips.push({ sound: "/ʃ/", text: "Tròn môi, lưỡi lùi về sau như khi bảo 'suỵt'." });
  if (/ch|j|dge/.test(w)) tips.push({ sound: "/tʃ/ /dʒ/", text: "Bắt đầu như /t/ hoặc /d/ rồi bật sang 'sh'." });
  return tips.slice(0, 2);
}
