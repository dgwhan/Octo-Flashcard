using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    public interface IFocusSessionService
    {
        Task<FocusSessionDto> CreateFocusSessionAsync(string userId, CreateFocusSessionDto dto);
        Task<IEnumerable<FocusSessionDto>> GetFocusSessionsByUserIdAsync(string userId);
        Task<IEnumerable<DailyFocusHeatmapDto>> GetHeatmapDataAsync(string userId, DateTime startDate, DateTime endDate);
    }
}
