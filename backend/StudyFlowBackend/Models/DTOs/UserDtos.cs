using System;
using System.Collections.Generic;

namespace StudyFlowBackend.DTOs
{
    public class SyncUserDto
    {
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public string Timezone { get; set; } = "Asia/Ho_Chi_Minh";
    }

    public class UpdateProfileDto
    {
        public string FullName { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public string? Timezone { get; set; }
    }

    public class UpdateStreakDto
    {
        public int Streak { get; set; }
        public DateTime LastStreakDate { get; set; }
        public List<string> StreakHistory { get; set; } = new();
    }
}
