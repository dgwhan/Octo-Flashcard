using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Triển khai dịch vụ xếp hạng người dùng đa mục tiêu (Level, Thành tích, Cấp độ Pet).
    /// </summary>
    public class LeaderboardService : ILeaderboardService
    {
        private readonly AppDbContext _context;

        public LeaderboardService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách bảng xếp hạng dựa trên tiêu chí sắp xếp.
        /// </summary>
        public async Task<List<LeaderboardEntryDto>> GetGlobalLeaderboardAsync(int limit, string sortBy)
        {
            var query = _context.Users
                .Include(u => u.Pet)
                .Include(u => u.UserBadges)
                .Include(u => u.FeaturedBadge)
                .AsQueryable();

            // Sắp xếp động dựa trên tham số sortBy
            if (sortBy == "Achievements")
            {
                query = query.OrderByDescending(u => u.UserBadges.Count)
                             .ThenByDescending(u => u.Level);
            }
            else if (sortBy == "Pet")
            {
                query = query.OrderByDescending(u => u.Pet != null ? u.Pet.Level : 0)
                             .ThenByDescending(u => u.Pet != null ? u.Pet.Exp : 0);
            }
            else // Mặc định xếp hạng theo "Level"
            {
                query = query.OrderByDescending(u => u.Level)
                             .ThenByDescending(u => u.ExpPoints);
            }

            var topUsers = await query.Take(limit).ToListAsync();
            var leaderboard = new List<LeaderboardEntryDto>();
            int rank = 1;

            foreach (var user in topUsers)
            {
                leaderboard.Add(new LeaderboardEntryDto
                {
                    Rank = rank++,
                    UserId = user.Id,
                    Username = user.Username,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl,
                    Level = user.Level,
                    ExpPoints = user.ExpPoints,
                    FeaturedBadgeId = user.FeaturedBadgeId,
                    FeaturedBadgeName = user.FeaturedBadge?.Name ?? string.Empty,
                    FeaturedBadgeIcon = user.FeaturedBadge?.IconUrl ?? string.Empty,
                    AchievementsCount = user.UserBadges.Count,
                    PetLevel = user.Pet?.Level ?? 0,
                    PetName = user.Pet?.Name ?? string.Empty
                });
            }

            return leaderboard;
        }

        /// <summary>
        /// Tìm kiếm thứ hạng của người dùng hiện tại dựa trên tiêu chí xếp hạng tương ứng.
        /// </summary>
        public async Task<int> GetUserRankAsync(string userId, string sortBy)
        {
            var currentUser = await _context.Users
                .Include(u => u.Pet)
                .Include(u => u.UserBadges)
                .FirstOrDefaultAsync(u => u.Id == userId);
                
            if (currentUser == null) return 0;

            int currentLevel = currentUser.Level;
            double currentXp = currentUser.ExpPoints;
            int currentBadgeCount = currentUser.UserBadges.Count;
            int currentPetLevel = currentUser.Pet?.Level ?? 0;
            double currentPetXp = currentUser.Pet?.Exp ?? 0;

            if (sortBy == "Achievements")
            {
                return await _context.Users
                    .CountAsync(u => u.UserBadges.Count > currentBadgeCount || 
                                    (u.UserBadges.Count == currentBadgeCount && u.Level > currentLevel)) + 1;
            }
            else if (sortBy == "Pet")
            {
                return await _context.Users
                    .CountAsync(u => (u.Pet != null ? u.Pet.Level : 0) > currentPetLevel || 
                                    ((u.Pet != null ? u.Pet.Level : 0) == currentPetLevel && (u.Pet != null ? u.Pet.Exp : 0) > currentPetXp)) + 1;
            }
            else // "Level"
            {
                return await _context.Users
                    .CountAsync(u => u.Level > currentLevel || 
                                    (u.Level == currentLevel && u.ExpPoints > currentXp)) + 1;
            }
        }
    }
}
