using System;

namespace StudyFlowBackend.Models
{
    public class UserNotification
    {
        public Guid Id { get; set; }
        
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }
        
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
        
        /// <summary>
        /// Loại thông báo: "Daily" (nhắc nhở ngày) hoặc "CustomTask" (nhắc nhở cụ thể công việc)
        /// </summary>
        public string Type { get; set; } = "General";
    }
}
