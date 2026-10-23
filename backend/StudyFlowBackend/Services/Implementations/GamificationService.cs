using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;
using StudyFlowBackend.Constants;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Implementation of the gamification service for managing user experience (XP), coins, streaks, and badges.
    /// </summary>
    public class GamificationService : IGamificationService
    {
        private readonly AppDbContext _context;
        private readonly INotificationService _notificationService;

        public GamificationService(AppDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        /// <summary>
        /// Formula to calculate the XP required to level up: Required XP = Base * Level^Exponent
        /// </summary>
        private static double GetXpRequiredForLevel(int level)
        {
            return Math.Round(GamificationConstants.LevelUpBaseXp * Math.Pow(level, GamificationConstants.LevelUpExponent));
        }

        /// <summary>
        /// Adds Experience Points (XP) and Coins to the specified user.
        /// </summary>
        public async Task<bool> AddXpAndCoinsAsync(string userId, double xpAmount, int coinsAmount, string reason)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return false;

            bool leveledUp = false;
            user.ExpPoints += xpAmount;
            user.Coins += coinsAmount;

            // Handle level up logic if the user's XP exceeds the required threshold
            double requiredXp = GetXpRequiredForLevel(user.Level);
            while (user.ExpPoints >= requiredXp)
            {
                user.ExpPoints -= requiredXp;
                user.Level++;
                leveledUp = true;
                requiredXp = GetXpRequiredForLevel(user.Level);
            }

            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            await _notificationService.CreateNotificationAsync(
                userId,
                "Reward earned",
                $"{reason}: +{xpAmount} XP and +{coinsAmount} coins.",
                "Reward"
            );

            // Send notification on leveling up
            if (leveledUp)
            {
                await _notificationService.CreateNotificationAsync(
                    userId,
                    "🎉 Congratulations on leveling up!",
                    $"You have reached Level {user.Level} through your dedication and hard work! Keep up the great work!",
                    "LevelUp"
                );
            }

            // Check and unlock achievements after rewarding points
            await CheckAndAwardBadgesAsync(userId);

            return leveledUp;
        }

        /// <summary>
        /// Checks and automatically awards badges to the user based on their statistics.
        /// </summary>
        public async Task CheckAndAwardBadgesAsync(string userId)
        {
            var user = await _context.Users
                .Include(u => u.UserBadges)
                .FirstOrDefaultAsync(u => u.Id == userId);
            
            if (user == null) return;

            // Fetch all available badges from the database
            var allBadges = await _context.Badges.ToListAsync();
            
            // Filter badges that the user has not yet unlocked
            var earnedBadgeIds = user.UserBadges.Select(ub => ub.BadgeId).ToHashSet();
            var unearnedBadges = allBadges.Where(b => !earnedBadgeIds.Contains(b.Id)).ToList();

            if (!unearnedBadges.Any()) return;

            // Query learning statistics to evaluate unlock criteria
            var totalFocusMinutes = await _context.FocusSessions
                .Where(f => f.UserId == userId)
                .SumAsync(f => (int?)f.DurationMinutes) ?? 0;

            var tasksCompletedCount = await _context.Tasks
                .CountAsync(t => t.UserId == userId && t.IsCompleted);

            int currentStreak = user.Streak;

            bool databaseChanged = false;

            foreach (var badge in unearnedBadges)
            {
                bool isEligible = false;

                // Evaluate unlock criteria based on metric type
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
                    // Add new earned badge connection to user
                    var userBadge = new UserBadge
                    {
                        UserId = userId,
                        BadgeId = badge.Id,
                        EarnedAt = DateTime.UtcNow
                    };
                    
                    _context.UserBadges.Add(userBadge);
                    databaseChanged = true;

                    // Reward bonus coins and XP for unlocking a badge (configured in constants)
                    user.Coins += GamificationConstants.BadgeUnlockedCoinsBonus;
                    user.ExpPoints += GamificationConstants.BadgeUnlockedXpBonus;

                    // Send congratulatory notification
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
                // Re-evaluate level up logic in case the badge reward XP triggers a level up
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
                await _context.SaveChangesAsync();

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

        /// <summary>
        /// Updates the daily study duration progress and increments streak count if threshold is met.
        /// </summary>
        public async Task UpdateDailyTargetProgressAsync(string userId, int focusedMinutesToday)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return;

            // Get current date representation (excluding timezone hours)
            var todayStr = DateTime.UtcNow.ToString("yyyy-MM-dd");

            // If today is not in streak history yet and daily focus minutes targets are reached
            if (!user.StreakHistory.Contains(todayStr) && focusedMinutesToday >= user.DailyTargetMinutes)
            {
                var yesterdayStr = DateTime.UtcNow.AddDays(-1).ToString("yyyy-MM-dd");
                
                // Update streak chain
                if (user.LastStreakDate.HasValue && user.LastStreakDate.Value.ToString("yyyy-MM-dd") == yesterdayStr)
                {
                    user.Streak += 1;
                }
                else if (user.LastStreakDate.HasValue && user.LastStreakDate.Value.ToString("yyyy-MM-dd") == todayStr)
                {
                    // Already processed for today, do nothing
                }
                else
                {
                    user.Streak = 1; // Reset or start new streak chain
                }

                user.LastStreakDate = DateTime.UtcNow;
                user.StreakHistory.Add(todayStr);
                user.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                // Add special reward bonus for completing Daily Target
                await AddXpAndCoinsAsync(
                    userId, 
                    GamificationConstants.DailyTargetXpBonus, 
                    GamificationConstants.DailyTargetCoinsBonus, 
                    "Completed Daily Target"
                );

                await _notificationService.CreateNotificationAsync(
                    userId,
                    "🔥 Daily Target Achieved!",
                    $"Congratulations! You have completed your daily focus target of {user.DailyTargetMinutes} minutes today! Your current streak is: {user.Streak} days.",
                    "Streak"
                );
            }
        }

        /// <summary>
        /// Sets a specific badge as the user's featured title (displayed alongside their name).
        /// </summary>
        public async Task<bool> SetFeaturedBadgeAsync(string userId, Guid? badgeId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return false;

            if (badgeId == null)
            {
                user.FeaturedBadgeId = null;
                user.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return true;
            }

            // Verify if the user has unlocked this badge first
            var hasBadge = await _context.UserBadges.AnyAsync(ub => ub.UserId == userId && ub.BadgeId == badgeId.Value);
            if (!hasBadge) return false;

            user.FeaturedBadgeId = badgeId;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
