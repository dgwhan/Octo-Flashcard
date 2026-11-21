/**
 * Bring-your-own-key Gemini client. The browser calls Google directly: the key never reaches the Octo backend.
 * Storage: localStorage when the user ticks "remember", otherwise sessionStorage (cleared when the tab closes).
 */

const KEY = "octo_gemini_key";
const MODEL = "octo_gemini_model";
export const DEFAULT_MODEL = "gemini-3.1-flash-lite";
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

export interface GeminiConfig {
  key: string;
  model: string;
  remembered: boolean;
}

const read = (store: Storage, k: string) => {
  try {
    return store.getItem(k);
  } catch {
    return null;
  }
};

export function loadConfig(): GeminiConfig | null {
  if (typeof window === "undefined") return null;
  for (const [store, remembered] of [
    [localStorage, true],
    [sessionStorage, false],
  ] as const) {
    const key = read(store, KEY);
    if (key) return { key, model: read(store, MODEL) || DEFAULT_MODEL, remembered };
  }
  return null;
}

/** Fired on save/clear so every mounted key panel updates. */
export const CONFIG_EVENT = "octo-gemini-config";
const announce = () => window.dispatchEvent(new Event(CONFIG_EVENT));

export function saveConfig({ key, model, remembered }: GeminiConfig) {
  clearConfig();
  const store = remembered ? localStorage : sessionStorage;
  try {
    store.setItem(KEY, key.trim());
    store.setItem(MODEL, model.trim() || DEFAULT_MODEL);
  } catch {
    // storage blocked (private mode): nothing persists, the panel asks again
  }
  announce();
}

export function clearConfig() {
  for (const store of [localStorage, sessionStorage]) {
    try {
      store.removeItem(KEY);
      store.removeItem(MODEL);
    } catch {
      // ignore
    }
  }
  announce();
}

export const maskKey = (key: string) => (key.length > 8 ? `${key.slice(0, 4)}…${key.slice(-4)}` : "••••");

export interface Turn {
  role: "user" | "model";
  text: string;
}

interface GenerateOptions {
  config: Pick<GeminiConfig, "key" | "model">;
  system: string;
  turns: Turn[];
  json?: boolean;
  temperature?: number;
  signal?: AbortSignal;
}

export class GeminiError extends Error {}

function explain(status: number, message: string) {
  if (status === 400 && /api key/i.test(message)) return "API key không hợp lệ. Kiểm tra lại key trong Google AI Studio.";
  if (status === 401 || status === 403) return "Key không có quyền dùng Gemini API (hoặc API chưa được bật cho project).";
  if (status === 404) return "Không tìm thấy model này. Kiểm tra lại tên model.";
  if (status === 429) return "Key đã hết hạn mức tạm thời. Đợi một lúc rồi thử lại.";
  if (status >= 500) return "Máy chủ Google AI đang lỗi, thử lại sau.";
  return message || `Lỗi ${status} từ Google AI.`;
}

export async function generate({ config, system, turns, json, temperature = 0.8, signal }: GenerateOptions): Promise<string> {
  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}/${encodeURIComponent(config.model)}:generateContent`, {
      method: "POST",
      // key in a header, not the URL, so it doesn't end up in logs or history
      headers: { "Content-Type": "application/json", "x-goog-api-key": config.key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
        generationConfig: { temperature, ...(json ? { responseMimeType: "application/json" } : {}) },
      }),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new GeminiError("Không kết nối được tới Google AI. Kiểm tra mạng.");
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new GeminiError(explain(res.status, body?.error?.message ?? ""));
  const text: string = (body?.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? "").join("");
  if (!text.trim()) throw new GeminiError("AI không trả lời (có thể bị bộ lọc an toàn chặn). Thử diễn đạt khác.");
  return text.trim();
}

// Newest first; an account without access to one gets 404 and falls through to the next.
const TTS_MODELS = ["gemini-3.8-flash-tts", "gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts"];
export const TTS_VOICE = "Kore";

export const GEMINI_VOICES: { name: string; label: string; gender: "Nữ" | "Nam" }[] = [
  { name: "Kore", label: "Kore · rõ ràng, chắc giọng", gender: "Nữ" },
  { name: "Aoede", label: "Aoede · nhẹ nhàng, tự nhiên", gender: "Nữ" },
  { name: "Leda", label: "Leda · trẻ trung", gender: "Nữ" },
  { name: "Zephyr", label: "Zephyr · tươi sáng", gender: "Nữ" },
  { name: "Despina", label: "Despina · mượt mà", gender: "Nữ" },
  { name: "Erinome", label: "Erinome · trong, dễ nghe", gender: "Nữ" },
  { name: "Sulafat", label: "Sulafat · ấm áp", gender: "Nữ" },
  { name: "Puck", label: "Puck · vui vẻ", gender: "Nam" },
  { name: "Charon", label: "Charon · điềm tĩnh, như đọc tin", gender: "Nam" },
  { name: "Orus", label: "Orus · chắc giọng", gender: "Nam" },
  { name: "Iapetus", label: "Iapetus · rõ ràng", gender: "Nam" },
  { name: "Achird", label: "Achird · thân thiện", gender: "Nam" },
  { name: "Algieba", label: "Algieba · mượt mà", gender: "Nam" },
  { name: "Schedar", label: "Schedar · đều, chậm rãi", gender: "Nam" },
];

/** Gemini text-to-speech. Returns a WAV blob. */
export async function synthesize(key: string, text: string, voice = TTS_VOICE, signal?: AbortSignal): Promise<Blob> {
  let lastError = "";
  for (const model of TTS_MODELS) {
    const res = await fetch(`${ENDPOINT}/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
        },
      }),
      signal,
    });
    const body = await res.json().catch(() => null);
    if (res.status === 404) continue;
    if (!res.ok) throw new GeminiError(explain(res.status, body?.error?.message ?? ""));
    const part = (body?.candidates?.[0]?.content?.parts ?? []).find((p: { inlineData?: unknown }) => p.inlineData)?.inlineData;
    if (!part?.data) {
      lastError = "AI không trả về âm thanh.";
      continue;
    }
    const bytes = Uint8Array.from(atob(part.data), (c) => c.charCodeAt(0));
    const { pcm, rate } = extractPcm(bytes, part.mimeType ?? "");
    return new Blob([pcmToWav(trimTail(pcm, rate), rate)], { type: "audio/wav" });
  }
  throw new GeminiError(lastError || "Key này không dùng được model giọng đọc (TTS) của Gemini.");
}

/**
 * Gemini sends raw 16-bit PCM or (newer models) a full WAV file. Playing a WAV's header and trailing
 * metadata chunks as samples is what made the static burst after each sentence.
 */
export function extractPcm(bytes: Uint8Array, mimeType: string): { pcm: Uint8Array; rate: number } {
  let rate = Number(/rate=(\d+)/.exec(mimeType)?.[1]) || 24000;
  let pcm = bytes;
  const tag = (o: number) => String.fromCharCode(...bytes.subarray(o, o + 4));
  if (bytes.length > 12 && tag(0) === "RIFF" && tag(8) === "WAVE") {
    const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    for (let o = 12; o + 8 <= bytes.length; ) {
      const size = v.getUint32(o + 4, true);
      if (tag(o) === "fmt ") rate = v.getUint32(o + 12, true);
      if (tag(o) === "data") {
        pcm = bytes.subarray(o + 8, Math.min(o + 8 + size, bytes.length)); // size may be 0xFFFFFFFF when streamed
        break;
      }
      o += 8 + size + (size & 1);
    }
  }
  return { pcm: pcm.subarray(0, pcm.length & ~1), rate };
}

/**
 * Cut the tail after the last spoken 10 ms window (plus 80 ms of breath) and fade out,
 * which also removes the low-level hiss Gemini sometimes appends.
 */
export function trimTail(pcm: Uint8Array, rate: number): Uint8Array {
  const v = new DataView(pcm.buffer, pcm.byteOffset, pcm.byteLength);
  const n = pcm.length >> 1;
  const s = Int16Array.from({ length: n }, (_, i) => v.getInt16(i * 2, true));
  const win = Math.max(1, Math.round(rate / 100));
  const rms: number[] = [];
  for (let i = 0; i < n; i += win) {
    let sum = 0;
    const end = Math.min(n, i + win);
    for (let j = i; j < end; j++) sum += s[j] * s[j];
    rms.push(Math.sqrt(sum / (end - i)));
  }
  const peak = Math.max(0, ...rms);
  if (!peak) return pcm;
  let last = rms.length - 1;
  while (last > 0 && rms[last] < peak * 0.06) last--;
  const end = Math.min(n, (last + 1) * win + Math.round(rate * 0.08));
  const fade = Math.min(end, Math.round(rate * 0.03));
  const out = new DataView(new ArrayBuffer(end * 2));
  for (let i = 0; i < end; i++) {
    const gain = i >= end - fade ? (end - i) / fade : 1;
    out.setInt16(i * 2, Math.round(s[i] * gain), true);
  }
  return new Uint8Array(out.buffer);
}

/** Wrap mono 16-bit little-endian PCM in a WAV header so an <audio> element can play it. */
export function pcmToWav(pcm: Uint8Array, rate: number): ArrayBuffer {
  const buf = new ArrayBuffer(44 + pcm.length);
  const v = new DataView(buf);
  const str = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF");
  v.setUint32(4, 36 + pcm.length, true);
  str(8, "WAVE");
  str(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, 1, true); // mono
  v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true); // byte rate
  v.setUint16(32, 2, true); // block align
  v.setUint16(34, 16, true); // bits per sample
  str(36, "data");
  v.setUint32(40, pcm.length, true);
  new Uint8Array(buf, 44).set(pcm);
  return buf;
}

/** Parse a JSON reply, tolerating ```json fences. */
export function parseJson<T>(text: string): T {
  const clean = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  try {
    return JSON.parse(clean) as T;
  } catch {
    throw new GeminiError("AI trả về dữ liệu không đúng định dạng. Bấm thử lại.");
  }
}

/** Cheapest possible call to confirm a key works. */
export const testConfig = (config: Pick<GeminiConfig, "key" | "model">) =>
  generate({ config, system: "Reply with the single word OK.", turns: [{ role: "user", text: "ping" }], temperature: 0 });
