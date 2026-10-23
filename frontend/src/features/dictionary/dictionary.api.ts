import { DictionaryEntry } from "./dictionary.types";
import { naturalAudio } from "./naturalAudio";

const cache = new Map<string, DictionaryEntry[]>();

export const dictionaryApi = {
  async lookup(word: string): Promise<DictionaryEntry[]> {
    const cleanWord = word.trim().toLowerCase();
    if (!cleanWord) return [];

    if (cache.has(cleanWord)) {
      return cache.get(cleanWord)!;
    }

    try {
      // Use internal Next.js API proxy to completely bypass browser CORS restrictions
      const res = await fetch(`/api/dictionary?word=${encodeURIComponent(cleanWord)}`, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Không tìm thấy định nghĩa cho từ "${word}".`);
      }

      cache.set(cleanWord, data as DictionaryEntry[]);
      return data as DictionaryEntry[];
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error("Lỗi kết nối khi tra cứu từ điển.");
    }
  },

  playPronunciation(word: string, audioUrl?: string, speed: number = 1.0): void {
    naturalAudio.play(word, audioUrl, speed);
  },

  speakWebSpeech(text: string, speed: number = 1.0): void {
    naturalAudio.play(text, undefined, speed);
  },
};
