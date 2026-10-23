using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    public class FocusSessionService : IFocusSessionService
    {
        private readonly IFocusSessionRepository _focusSessionRepository;
        private readonly IGamificationService _gamificationService;

        public FocusSessionService(
            IFocusSessionRepository focusSessionRepository,
            IGamificationService gamificationService)
        {
            _focusSessionRepository = focusSessionRepository;
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

            await _focusSessionRepository.AddAsync(session);
            await _focusSessionRepository.SaveChangesAsync();

            // Reward XP and Coins (+2 XP and +2 Coins per focused minute)
            int earnedXp = session.DurationMinutes * 2;
            int earnedCoins = session.DurationMinutes * 2;
            await _gamificationService.AddXpAndCoinsAsync(userId, earnedXp, earnedCoins, $"The training session has been completed. {session.DurationMinutes} phút ({session.Mode})");

            // Check and update Daily Target & Streak progress
            var todayUtc = DateTime.UtcNow.Date;
            var todayMinutes = await _focusSessionRepository.GetFocusedMinutesTodayAsync(userId, todayUtc);

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
            var sessions = await _focusSessionRepository.GetSessionsByUserIdAsync(userId);
            return sessions.Select(f => new FocusSessionDto
            {
                Id = f.Id,
                UserId = f.UserId,
                StartTime = f.StartTime,
                EndTime = f.EndTime,
                DurationMinutes = f.DurationMinutes,
                Mode = f.Mode,
                CreatedAt = f.CreatedAt
            });
        }

        public async Task<IEnumerable<DailyFocusHeatmapDto>> GetHeatmapDataAsync(string userId, DateTime startDate, DateTime endDate)
        {
            var sessions = await _focusSessionRepository.GetSessionsInDateRangeAsync(userId, startDate, endDate);

            var heatmapData = sessions
                .GroupBy(f => f.StartTime.Date)
                .Select(g => new DailyFocusHeatmapDto
                {
                    Date = g.Key,
                    TotalMinutes = g.Sum(f => f.DurationMinutes)
                })
                .OrderBy(h => h.Date)
                .ToList();

            return heatmapData;
        }
    }
}
