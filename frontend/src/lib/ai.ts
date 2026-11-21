/**
 * AI features that use the signed-in user's own Gemini key. The key is stored encrypted on the server
 * (Settings → API key); the browser only sends prompts to our API, which calls Google.
 */
import { ApiError, apiClient } from "./api";

export interface AiTurn {
  role: "user" | "model";
  text: string;
}

/** `needsKey`: the user has not added a Gemini key yet (send them to Settings). */
export class AiError extends Error {
  constructor(message: string, readonly needsKey = false) {
    super(message);
  }
}

function toAiError(err: unknown): Error {
  const original = err instanceof ApiError ? err.originalError : err;
  if ((original as { name?: string } | undefined)?.name === "CanceledError") return new DOMException("aborted", "AbortError");
  if (err instanceof ApiError) return new AiError(err.message, err.status === 412);
  return new AiError("Không kết nối được tới máy chủ. Kiểm tra mạng.");
}

interface GenerateOptions {
  system: string;
  turns: AiTurn[];
  json?: boolean;
  temperature?: number;
  signal?: AbortSignal;
}

export async function aiGenerate({ system, turns, json = false, temperature = 0.8, signal }: GenerateOptions): Promise<string> {
  try {
    const res = await apiClient.post<{ text: string }>("/ai/user/generate", { system, turns, json, temperature }, { signal });
    return res.text;
  } catch (err) {
    throw toAiError(err);
  }
}

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

/** Gemini text-to-speech through our API. Returns a WAV blob ready for an <audio> element. */
export async function aiSpeech(text: string, voice = TTS_VOICE, signal?: AbortSignal): Promise<Blob> {
  let res: { data: string; mimeType: string };
  try {
    res = await apiClient.post<{ data: string; mimeType: string }>("/ai/user/tts", { text, voice }, { signal });
  } catch (err) {
    throw toAiError(err);
  }
  const bytes = Uint8Array.from(atob(res.data), (c) => c.charCodeAt(0));
  const { pcm, rate } = extractPcm(bytes, res.mimeType);
  return new Blob([pcmToWav(trimTail(pcm, rate), rate)], { type: "audio/wav" });
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
    throw new AiError("AI trả về dữ liệu không đúng định dạng. Bấm thử lại.");
  }
}
