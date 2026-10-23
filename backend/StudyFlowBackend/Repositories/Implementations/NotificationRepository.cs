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
    public class NotificationRepository : BaseRepository<UserNotification>, INotificationRepository
    {
        public NotificationRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<UserNotification>> GetNotificationsByUserIdAsync(string userId)
        {
            return await _context.UserNotifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }

        public async Task<UserNotification?> GetByIdAsync(Guid id, string userId)
        {
            return await _context.UserNotifications
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
        }
    }
}
