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
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByIdAsync(string id, bool includeRelations = false)
        {
            if (!includeRelations)
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            }

            return await _context.Users
                .Include(u => u.Pet)
                .Include(u => u.UserBadges)
                .Include(u => u.FeaturedBadge)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var normalizedEmail = email.Trim().ToLower();
            return await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            var normalizedUsername = username.Trim().ToLower();
            return await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == normalizedUsername);
        }

        public async Task<User?> GetByIdentifierAsync(string identifier)
        {
            var normalized = identifier.Trim().ToLower();
            return await _context.Users.FirstOrDefaultAsync(u =>
                u.Username.ToLower() == normalized || u.Email.ToLower() == normalized);
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            var normalizedEmail = email.Trim().ToLower();
            return await _context.Users.AnyAsync(u => u.Email.ToLower() == normalizedEmail);
        }

        public async Task<bool> ExistsByUsernameAsync(string username)
        {
            var normalizedUsername = username.Trim().ToLower();
            return await _context.Users.AnyAsync(u => u.Username.ToLower() == normalizedUsername);
        }

        public async Task<List<User>> GetLeaderboardUsersAsync(int limit, string sortBy)
        {
            var query = _context.Users
                .Include(u => u.Pet)
                .Include(u => u.UserBadges)
                .Include(u => u.FeaturedBadge)
                .AsQueryable();

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
            else
            {
                query = query.OrderByDescending(u => u.Level)
                             .ThenByDescending(u => u.ExpPoints);
            }

            return await query.Take(limit).ToListAsync();
        }

        public async Task<int> GetUserRankAsync(User currentUser, string sortBy)
        {
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
            else
            {
                return await _context.Users
                    .CountAsync(u => u.Level > currentLevel ||
                                    (u.Level == currentLevel && u.ExpPoints > currentXp)) + 1;
            }
        }
    }
}
