/** Study progress lives in localStorage, written by FlashCardViewer; the sets page reads it back. */
export const studyProgressKey = (userId: string | undefined, deckId: string | undefined) =>
  `octo_flashcard_study_${userId || "guest"}_${deckId}`;

/** How many cards of a deck the user has marked "mastered" (0 when nothing saved or storage unavailable). */
export function readMasteredCount(userId: string | undefined, deckId: string): number {
  try {
    const raw = localStorage.getItem(studyProgressKey(userId, deckId));
    const ids = raw ? (JSON.parse(raw) as { masteredIds?: unknown }).masteredIds : undefined;
    return Array.isArray(ids) ? ids.length : 0;
  } catch {
    return 0; // private mode / corrupted JSON: show no progress rather than crash the page
  }
}
