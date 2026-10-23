using System;

namespace StudyFlowBackend.Models
{
    public class FocusSession
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        public string UserId { get; set; } = string.Empty;
        
        public DateTime StartTime { get; set; }
        
        public DateTime EndTime { get; set; }
        
        /// <summary>
        /// Duration of the focus session in minutes
        /// </summary>
        public int DurationMinutes { get; set; }
        
        /// <summary>
        /// Mode: "Pomodoro" or "Custom"
        /// </summary>
        public string Mode { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Property
        public User User { get; set; } = null!;
    }
}
