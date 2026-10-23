using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Giao diện dịch vụ quản lý tính năng Gamification (XP, Level, Streak, Huy hiệu).
    /// </summary>
    public interface IGamificationService
    {
        Task<GamificationSummaryDto?> GetSummaryAsync(string userId);
        Task<List<BadgeDto>> GetBadgesAsync(string userId);
        Task<bool> AddXpAndCoinsAsync(string userId, double xpAmount, int coinsAmount, string reason);
        Task CheckAndAwardBadgesAsync(string userId);
        Task UpdateDailyTargetProgressAsync(string userId, int focusedMinutesToday);
        Task<bool> SetFeaturedBadgeAsync(string userId, Guid? badgeId);
    }
}
