using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _context;

        public NotificationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserNotificationDto>> GetNotificationsByUserIdAsync(string userId)
        {
            var notifications = await _context.UserNotifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return notifications.Select(MapToDto);
        }

        public async Task<bool> DeleteNotificationAsync(Guid id, string userId)
        {
            var notification = await _context.UserNotifications
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (notification == null) return false;

            _context.UserNotifications.Remove(notification);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ClearAllNotificationsAsync(string userId)
        {
            var notifications = await _context.UserNotifications
                .Where(n => n.UserId == userId)
                .ToListAsync();

            if (!notifications.Any()) return true;

            _context.UserNotifications.RemoveRange(notifications);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserNotificationDto> CreateNotificationAsync(string userId, string title, string message, string type)
        {
            var notification = new UserNotification
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Title = title,
                Message = message,
                Type = type,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.UserNotifications.Add(notification);
            await _context.SaveChangesAsync();

            return MapToDto(notification);
        }

        private static UserNotificationDto MapToDto(UserNotification notification)
        {
            return new UserNotificationDto
            {
                Id = notification.Id,
                UserId = notification.UserId,
                Title = notification.Title,
                Message = notification.Message,
                CreatedAt = notification.CreatedAt,
                IsRead = notification.IsRead,
                Type = notification.Type
            };
        }
    }
}
