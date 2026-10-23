using System;

namespace StudyFlowBackend.DTOs
{
    public class UserNotificationDto
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; }
        public string Type { get; set; } = "General";
    }
}
