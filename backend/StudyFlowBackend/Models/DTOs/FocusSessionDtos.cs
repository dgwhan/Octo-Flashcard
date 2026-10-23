using System;

namespace StudyFlowBackend.DTOs
{
    public class FocusSessionDto
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int DurationMinutes { get; set; }
        public string Mode { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class CreateFocusSessionDto
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int DurationMinutes { get; set; }
        public string Mode { get; set; } = string.Empty;
    }

    public class DailyFocusHeatmapDto
    {
        public DateTime Date { get; set; }
        public int TotalMinutes { get; set; }
    }
}
