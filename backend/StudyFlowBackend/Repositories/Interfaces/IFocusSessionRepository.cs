using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IFocusSessionRepository : IBaseRepository<FocusSession>
    {
        Task<List<FocusSession>> GetSessionsByUserIdAsync(string userId);
        Task<int> GetFocusedMinutesTodayAsync(string userId, DateTime todayUtc);
        Task<int> GetTotalFocusedMinutesAsync(string userId);
        Task<List<FocusSession>> GetSessionsInDateRangeAsync(string userId, DateTime startDate, DateTime endDate);
    }
}
