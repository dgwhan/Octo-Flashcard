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
    public class FocusSessionService : IFocusSessionService
    {
        private readonly AppDbContext _context;
        private readonly IGamificationService _gamificationService;

        public FocusSessionService(AppDbContext context, IGamificationService gamificationService)
        {
            _context = context;
            _gamificationService = gamificationService;
        }

        public async Task<FocusSessionDto> CreateFocusSessionAsync(string userId, CreateFocusSessionDto dto)
        {
            var session = new FocusSession
            {
                UserId = userId,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                DurationMinutes = dto.DurationMinutes,
                Mode = dto.Mode,
                CreatedAt = DateTime.UtcNow
            };

            _context.FocusSessions.Add(session);
            await _context.SaveChangesAsync();

            // Cộng XP và Coins (+2 XP và +2 Coins mỗi phút tập trung)
            int earnedXp = session.DurationMinutes * 2;
            int earnedCoins = session.DurationMinutes * 2;
            await _gamificationService.AddXpAndCoinsAsync(userId, earnedXp, earnedCoins, $"The training session has been completed. {session.DurationMinutes} phút ({session.Mode})");

            // Kiểm tra và cập nhật tiến trình Daily Target & Streak
            var todayUtc = DateTime.UtcNow.Date;
            var todayMinutes = await _context.FocusSessions
                .Where(f => f.UserId == userId && f.StartTime >= todayUtc)
                .SumAsync(f => f.DurationMinutes);

            await _gamificationService.UpdateDailyTargetProgressAsync(userId, todayMinutes);

            return new FocusSessionDto
            {
                Id = session.Id,
                UserId = session.UserId,
                StartTime = session.StartTime,
                EndTime = session.EndTime,
                DurationMinutes = session.DurationMinutes,
                Mode = session.Mode,
                CreatedAt = session.CreatedAt
            };
        }

        public async Task<IEnumerable<FocusSessionDto>> GetFocusSessionsByUserIdAsync(string userId)
        {
            return await _context.FocusSessions
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.CreatedAt)
                .Select(f => new FocusSessionDto
                {
                    Id = f.Id,
                    UserId = f.UserId,
                    StartTime = f.StartTime,
                    EndTime = f.EndTime,
                    DurationMinutes = f.DurationMinutes,
                    Mode = f.Mode,
                    CreatedAt = f.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<DailyFocusHeatmapDto>> GetHeatmapDataAsync(string userId, DateTime startDate, DateTime endDate)
        {
            // Group by Date part of StartTime
            var heatmapData = await _context.FocusSessions
                .Where(f => f.UserId == userId && f.StartTime >= startDate && f.StartTime <= endDate)
                .GroupBy(f => f.StartTime.Date)
                .Select(g => new DailyFocusHeatmapDto
                {
                    Date = g.Key,
                    TotalMinutes = g.Sum(f => f.DurationMinutes)
                })
                .OrderBy(h => h.Date)
                .ToListAsync();

            return heatmapData;
        }
    }
}
