/** Main-thread side of the Kokoro worker: download state for the UI and a promise-based generate(). */
import type { KokoroRequest, KokoroResponse } from "./kokoro.worker";

export const KOKORO_DEFAULT = "af_heart";
export const KOKORO_SIZE_MB = 90;

/** Voices rated C or better by the model authors. */
export const KOKORO_VOICES: { id: string; label: string; group: "Mỹ · Nữ" | "Mỹ · Nam" | "Anh · Nữ" | "Anh · Nam" }[] = [
  { id: "af_heart", label: "Heart · ấm, tự nhiên nhất", group: "Mỹ · Nữ" },
  { id: "af_bella", label: "Bella · tươi sáng", group: "Mỹ · Nữ" },
  { id: "af_nicole", label: "Nicole · nhẹ, như thì thầm", group: "Mỹ · Nữ" },
  { id: "af_sarah", label: "Sarah", group: "Mỹ · Nữ" },
  { id: "af_aoede", label: "Aoede", group: "Mỹ · Nữ" },
  { id: "af_kore", label: "Kore", group: "Mỹ · Nữ" },
  { id: "am_michael", label: "Michael", group: "Mỹ · Nam" },
  { id: "am_fenrir", label: "Fenrir", group: "Mỹ · Nam" },
  { id: "am_puck", label: "Puck", group: "Mỹ · Nam" },
  { id: "bf_emma", label: "Emma", group: "Anh · Nữ" },
  { id: "bf_isabella", label: "Isabella", group: "Anh · Nữ" },
  { id: "bm_george", label: "George", group: "Anh · Nam" },
  { id: "bm_fable", label: "Fable", group: "Anh · Nam" },
];

export type KokoroStatus = { state: "idle" | "loading" | "ready" | "error"; percent: number; error?: string };

// Set once the model has loaded on this browser: it is then in Cache Storage and loads without downloading.
const CACHED_KEY = "octo_kokoro_cached";
export const isKokoroCached = () => {
  try {
    return localStorage.getItem(CACHED_KEY) === "1";
  } catch {
    return false;
  }
};

let status: KokoroStatus = { state: "idle", percent: 0 };
const listeners = new Set<() => void>();
const setStatus = (next: KokoroStatus) => {
  status = next;
  listeners.forEach((l) => l());
};
export const kokoroStatus = {
  get: () => status,
  subscribe: (l: () => void) => (listeners.add(l), () => void listeners.delete(l)),
};

let worker: Worker | null = null;
let nextId = 0;
const pending = new Map<number, { resolve: (b: Blob) => void; reject: (e: Error) => void }>();

function getWorker(): Worker {
  if (worker) return worker;
  worker = new Worker(new URL("./kokoro.worker.ts", import.meta.url), { type: "module" });
  worker.onmessage = (e: MessageEvent<KokoroResponse>) => {
    const msg = e.data;
    if (msg.type === "progress") setStatus({ state: "loading", percent: msg.percent });
    else if (msg.type === "ready") {
      try {
        localStorage.setItem(CACHED_KEY, "1");
      } catch {
        // storage blocked: the model still loads from Cache Storage, we just can't remember that it's there
      }
      setStatus({ state: "ready", percent: 100 });
    } else if (msg.type === "audio") {
      pending.get(msg.id)?.resolve(msg.blob);
      pending.delete(msg.id);
    } else if (msg.id !== undefined) {
      pending.get(msg.id)?.reject(new Error(msg.message));
      pending.delete(msg.id);
    } else {
      setStatus({ state: "error", percent: 0, error: msg.message });
    }
  };
  return worker;
}

const send = (msg: KokoroRequest) => getWorker().postMessage(msg);

/** Start downloading/loading the model (no-op once loading or ready). */
export function loadKokoro() {
  if (status.state === "loading" || status.state === "ready") return;
  setStatus({ state: "loading", percent: 0 });
  send({ type: "load" });
}

// One job at a time, in order: the worker shares a single CPU thread, so parallel jobs only make the
// sentence the learner is waiting for finish later.
let queue: Promise<unknown> = Promise.resolve();

/** `signal`: abort to drop the job if it has not reached the worker yet (the learner moved on). */
export function kokoroGenerate(text: string, voice: string, speed: number, signal?: AbortSignal): Promise<Blob> {
  loadKokoro();
  const job = queue.then(() => {
    if (signal?.aborted) throw new DOMException("aborted", "AbortError");
    const id = ++nextId;
    return new Promise<Blob>((resolve, reject) => {
      pending.set(id, { resolve, reject });
      send({ type: "generate", id, text, voice, speed });
    });
  });
  queue = job.catch(() => {});
  return job;
}
