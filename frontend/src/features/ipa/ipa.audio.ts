/**
 * Audio service for IPA chart
 * Utilizes public domain audio from Wikimedia Commons / public CDN,
 * with reliable Web Speech Synthesis API fallback.
 */

let currentAudio: HTMLAudioElement | null = null;

export const ipaAudio = {
  playPhoneme(phoneme: { symbol: string; audioUrl?: string; examples?: { word: string }[] }, onEnd?: () => void): void {
    if (typeof window === "undefined") return;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    if (phoneme.audioUrl) {
      const audio = new Audio(phoneme.audioUrl);
      currentAudio = audio;

      audio.onended = () => {
        currentAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        // Fallback to Web Speech API with first example word
        const sampleWord = phoneme.examples?.[0]?.word || phoneme.symbol;
        this.speakWord(sampleWord, onEnd);
      };

      audio.play().catch(() => {
        const sampleWord = phoneme.examples?.[0]?.word || phoneme.symbol;
        this.speakWord(sampleWord, onEnd);
      });
      return;
    }

    const sampleWord = phoneme.examples?.[0]?.word || phoneme.symbol;
    this.speakWord(sampleWord, onEnd);
  },

  speakWord(word: string, onEnd?: () => void): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = 0.85;

      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  },
};
