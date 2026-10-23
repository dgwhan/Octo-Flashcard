using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface INotificationRepository : IBaseRepository<UserNotification>
    {
        Task<List<UserNotification>> GetNotificationsByUserIdAsync(string userId);
        Task<UserNotification?> GetByIdAsync(Guid id, string userId);
    }
}
