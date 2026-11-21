/**
 * Voice for the speaking module, never Google Translate's voice.
 * Order: native recording (given URL, or dictionary audio for a single word) → Kokoro (open model running in the
 * browser, once downloaded) or Gemini TTS with the user's key → the best non-Google voice the browser has.
 */
import { dictionaryApi } from "@/src/features/dictionary";
import { TTS_VOICE, loadConfig, synthesize } from "../gemini";
import { KOKORO_DEFAULT, isKokoroCached, kokoroGenerate, kokoroStatus, loadKokoro } from "./kokoro";

/** "" = automatic, "kokoro:<voice>", "gemini:<voice>" or "browser:<voice name>". */
const PREF_KEY = "octo_speaking_voice";
export const VOICE_EVENT = "octo-speaking-voice";

export function getVoicePref(): string {
  try {
    return localStorage.getItem(PREF_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setVoicePref(value: string) {
  try {
    localStorage.setItem(PREF_KEY, value);
  } catch {
    // storage blocked (private mode): the choice is not kept, playback stays on automatic
  }
  window.dispatchEvent(new Event(VOICE_EVENT));
}

/** English browser voices, Google's excluded. */
export const browserVoices = () =>
  typeof speechSynthesis === "undefined"
    ? []
    : speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en") && !/google/i.test(v.name));

// shortcut: cache grows for the tab's lifetime (~250 KB per sentence), add LRU if sessions get long
// Promises, not URLs, so a click on a sentence that is still being prefetched reuses that work.
const ttsCache = new Map<string, Promise<string>>();
function cachedUrl(key: string, make: () => Promise<Blob>): Promise<string> {
  let url = ttsCache.get(key);
  if (!url) {
    url = make().then((blob) => URL.createObjectURL(blob));
    url.catch(() => ttsCache.delete(key)); // let a later click retry
    ttsCache.set(key, url);
  }
  return url;
}

/** Kokoro voice to use: the chosen one, or the default once the model is on this device. */
function kokoroVoice(pref: string): string | undefined {
  const ready = kokoroStatus.get().state === "ready" || isKokoroCached();
  if (pref.startsWith("kokoro:")) {
    if (ready) return pref.slice(7);
    loadKokoro(); // not downloaded yet: start now, answer with the browser voice meanwhile
    return;
  }
  return !pref && ready ? KOKORO_DEFAULT : undefined;
}
const kokoroUrl = (voice: string, text: string, speed: number) =>
  cachedUrl(`kokoro|${voice}|${speed}|${text}`, () => kokoroGenerate(text, voice, speed));

let audio: HTMLAudioElement | null = null;
let run = 0;

function playUrl(url: string, speed: number, id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (id !== run) return resolve();
    const a = new Audio(url);
    a.playbackRate = speed;
    audio = a;
    a.onended = a.onpause = () => resolve();
    a.onerror = reject;
    a.play().catch(reject);
  });
}

async function nativeWordAudio(word: string): Promise<string | undefined> {
  if (!/^[a-z'-]+$/i.test(word)) return;
  const entries = await dictionaryApi.lookup(word).catch(() => []);
  const audios = entries.flatMap((e) => e.phonetics ?? []).map((p) => p.audio).filter((a): a is string => !!a);
  return audios.find((a) => /-us\.mp3$/.test(a)) ?? audios[0];
}

function pickVoice(name?: string): SpeechSynthesisVoice | undefined {
  const en = browserVoices();
  const chosen = name && en.find((v) => v.name === name);
  if (chosen) return chosen;
  const rank = (v: SpeechSynthesisVoice) =>
    (/natural|neural|premium|enhanced/i.test(v.name) ? 4 : 0) + (v.lang === "en-US" ? 2 : 0) + (v.localService ? 0 : 1);
  return en.sort((a, b) => rank(b) - rank(a))[0];
}

function browserVoice(text: string, speed: number, id: number, name?: string): Promise<void> {
  return new Promise((resolve) => {
    if (id !== run || typeof speechSynthesis === "undefined") return resolve();
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(name);
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-US";
    u.rate = speed;
    u.onend = u.onerror = () => resolve();
    speechSynthesis.speak(u);
  });
}

export const speakingVoice = {
  async play(text: string, audioUrl?: string, speed = 1): Promise<void> {
    speakingVoice.stop();
    const id = ++run;
    const clean = text.trim();
    if (!clean) return;

    const native = audioUrl ?? (await nativeWordAudio(clean));
    if (native) {
      try {
        return await playUrl(native, speed, id);
      } catch {
        // dead recording link: fall through to synthesis
      }
    }

    const pref = getVoicePref();
    const browserName = pref.startsWith("browser:") ? pref.slice(8) : undefined;
    const gemini = pref.startsWith("gemini:") ? pref.slice(7) : TTS_VOICE;
    const key = loadConfig()?.key;

    const kokoro = kokoroVoice(pref);
    if (kokoro) {
      try {
        return await playUrl(await kokoroUrl(kokoro, clean, speed), 1, id); // Kokoro already spoke at `speed`
      } catch (err) {
        console.warn("[speakingVoice] Kokoro failed, using browser voice", err);
      }
    } else if (key && !browserName && !pref.startsWith("kokoro:")) {
      try {
        return await playUrl(await cachedUrl(`${gemini}|${clean}`, () => synthesize(key, clean, gemini)), speed, id);
      } catch (err) {
        console.warn("[speakingVoice] Gemini TTS failed, using browser voice", err);
      }
    }

    return browserVoice(clean, speed, id, browserName);
  },

  /** Generate Kokoro audio ahead of a click. Never calls Gemini, so it costs no API quota. */
  prefetch(text: string, speed = 1) {
    const clean = text.trim();
    const kokoro = clean && kokoroVoice(getVoicePref());
    if (kokoro) kokoroUrl(kokoro, clean, speed).catch(() => {});
  },

  stop() {
    run++;
    audio?.pause();
    audio = null;
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
  },
};
