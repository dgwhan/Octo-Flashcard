using System;
using System.Collections.Generic;

namespace StudyFlowBackend.Models.DTOs
{
    public class GrammarProgressDto
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string TopicId { get; set; } = string.Empty;
        public bool IsTheoryCompleted { get; set; }
        public bool IsPracticeCompleted { get; set; }
        public int PracticeScore { get; set; }
        public int PracticeTotalQuestions { get; set; }
        public int PracticeCorrectAnswers { get; set; }
        public bool IsReviewCompleted { get; set; }
        public int MasteryScore { get; set; }
        public string Status { get; set; } = "NotStarted";
        public DateTime? CompletedAt { get; set; }
        public DateTime LastStudiedAt { get; set; }
    }

    public class SaveGrammarProgressRequest
    {
        public string TopicId { get; set; } = string.Empty;

        /// <summary>
        /// null nếu không thay đổi, true nếu người dùng vừa học xong lý thuyết
        /// </summary>
        public bool? IsTheoryCompleted { get; set; }

        /// <summary>
        /// null nếu không nộp bài thực hành
        /// </summary>
        public bool? IsPracticeCompleted { get; set; }
        public int? PracticeScore { get; set; }
        public int? PracticeTotalQuestions { get; set; }
        public int? PracticeCorrectAnswers { get; set; }

        /// <summary>
        /// null nếu không nộp bài ôn tập
        /// </summary>
        public bool? IsReviewCompleted { get; set; }
        public int? MasteryScore { get; set; }
    }

    public class GrammarRoadmapSummaryDto
    {
        public int TotalTopicsCount { get; set; }
        public int CompletedTopicsCount { get; set; }
        public int InProgressTopicsCount { get; set; }
        public double CompletionPercentage { get; set; }
        public double AveragePracticeScore { get; set; }
        public double AverageMasteryScore { get; set; }
        public string? NextRecommendedTopicId { get; set; }
        public List<GrammarProgressDto> ProgressList { get; set; } = new();
    }
}
