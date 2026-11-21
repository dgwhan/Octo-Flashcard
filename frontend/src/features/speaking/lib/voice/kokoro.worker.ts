/// <reference lib="webworker" />
/**
 * Runs the Kokoro TTS model off the main thread. The model (~90 MB, q8) is downloaded from Hugging Face once;
 * transformers.js keeps it in Cache Storage, so later visits load it from disk.
 */
import { KokoroTTS, TextSplitterStream } from "kokoro-js";

export type KokoroRequest = { type: "load" } | { type: "generate"; id: number; text: string; voice: string; speed: number };
export type KokoroResponse =
  | { type: "progress"; percent: number }
  | { type: "ready" }
  | { type: "error"; id?: number; message: string }
  | { type: "audio"; id: number; blob: Blob };

const MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";
const post = (msg: KokoroResponse) => postMessage(msg);

let tts: Promise<KokoroTTS> | null = null;

function load() {
  // transformers.js reports progress per file; sum them into one percentage.
  const files = new Map<string, { loaded: number; total: number }>();
  tts ??= KokoroTTS.from_pretrained(MODEL, {
    dtype: "q8",
    device: "wasm", // measured: WebGPU with q8 weights is slower here, and fp32 for WebGPU is a ~330 MB download
    progress_callback: (p) => {
      if (p.status !== "progress") return;
      files.set(p.file, { loaded: p.loaded, total: p.total });
      const loaded = [...files.values()].reduce((a, f) => a + f.loaded, 0);
      const total = [...files.values()].reduce((a, f) => a + f.total, 0);
      if (total) post({ type: "progress", percent: Math.min(99, Math.round((loaded / total) * 100)) });
    },
  });
  tts.then(
    () => post({ type: "ready" }),
    (err) => {
      tts = null; // let a later click retry (e.g. after the network comes back)
      post({ type: "error", message: err instanceof Error ? err.message : String(err) });
    }
  );
  return tts;
}

self.onmessage = async (e: MessageEvent<KokoroRequest>) => {
  const msg = e.data;
  if (msg.type === "load") return void load();
  try {
    const model = await load();
    // stream() splits long text into sentences (one generate() call caps out around 500 phoneme tokens).
    // Pass a closed splitter: given a plain string, kokoro-js 1.2.1 never closes its own and the loop hangs.
    const splitter = new TextSplitterStream();
    splitter.push(msg.text);
    splitter.close();
    const parts = [];
    for await (const chunk of model.stream(splitter, { voice: msg.voice as never, speed: msg.speed })) parts.push(chunk.audio);
    if (!parts.length) throw new Error("Kokoro returned no audio");
    const out = parts[0];
    if (parts.length > 1) {
      const all = new Float32Array(parts.reduce((n, p) => n + p.audio.length, 0));
      parts.reduce((offset, p) => (all.set(p.audio, offset), offset + p.audio.length), 0);
      out.audio = all;
    }
    post({ type: "audio", id: msg.id, blob: out.toBlob() });
  } catch (err) {
    post({ type: "error", id: msg.id, message: err instanceof Error ? err.message : String(err) });
  }
};
