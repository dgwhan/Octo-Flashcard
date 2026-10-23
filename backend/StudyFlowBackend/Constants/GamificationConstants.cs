using System;
using System.Collections.Generic;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Constants
{
    /// <summary>
    /// Các hằng số quản lý luật chơi, thăng cấp và tương tác với thú cưng trong hệ thống Gamification.
    /// </summary>
    public static class GamificationConstants
    {
        // --- THĂNG CẤP VÀ HỌC TẬP (LEVEL & XP) ---
        /// <summary>
        /// Điểm kinh nghiệm cơ sở để tính mốc thăng cấp (Required XP = Base * Level ^ Exponent).
        /// </summary>
        public const double LevelUpBaseXp = 100.0;

        /// <summary>
        /// Số mũ lũy tiến độ khó cho việc thăng cấp.
        /// </summary>
        public const double LevelUpExponent = 1.5;

        /// <summary>
        /// Số XP cộng thêm khi hoàn thành một nhiệm vụ (Task).
        /// </summary>
        public const double TaskCompletedXp = 10.0;

        /// <summary>
        /// Số Coins cộng thêm khi hoàn thành một nhiệm vụ (Task).
        /// </summary>
        public const int TaskCompletedCoins = 10;

        /// <summary>
        /// Số XP cộng thêm cho mỗi phút tập trung (Focus Session).
        /// </summary>
        public const double FocusMinuteXpMultiplier = 2.0;

        /// <summary>
        /// Số Coins cộng thêm cho mỗi phút tập trung (Focus Session).
        /// </summary>
        public const int FocusMinuteCoinsMultiplier = 2;

        /// <summary>
        /// Điểm XP tặng thưởng khi đạt chỉ tiêu học tập hàng ngày (Daily Target).
        /// </summary>
        public const double DailyTargetXpBonus = 50.0;

        /// <summary>
        /// Điểm Coins tặng thưởng khi đạt chỉ tiêu học tập hàng ngày (Daily Target).
        /// </summary>
        public const int DailyTargetCoinsBonus = 30;

        /// <summary>
        /// Điểm XP tặng thưởng khi mở khóa một huy hiệu thành tích (Badge).
        /// </summary>
        public const double BadgeUnlockedXpBonus = 50.0;

        /// <summary>
        /// Điểm Coins tặng thưởng khi mở khóa một huy hiệu thành tích (Badge).
        /// </summary>
        public const int BadgeUnlockedCoinsBonus = 50;


        // --- THÚ CƯNG HỌC TẬP (STUDY PET) ---
        /// <summary>
        /// Điểm kinh nghiệm cơ sở của Pet để thăng cấp (Required Pet XP = Base * Level ^ Exponent).
        /// </summary>
        public const double PetLevelUpBaseXp = 50.0;

        /// <summary>
        /// Số mũ lũy tiến độ khó của thú cưng thăng cấp.
        /// </summary>
        public const double PetLevelUpExponent = 1.2;

        /// <summary>
        /// Số xu cần tiêu để mua thức ăn cho Pet.
        /// </summary>
        public const int PetFeedCost = 10;

        /// <summary>
        /// Số điểm no bụng tăng lên khi cho Pet ăn.
        /// </summary>
        public const int PetFeedHungerRecovery = 25;

        /// <summary>
        /// Số EXP của Pet tăng lên khi cho Pet ăn.
        /// </summary>
        public const double PetFeedExpGain = 15.0;

        /// <summary>
        /// Số EXP của Pet tăng lên khi chơi đùa/tương tác với Pet.
        /// </summary>
        public const double PetPlayExpGain = 10.0;

        /// <summary>
        /// Chỉ số Hunger tối đa của Pet.
        /// </summary>
        public const int PetMaxHunger = 100;

        /// <summary>
        /// Chỉ số no bụng giảm đi của Pet trên mỗi giờ trôi qua.
        /// </summary>
        public const int PetHungerDecayRatePerHour = 10;

        /// <summary>
        /// Danh sách 14 huy hiệu (Achievements) mặc định trong hệ thống và điều kiện để mở khóa chúng.
        /// </summary>
        public static readonly List<Badge> DefaultBadges = new()
        {
            // 1. Level Achievements
            new Badge
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Noob No More",
                Description = "Reach Level 5",
                IconUrl = "school",
                MetricType = "Level",
                ThresholdValue = 5,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Touching Grass? Never",
                Description = "Reach Level 10",
                IconUrl = "workspace_premium",
                MetricType = "Level",
                ThresholdValue = 10,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Certified Brainrot",
                Description = "Reach Level 20",
                IconUrl = "psychology",
                MetricType = "Level",
                ThresholdValue = 20,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Name = "Main Character Energy",
                Description = "Reach Level 50",
                IconUrl = "military_tech",
                MetricType = "Level",
                ThresholdValue = 50,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },

            // 2. Focus Minutes Achievements
            new Badge
            {
                Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                Name = "Locked In",
                Description = "Accumulate 1 hour of focus time",
                IconUrl = "timer",
                MetricType = "FocusMinutes",
                ThresholdValue = 60,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                Name = "Distraction Who?",
                Description = "Accumulate 10 hours of focus time",
                IconUrl = "hourglass_full",
                MetricType = "FocusMinutes",
                ThresholdValue = 600,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                Name = "Sigma Study Grind",
                Description = "Accumulate 50 hours of focus time",
                IconUrl = "self_improvement",
                MetricType = "FocusMinutes",
                ThresholdValue = 3000,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                Name = "Ultra Instinct",
                Description = "Accumulate 100 hours of focus time",
                IconUrl = "local_fire_department",
                MetricType = "FocusMinutes",
                ThresholdValue = 6000,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },

            // 3. Task Completion Achievements
            new Badge
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                Name = "The First W",
                Description = "Complete your first task",
                IconUrl = "done_outline",
                MetricType = "TasksCompleted",
                ThresholdValue = 1,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Name = "Task Destroyer",
                Description = "Complete 10 tasks",
                IconUrl = "playlist_add_check",
                MetricType = "TasksCompleted",
                ThresholdValue = 10,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Name = "Productivity Monster",
                Description = "Complete 50 tasks",
                IconUrl = "trending_up",
                MetricType = "TasksCompleted",
                ThresholdValue = 50,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },

            // 4. Streak Achievements
            new Badge
            {
                Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                Name = "Day One or One Day?",
                Description = "Maintain a 3-day streak",
                IconUrl = "bolt",
                MetricType = "StreakDays",
                ThresholdValue = 3,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                Name = "Built Different",
                Description = "Maintain a 7-day streak",
                IconUrl = "verified",
                MetricType = "StreakDays",
                ThresholdValue = 7,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            },
            new Badge
            {
                Id = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                Name = "Grassless Legend",
                Description = "Maintain a 30-day streak",
                IconUrl = "workspace_premium",
                MetricType = "StreakDays",
                ThresholdValue = 30,
                CreatedAt = new DateTime(2026, 6, 8, 0, 0, 0, DateTimeKind.Utc)
            }
        };
    }
}
