import { apiClient, getAuthToken } from "@/src/lib/api";

/** Clamp a study session to whole minutes the backend will count (1–120). */
export function sessionMinutes(startedAt: Date, endedAt: Date): number {
  const min = Math.round((endedAt.getTime() - startedAt.getTime()) / 60000);
  return Math.min(120, Math.max(1, min));
}

/**
 * Record finished study time as a focus session. The backend turns it into XP, the daily target and
 * the streak (FocusSessionService). Fire-and-forget: a failed log must never interrupt studying.
 */
export async function logStudySession(mode: "Flashcard" | "Grammar", startedAt: Date, endedAt = new Date()) {
  if (!getAuthToken()) return;
  try {
    await apiClient.post("/focus/sessions", {
      startTime: startedAt.toISOString(),
      endTime: endedAt.toISOString(),
      durationMinutes: sessionMinutes(startedAt, endedAt),
      mode,
    });
  } catch (err) {
    console.warn("[studyLog] could not record session", err);
  }
}
