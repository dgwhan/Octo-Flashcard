using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    public interface INotificationService
    {
        Task<IEnumerable<UserNotificationDto>> GetNotificationsByUserIdAsync(string userId);
        Task<bool> DeleteNotificationAsync(Guid id, string userId);
        Task<bool> ClearAllNotificationsAsync(string userId);
        Task<UserNotificationDto> CreateNotificationAsync(string userId, string title, string message, string type);
    }
}
