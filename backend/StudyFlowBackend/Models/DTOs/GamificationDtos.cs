using System;

namespace StudyFlowBackend.DTOs
{
    /// <summary>
    /// DTO đại diện cho một dòng trong bảng xếp hạng.
    /// </summary>
    public class LeaderboardEntryDto
    {
        public int Rank { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public int Level { get; set; }
        public double ExpPoints { get; set; }
        
        // Huy hiệu nổi bật gán cạnh tên
        public Guid? FeaturedBadgeId { get; set; }
        public string FeaturedBadgeName { get; set; } = string.Empty;
        public string FeaturedBadgeIcon { get; set; } = string.Empty;

        // Các chỉ số nâng cao phục vụ cho đa mục tiêu xếp hạng
        public int AchievementsCount { get; set; }
        public int PetLevel { get; set; }
        public string PetName { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO tóm tắt các chỉ số gamification hiện tại của người dùng.
    /// </summary>
    public class GamificationSummaryDto
    {
        public int Level { get; set; }
        public double ExpPoints { get; set; }
        public double NextLevelXp { get; set; }
        public int Coins { get; set; }
        public int Streak { get; set; }
        public int DailyTargetMinutes { get; set; }
        public int FocusedMinutesToday { get; set; }

        // Huy hiệu nổi bật gán cạnh tên
        public Guid? FeaturedBadgeId { get; set; }
        public string FeaturedBadgeName { get; set; } = string.Empty;
        public string FeaturedBadgeIcon { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO mô tả huy hiệu kèm trạng thái mở khóa của người dùng.
    /// </summary>
    public class BadgeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string IconUrl { get; set; } = string.Empty;
        public string MetricType { get; set; } = string.Empty;
        public int ThresholdValue { get; set; }
        public bool IsUnlocked { get; set; }
        public DateTime? EarnedAt { get; set; }
    }
}
