using System;

namespace StudyFlowBackend.Models
{
    /// <summary>
    /// Đặt tên là StudyTask thay vì Task để tránh trùng lặp với System.Threading.Tasks.Task của .NET
    /// </summary>
    public class StudyTask
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        /// <summary>
        /// Ngày mà task này được giao
        /// </summary>
        public DateTime Date { get; set; }
        
        public DateTime? StartTime { get; set; }
        
        public DateTime? EndTime { get; set; }
        
        public bool IsCompleted { get; set; } = false;

        public DateTime? ReminderTime { get; set; }

        public bool IsReminderSent { get; set; } = false;

        // --- Foreign Key ---
        // Liên kết Task này thuộc về User nào (dựa trên Firebase UID)
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }
    }
}
