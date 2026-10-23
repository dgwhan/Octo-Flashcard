export interface AudiobookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  duration: string;
  durationSeconds: number;
  audioUrl: string;
  paragraphs: string[];
}

export interface Audiobook {
  id: string;
  slug: string;
  title: string;
  author: string;
  genre: string;
  year: string;
  coverUrl: string;
  description: string;
  librivoxId?: string;
  chapters: AudiobookChapter[];
}
