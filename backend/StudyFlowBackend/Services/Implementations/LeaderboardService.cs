using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    public class LeaderboardService : ILeaderboardService
    {
        private readonly IUserRepository _userRepository;

        public LeaderboardService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<LeaderboardEntryDto>> GetGlobalLeaderboardAsync(int limit, string sortBy)
        {
            var topUsers = await _userRepository.GetLeaderboardUsersAsync(limit, sortBy);
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

        public async Task<int> GetUserRankAsync(string userId, string sortBy)
        {
            var currentUser = await _userRepository.GetByIdAsync(userId, includeRelations: true);
            if (currentUser == null) return 0;

            return await _userRepository.GetUserRankAsync(currentUser, sortBy);
        }
    }
}
