/**
 * Natural Audio Pronunciation Service
 * Plays authentic native speaker audio from Dictionary API or Google Natural Speech
 * Eliminates mechanical/robotic sound from Web Speech API.
 */

class NaturalAudioService {
  private currentAudio: HTMLAudioElement | null = null;

  /**
   * Play audio from a direct URL or fetch natural pronunciation
   * @param text The English word or sentence to pronounce
   * @param directAudioUrl Optional direct URL to a verified MP3
   * @param speed Playback speed (default 1.0)
   */
  public async play(text: string, directAudioUrl?: string, speed: number = 1.0): Promise<void> {
    // Stop any currently playing audio
    this.stop();

    const cleanText = text.trim();
    if (!cleanText) return;

    // 1. If direct MP3 audio URL is supplied, play it first
    if (directAudioUrl) {
      try {
        await this.playAudioUrl(directAudioUrl, speed);
        return;
      } catch (err) {
        console.warn("[NaturalAudio] Direct audio failed, falling back to natural speech stream", err);
      }
    }

    // 2. High-quality natural pronunciation stream (Google Natural Audio Endpoint)
    // Produces clear, human-like US English pronunciation
    const naturalUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(
      cleanText
    )}`;

    try {
      await this.playAudioUrl(naturalUrl, speed);
      return;
    } catch (err) {
      console.warn("[NaturalAudio] Natural stream failed, falling back to browser speech", err);
    }

    // 3. Last-resort fallback to browser SpeechSynthesis
    this.fallbackWebSpeech(cleanText, speed);
  }

  private playAudioUrl(url: string, speed: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.playbackRate = speed;
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        resolve();
      };

      audio.onerror = (e) => {
        this.currentAudio = null;
        reject(e);
      };

      audio.play().catch(reject);
    });
  }

  private fallbackWebSpeech(text: string, speed: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = speed * 0.9;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const naturalAudio = new NaturalAudioService();
