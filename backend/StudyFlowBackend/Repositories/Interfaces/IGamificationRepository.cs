using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IGamificationRepository : IBaseRepository<Badge>
    {
        Task<List<Badge>> GetAllBadgesAsync();
        Task<Dictionary<Guid, DateTime>> GetUserBadgesMapAsync(string userId);
        Task<List<UserBadge>> GetUserBadgesAsync(string userId);
        Task<UserBadge?> GetUserBadgeAsync(string userId, Guid badgeId);
        Task AddUserBadgeAsync(UserBadge userBadge);
        Task<Badge?> GetBadgeByIdAsync(Guid badgeId);
    }
}
