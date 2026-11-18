import { axiosInstance, getAuthToken } from "@/src/lib/api";
import { UserGrammarProgress, GrammarRoadmapStats } from "./grammar.types";
import { GRAMMAR_ROADMAP_TOPICS } from "./grammar.data";

const LOCAL_STORAGE_KEY = "octo_grammar_progress_v1";

interface BackendApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

interface BackendRoadmapSummary {
  totalTopicsCount: number;
  completedTopicsCount: number;
  inProgressTopicsCount: number;
  completionPercentage: number;
  averagePracticeScore: number;
  averageMasteryScore: number;
  nextRecommendedTopicId: string | null;
  progressList: Array<{
    id: string;
    userId: string;
    topicId: string;
    isTheoryCompleted: boolean;
    isPracticeCompleted: boolean;
    practiceScore: number;
    practiceTotalQuestions: number;
    practiceCorrectAnswers: number;
    isReviewCompleted: boolean;
    masteryScore: number;
    status: "NotStarted" | "InProgress" | "Completed";
    completedAt?: string | null;
    lastStudiedAt: string;
  }>;
}

// Lấy tiến độ từ Local Storage (Guest / Offline fallback)
export function getLocalGrammarProgress(): Record<string, UserGrammarProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("[GrammarService] Failed to read localStorage:", err);
    return {};
  }
}

// Lưu tiến độ vào Local Storage
export function saveLocalGrammarProgress(progressMap: Record<string, UserGrammarProgress>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progressMap));
  } catch (err) {
    console.error("[GrammarService] Failed to save localStorage:", err);
  }
}

// Tính toán thống kê Roadmap từ map tiến độ
export function calculateLocalStats(progressMap: Record<string, UserGrammarProgress>): GrammarRoadmapStats {
  const totalTopics = GRAMMAR_ROADMAP_TOPICS.length;
  const progressList = Object.values(progressMap);

  const completedList = progressList.filter((p) => p.status === "Completed");
  const inProgressList = progressList.filter((p) => p.status === "InProgress");

  const completedCount = completedList.length;
  const inProgressCount = inProgressList.length;

  const percentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const scoredPractice = progressList.filter((p) => p.isPracticeCompleted && p.practiceScore > 0);
  const avgPractice =
    scoredPractice.length > 0
      ? Math.round(scoredPractice.reduce((sum, p) => sum + p.practiceScore, 0) / scoredPractice.length)
      : 0;

  const scoredMastery = progressList.filter((p) => p.isReviewCompleted && p.masteryScore > 0);
  const avgMastery =
    scoredMastery.length > 0
      ? Math.round(scoredMastery.reduce((sum, p) => sum + p.masteryScore, 0) / scoredMastery.length)
      : 0;

  const nextTopic = GRAMMAR_ROADMAP_TOPICS.find(
    (t) => !progressMap[t.id] || progressMap[t.id].status !== "Completed"
  );

  return {
    totalTopicsCount: totalTopics,
    completedTopicsCount: completedCount,
    inProgressTopicsCount: inProgressCount,
    completionPercentage: percentage,
    averagePracticeScore: avgPractice,
    averageMasteryScore: avgMastery,
    nextRecommendedTopicId: nextTopic ? nextTopic.id : GRAMMAR_ROADMAP_TOPICS[0].id,
  };
}

export const grammarService = {
  /**
   * Lấy toàn bộ tiến độ Roadmap của user (từ DB nếu đã login, hoặc fallback sang LocalStorage)
   */
  async getRoadmapProgress(): Promise<{
    progressMap: Record<string, UserGrammarProgress>;
    stats: GrammarRoadmapStats;
  }> {
    const token = getAuthToken();

    // Nếu đã đăng nhập, gọi API backend
    if (token) {
      try {
        const response = await axiosInstance.get<BackendApiResponse<BackendRoadmapSummary>>("/grammar/progress");
        if (response.data.success && response.data.data) {
          const summary = response.data.data;
          const map: Record<string, UserGrammarProgress> = {};

          summary.progressList.forEach((item) => {
            map[item.topicId] = {
              topicId: item.topicId,
              isTheoryCompleted: item.isTheoryCompleted,
              isPracticeCompleted: item.isPracticeCompleted,
              practiceScore: item.practiceScore,
              practiceTotalQuestions: item.practiceTotalQuestions,
              practiceCorrectAnswers: item.practiceCorrectAnswers,
              isReviewCompleted: item.isReviewCompleted,
              masteryScore: item.masteryScore,
              status: item.status,
              completedAt: item.completedAt,
              lastStudiedAt: item.lastStudiedAt,
            };
          });

          // Đồng bộ ngược lại Local Storage làm cache
          saveLocalGrammarProgress(map);

          return {
            progressMap: map,
            stats: {
              totalTopicsCount: summary.totalTopicsCount,
              completedTopicsCount: summary.completedTopicsCount,
              inProgressTopicsCount: summary.inProgressTopicsCount,
              completionPercentage: summary.completionPercentage,
              averagePracticeScore: summary.averagePracticeScore,
              averageMasteryScore: summary.averageMasteryScore,
              nextRecommendedTopicId: summary.nextRecommendedTopicId,
            },
          };
        }
      } catch (err) {
        console.warn("[GrammarService] Failed to fetch from backend, fallback to local storage:", err);
      }
    }

    // Guest mode hoặc Offline: Đọc từ LocalStorage
    const localMap = getLocalGrammarProgress();
    const stats = calculateLocalStats(localMap);
    return { progressMap: localMap, stats };
  },

  /**
   * Lưu hoặc cập nhật tiến độ học của một Topic
   */
  async saveTopicProgress(payload: {
    topicId: string;
    isTheoryCompleted?: boolean;
    isPracticeCompleted?: boolean;
    practiceScore?: number;
    practiceTotalQuestions?: number;
    practiceCorrectAnswers?: number;
    isReviewCompleted?: boolean;
    masteryScore?: number;
  }): Promise<UserGrammarProgress> {
    const localMap = getLocalGrammarProgress();
    const existing = localMap[payload.topicId] || {
      topicId: payload.topicId,
      isTheoryCompleted: false,
      isPracticeCompleted: false,
      practiceScore: 0,
      practiceTotalQuestions: 0,
      practiceCorrectAnswers: 0,
      isReviewCompleted: false,
      masteryScore: 0,
      status: "NotStarted",
      lastStudiedAt: new Date().toISOString(),
    };

    const updated: UserGrammarProgress = {
      ...existing,
      isTheoryCompleted: payload.isTheoryCompleted !== undefined ? payload.isTheoryCompleted : existing.isTheoryCompleted,
      isPracticeCompleted: payload.isPracticeCompleted !== undefined ? payload.isPracticeCompleted : existing.isPracticeCompleted,
      practiceScore: payload.practiceScore !== undefined ? Math.max(existing.practiceScore, payload.practiceScore) : existing.practiceScore,
      practiceTotalQuestions: payload.practiceTotalQuestions !== undefined ? payload.practiceTotalQuestions : existing.practiceTotalQuestions,
      practiceCorrectAnswers: payload.practiceCorrectAnswers !== undefined ? payload.practiceCorrectAnswers : existing.practiceCorrectAnswers,
      isReviewCompleted: payload.isReviewCompleted !== undefined ? payload.isReviewCompleted : existing.isReviewCompleted,
      masteryScore: payload.masteryScore !== undefined ? Math.max(existing.masteryScore, payload.masteryScore) : existing.masteryScore,
      lastStudiedAt: new Date().toISOString(),
    };

    // Đánh giá trạng thái
    if (updated.isTheoryCompleted && updated.isPracticeCompleted) {
      updated.status = "Completed";
      if (!updated.completedAt) updated.completedAt = new Date().toISOString();
    } else if (updated.isTheoryCompleted || updated.isPracticeCompleted || updated.isReviewCompleted) {
      if (updated.status !== "Completed") {
        updated.status = "InProgress";
      }
    }

    // Cập nhật local storage
    localMap[payload.topicId] = updated;
    saveLocalGrammarProgress(localMap);

    // Nếu đã đăng nhập, gửi lên backend để lưu DB theo UserId
    const token = getAuthToken();
    if (token) {
      try {
        await axiosInstance.post("/grammar/progress", payload);
      } catch (err) {
        console.warn("[GrammarService] Failed to sync progress with backend:", err);
      }
    }

    return updated;
  },

  /**
   * Reset tiến độ một topic
   */
  async resetTopicProgress(topicId: string): Promise<void> {
    const localMap = getLocalGrammarProgress();
    if (localMap[topicId]) {
      localMap[topicId] = {
        topicId,
        isTheoryCompleted: false,
        isPracticeCompleted: false,
        practiceScore: 0,
        practiceTotalQuestions: 0,
        practiceCorrectAnswers: 0,
        isReviewCompleted: false,
        masteryScore: 0,
        status: "NotStarted",
        lastStudiedAt: new Date().toISOString(),
      };
      saveLocalGrammarProgress(localMap);
    }

    const token = getAuthToken();
    if (token) {
      try {
        await axiosInstance.post(`/grammar/progress/${topicId}/reset`);
      } catch (err) {
        console.warn("[GrammarService] Failed to reset on backend:", err);
      }
    }
  },
};
