/**
 * Audio for the IPA chart: the recording of the sound itself (Wikimedia Commons). Diphthongs have no isolated
 * recording, so the browser voice says their `ttsHint` spelling ("ay" for /eɪ/). The example word is only a
 * last resort when neither exists, never the default.
 */

let currentAudio: HTMLAudioElement | null = null;

interface PlayablePhoneme {
  symbol: string;
  audioUrl?: string;
  ttsHint?: string;
  examples?: { word: string }[];
}

export const ipaAudio = {
  playPhoneme(phoneme: PlayablePhoneme, onEnd?: () => void): void {
    if (typeof window === "undefined") return;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    let fellBack = false;
    const fallback = () => {
      if (fellBack) return; // onerror and play().catch can both fire for one failure
      fellBack = true;
      currentAudio = null;
      this.speakWord(phoneme.ttsHint ?? phoneme.examples?.[0]?.word ?? phoneme.symbol, onEnd);
    };

    if (!phoneme.audioUrl) return fallback();

    const audio = new Audio(phoneme.audioUrl);
    currentAudio = audio;
    audio.onended = () => {
      currentAudio = null;
      onEnd?.();
    };
    audio.onerror = fallback;
    audio.play().catch(fallback);
  },

  speakWord(word: string, onEnd?: () => void): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();
      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
  },
};
