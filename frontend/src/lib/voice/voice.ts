/**
 * The app's voice, used by every AudioButton; never Google Translate's voice.
 * Order: native recording (given URL, or dictionary audio for a single word) → Kokoro (open model running in the
 * browser, once downloaded) or Gemini TTS with the user's key (via our API) → the best non-Google browser voice.
 * The choice and default speed come from the user's settings (Settings page), so they follow the account.
 */
import { TTS_VOICE, aiSpeech } from "../ai";
import { getUserSettings } from "../userSettings";
import { KOKORO_DEFAULT, isKokoroCached, kokoroGenerate, kokoroStatus } from "./kokoro";

/** "" = automatic, "kokoro:<voice>", "gemini:<voice>" or "browser:<voice name>". */
export const getVoicePref = (): string => getUserSettings().voice;

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

/**
 * Kokoro voice to use: the chosen one, or the default once the model is on this device.
 * A Kokoro choice synced from another device does not start the ~90 MB download by itself: the browser voice
 * plays until the learner downloads the model from Settings.
 */
function kokoroVoice(pref: string): string | undefined {
  const ready = kokoroStatus.get().state === "ready" || isKokoroCached();
  if (!ready) return;
  if (pref.startsWith("kokoro:")) return pref.slice(7);
  return pref ? undefined : KOKORO_DEFAULT;
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

interface DictionaryPhonetics {
  phonetics?: { audio?: string }[];
}

async function nativeWordAudio(word: string): Promise<string | undefined> {
  if (!/^[a-z'-]+$/i.test(word)) return;
  const entries: DictionaryPhonetics[] = await fetch(`/api/dictionary?word=${encodeURIComponent(word.toLowerCase())}`)
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
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

export const voicePlayer = {
  async play(text: string, audioUrl?: string, speedArg?: number): Promise<void> {
    voicePlayer.stop();
    const speed = speedArg ?? getUserSettings().voiceSpeed;
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
    const hasKey = getUserSettings().hasGeminiKey;

    const kokoro = kokoroVoice(pref);
    if (kokoro) {
      try {
        return await playUrl(await kokoroUrl(kokoro, clean, speed), 1, id); // Kokoro already spoke at `speed`
      } catch (err) {
        console.warn("[voicePlayer] Kokoro failed, using browser voice", err);
      }
    } else if (hasKey && !browserName && !pref.startsWith("kokoro:")) {
      try {
        return await playUrl(await cachedUrl(`${gemini}|${clean}`, () => aiSpeech(clean, gemini)), speed, id);
      } catch (err) {
        console.warn("[voicePlayer] Gemini TTS failed, using browser voice", err);
      }
    }

    return browserVoice(clean, speed, id, browserName);
  },

  /** Generate Kokoro audio ahead of a click. Never calls Gemini, so it costs no API quota. */
  prefetch(text: string, speedArg?: number) {
    const speed = speedArg ?? getUserSettings().voiceSpeed;
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
