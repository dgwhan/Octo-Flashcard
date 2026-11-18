using System;

namespace StudyFlowBackend.Models
{
    public class UserGrammarProgress
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        /// <summary>
        /// ID của người dùng học ngữ pháp
        /// </summary>
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }

        /// <summary>
        /// Mã định danh của chủ điểm ngữ pháp trong Roadmap (vd: "present-simple", "passive-voice")
        /// </summary>
        public string TopicId { get; set; } = string.Empty;

        /// <summary>
        /// Trạng thái đã hoàn thành đọc/nghiên cứu lý thuyết chưa
        /// </summary>
        public bool IsTheoryCompleted { get; set; } = false;

        /// <summary>
        /// Trạng thái đã hoàn thành bài tập thực hành chưa
        /// </summary>
        public bool IsPracticeCompleted { get; set; } = false;

        /// <summary>
        /// Điểm bài tập thực hành gần nhất (0 - 100)
        /// </summary>
        public int PracticeScore { get; set; } = 0;

        /// <summary>
        /// Tổng số câu hỏi thực hành trong bài
        /// </summary>
        public int PracticeTotalQuestions { get; set; } = 0;

        /// <summary>
        /// Số câu trả lời đúng trong bài thực hành
        /// </summary>
        public int PracticeCorrectAnswers { get; set; } = 0;

        /// <summary>
        /// Trạng thái đã hoàn thành bài kiểm tra ôn tập củng cố chưa
        /// </summary>
        public bool IsReviewCompleted { get; set; } = false;

        /// <summary>
        /// Điểm độ thuần thục bài ôn tập (0 - 100)
        /// </summary>
        public int MasteryScore { get; set; } = 0;

        /// <summary>
        /// Trạng thái học: NotStarted, InProgress, Completed
        /// </summary>
        public string Status { get; set; } = "NotStarted";

        /// <summary>
        /// Thời điểm hoàn thành toàn bộ chủ điểm (Lý thuyết + Thực hành + Ôn tập)
        /// </summary>
        public DateTime? CompletedAt { get; set; }

        /// <summary>
        /// Lần học gần nhất
        /// </summary>
        public DateTime LastStudiedAt { get; set; } = DateTime.UtcNow;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
