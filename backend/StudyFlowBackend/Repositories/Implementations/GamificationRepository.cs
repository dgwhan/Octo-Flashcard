using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Repositories.Implementations
{
    public class GamificationRepository : BaseRepository<Badge>, IGamificationRepository
    {
        public GamificationRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<Badge>> GetAllBadgesAsync()
        {
            return await _context.Badges.ToListAsync();
        }

        public async Task<Dictionary<Guid, DateTime>> GetUserBadgesMapAsync(string userId)
        {
            return await _context.UserBadges
                .Where(ub => ub.UserId == userId)
                .ToDictionaryAsync(ub => ub.BadgeId, ub => ub.EarnedAt);
        }

        public async Task<List<UserBadge>> GetUserBadgesAsync(string userId)
        {
            return await _context.UserBadges
                .Include(ub => ub.Badge)
                .Where(ub => ub.UserId == userId)
                .ToListAsync();
        }

        public async Task<UserBadge?> GetUserBadgeAsync(string userId, Guid badgeId)
        {
            return await _context.UserBadges
                .FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BadgeId == badgeId);
        }

        public async Task AddUserBadgeAsync(UserBadge userBadge)
        {
            await _context.UserBadges.AddAsync(userBadge);
        }

        public async Task<Badge?> GetBadgeByIdAsync(Guid badgeId)
        {
            return await _context.Badges.FirstOrDefaultAsync(b => b.Id == badgeId);
        }
    }
}
