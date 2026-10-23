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
    public class FocusSessionRepository : BaseRepository<FocusSession>, IFocusSessionRepository
    {
        public FocusSessionRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<FocusSession>> GetSessionsByUserIdAsync(string userId)
        {
            return await _context.FocusSessions
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
        }

        public async Task<int> GetFocusedMinutesTodayAsync(string userId, DateTime todayUtc)
        {
            return await _context.FocusSessions
                .Where(f => f.UserId == userId && f.StartTime >= todayUtc)
                .SumAsync(f => f.DurationMinutes);
        }

        public async Task<int> GetTotalFocusedMinutesAsync(string userId)
        {
            return await _context.FocusSessions
                .Where(f => f.UserId == userId)
                .SumAsync(f => (int?)f.DurationMinutes) ?? 0;
        }

        public async Task<List<FocusSession>> GetSessionsInDateRangeAsync(string userId, DateTime startDate, DateTime endDate)
        {
            return await _context.FocusSessions
                .Where(f => f.UserId == userId && f.StartTime >= startDate && f.StartTime <= endDate)
                .ToListAsync();
        }
    }
}
