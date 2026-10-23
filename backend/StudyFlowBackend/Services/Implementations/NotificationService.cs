using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<IEnumerable<UserNotificationDto>> GetNotificationsByUserIdAsync(string userId)
        {
            var notifications = await _notificationRepository.GetNotificationsByUserIdAsync(userId);
            return notifications.Select(MapToDto);
        }

        public async Task<bool> DeleteNotificationAsync(Guid id, string userId)
        {
            var notification = await _notificationRepository.GetByIdAsync(id, userId);
            if (notification == null) return false;

            _notificationRepository.Remove(notification);
            await _notificationRepository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ClearAllNotificationsAsync(string userId)
        {
            var notifications = await _notificationRepository.GetNotificationsByUserIdAsync(userId);
            if (!notifications.Any()) return true;

            _notificationRepository.RemoveRange(notifications);
            await _notificationRepository.SaveChangesAsync();
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

            await _notificationRepository.AddAsync(notification);
            await _notificationRepository.SaveChangesAsync();

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
