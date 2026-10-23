using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.Constants;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    public class GamificationService : IGamificationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IGamificationRepository _gamificationRepository;
        private readonly IFocusSessionRepository _focusSessionRepository;
        private readonly ITaskRepository _taskRepository;
        private readonly INotificationService _notificationService;

        public GamificationService(
            IUserRepository userRepository,
            IGamificationRepository gamificationRepository,
            IFocusSessionRepository focusSessionRepository,
            ITaskRepository taskRepository,
            INotificationService notificationService)
        {
            _userRepository = userRepository;
            _gamificationRepository = gamificationRepository;
            _focusSessionRepository = focusSessionRepository;
            _taskRepository = taskRepository;
            _notificationService = notificationService;
        }

        private static double GetXpRequiredForLevel(int level)
        {
            return Math.Round(GamificationConstants.LevelUpBaseXp * Math.Pow(level, GamificationConstants.LevelUpExponent));
        }

        public async Task<GamificationSummaryDto?> GetSummaryAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId, includeRelations: true);
            if (user == null) return null;

            var todayUtc = DateTime.UtcNow.Date;
            var focusedMinutesToday = await _focusSessionRepository.GetFocusedMinutesTodayAsync(userId, todayUtc);
            double nextLevelXp = Math.Round(100 * Math.Pow(user.Level, 1.5));

            return new GamificationSummaryDto
            {
                Level = user.Level,
                ExpPoints = user.ExpPoints,
                NextLevelXp = nextLevelXp,
                Coins = user.Coins,
                Streak = user.Streak,
                DailyTargetMinutes = user.DailyTargetMinutes,
                FocusedMinutesToday = focusedMinutesToday,
                FeaturedBadgeId = user.FeaturedBadgeId,
                FeaturedBadgeName = user.FeaturedBadge?.Name ?? string.Empty,
                FeaturedBadgeIcon = user.FeaturedBadge?.IconUrl ?? string.Empty
            };
        }

        public async Task<List<BadgeDto>> GetBadgesAsync(string userId)
        {
            var allBadges = await _gamificationRepository.GetAllBadgesAsync();
            var userBadges = await _gamificationRepository.GetUserBadgesMapAsync(userId);

            return allBadges.Select(b => new BadgeDto
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                IconUrl = b.IconUrl,
                MetricType = b.MetricType,
                ThresholdValue = b.ThresholdValue,
                IsUnlocked = userBadges.ContainsKey(b.Id),
                EarnedAt = userBadges.ContainsKey(b.Id) ? userBadges[b.Id] : (DateTime?)null
            }).ToList();
        }

        public async Task<bool> AddXpAndCoinsAsync(string userId, double xpAmount, int coinsAmount, string reason)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return false;

            bool leveledUp = false;
            user.ExpPoints += xpAmount;
            user.Coins += coinsAmount;

            double requiredXp = GetXpRequiredForLevel(user.Level);
            while (user.ExpPoints >= requiredXp)
            {
                user.ExpPoints -= requiredXp;
                user.Level++;
                leveledUp = true;
                requiredXp = GetXpRequiredForLevel(user.Level);
            }

            user.UpdatedAt = DateTime.UtcNow;
            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                userId,
                "Reward earned",
                $"{reason}: +{xpAmount} XP and +{coinsAmount} coins.",
                "Reward"
            );

            if (leveledUp)
            {
                await _notificationService.CreateNotificationAsync(
                    userId,
                    "🎉 Congratulations on leveling up!",
                    $"You have reached Level {user.Level} through your dedication and hard work! Keep up the great work!",
                    "LevelUp"
                );
            }

            await CheckAndAwardBadgesAsync(userId);

            return leveledUp;
        }

        public async Task CheckAndAwardBadgesAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId, includeRelations: true);
            if (user == null) return;

            var allBadges = await _gamificationRepository.GetAllBadgesAsync();
            var earnedBadgeIds = user.UserBadges.Select(ub => ub.BadgeId).ToHashSet();
            var unearnedBadges = allBadges.Where(b => !earnedBadgeIds.Contains(b.Id)).ToList();

            if (!unearnedBadges.Any()) return;

            var totalFocusMinutes = await _focusSessionRepository.GetTotalFocusedMinutesAsync(userId);
            var tasksCompletedCount = await _taskRepository.GetCompletedTaskCountAsync(userId);
            int currentStreak = user.Streak;

            bool databaseChanged = false;

            foreach (var badge in unearnedBadges)
            {
                bool isEligible = false;

                switch (badge.MetricType)
                {
                    case "Level":
                        isEligible = user.Level >= badge.ThresholdValue;
                        break;
                    case "FocusMinutes":
                        isEligible = totalFocusMinutes >= badge.ThresholdValue;
                        break;
                    case "TasksCompleted":
                        isEligible = tasksCompletedCount >= badge.ThresholdValue;
                        break;
                    case "StreakDays":
                        isEligible = currentStreak >= badge.ThresholdValue;
                        break;
                }

                if (isEligible)
                {
                    var userBadge = new UserBadge
                    {
                        UserId = userId,
                        BadgeId = badge.Id,
                        EarnedAt = DateTime.UtcNow
                    };

                    await _gamificationRepository.AddUserBadgeAsync(userBadge);
                    databaseChanged = true;

                    user.Coins += GamificationConstants.BadgeUnlockedCoinsBonus;
                    user.ExpPoints += GamificationConstants.BadgeUnlockedXpBonus;

                    await _notificationService.CreateNotificationAsync(
                        userId,
                        $"🏆 New Achievement: {badge.Name}!",
                        $"You have successfully unlocked the badge '{badge.Name}' ({badge.Description}). Bonus +{GamificationConstants.BadgeUnlockedXpBonus} XP and +{GamificationConstants.BadgeUnlockedCoinsBonus} Coins!",
                        "Achievement"
                    );
                }
            }

            if (databaseChanged)
            {
                double requiredXp = GetXpRequiredForLevel(user.Level);
                bool secondaryLevelUp = false;
                while (user.ExpPoints >= requiredXp)
                {
                    user.ExpPoints -= requiredXp;
                    user.Level++;
                    secondaryLevelUp = true;
                    requiredXp = GetXpRequiredForLevel(user.Level);
                }

                user.UpdatedAt = DateTime.UtcNow;
                _userRepository.Update(user);
                await _userRepository.SaveChangesAsync();

                if (secondaryLevelUp)
                {
                    await _notificationService.CreateNotificationAsync(
                        userId,
                        "🎉 Level Up from Achievements!",
                        $"Thanks to your badge rewards, you have leveled up to Level {user.Level}!",
                        "LevelUp"
                    );
                }
            }
        }

        public async Task UpdateDailyTargetProgressAsync(string userId, int focusedMinutesToday)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return;

            var todayStr = DateTime.UtcNow.ToString("yyyy-MM-dd");

            if (focusedMinutesToday >= user.DailyTargetMinutes)
            {
                if (user.StreakHistory == null)
                {
                    user.StreakHistory = new List<string>();
                }

                if (!user.StreakHistory.Contains(todayStr))
                {
                    user.StreakHistory.Add(todayStr);

                    var yesterdayStr = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd");
                    if (user.LastStreakDate.HasValue && user.LastStreakDate.Value.ToString("yyyy-MM-dd") == yesterdayStr)
                    {
                        user.Streak++;
                    }
                    else if (!user.LastStreakDate.HasValue || user.LastStreakDate.Value.ToString("yyyy-MM-dd") != todayStr)
                    {
                        user.Streak = 1;
                    }

                    user.LastStreakDate = DateTime.UtcNow;

                    int streakRewardXp = (int)GamificationConstants.DailyTargetXpBonus;
                    int streakRewardCoins = GamificationConstants.DailyTargetCoinsBonus;

                    user.ExpPoints += streakRewardXp;
                    user.Coins += streakRewardCoins;

                    await _notificationService.CreateNotificationAsync(
                        userId,
                        $"🔥 Streak Maintained! Day {user.Streak}",
                        $"Great job! You achieved your study goal today. Your current streak is {user.Streak} days! (+{streakRewardXp} XP, +{streakRewardCoins} Coins)",
                        "Streak"
                    );

                    double requiredXp = GetXpRequiredForLevel(user.Level);
                    while (user.ExpPoints >= requiredXp)
                    {
                        user.ExpPoints -= requiredXp;
                        user.Level++;
                        requiredXp = GetXpRequiredForLevel(user.Level);
                    }

                    user.UpdatedAt = DateTime.UtcNow;
                    _userRepository.Update(user);
                    await _userRepository.SaveChangesAsync();

                    await CheckAndAwardBadgesAsync(userId);
                }
            }
        }

        public async Task<bool> SetFeaturedBadgeAsync(string userId, Guid? badgeId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return false;

            if (badgeId.HasValue)
            {
                var userBadge = await _gamificationRepository.GetUserBadgeAsync(userId, badgeId.Value);
                if (userBadge == null)
                {
                    return false;
                }
                user.FeaturedBadgeId = badgeId.Value;
            }
            else
            {
                user.FeaturedBadgeId = null;
            }

            user.UpdatedAt = DateTime.UtcNow;
            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();
            return true;
        }
    }
}
