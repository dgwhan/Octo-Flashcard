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
