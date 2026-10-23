using System;

namespace StudyFlowBackend.Models
{
    public class ChatMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }
        
        public string Role { get; set; } = string.Empty; // "user" or "model"
        
        public string Content { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
