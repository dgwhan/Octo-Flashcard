using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GamificationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IGamificationService _gamificationService;
        private readonly ILeaderboardService _leaderboardService;
        private readonly IUserUtils _userUtils;

        public GamificationController(
            AppDbContext context, 
            IGamificationService gamificationService,
            ILeaderboardService leaderboardService, 
            IUserUtils userUtils)
        {
            _context = context;
            _gamificationService = gamificationService;
            _leaderboardService = leaderboardService;
            _userUtils = userUtils;
        }

        public class LeaderboardResponse
        {
            public List<LeaderboardEntryDto> Entries { get; set; } = new();
            public int UserRank { get; set; }
        }

        public class SetFeaturedBadgeDto
        {
            public Guid? BadgeId { get; set; }
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            // Tải thông tin user kèm FeaturedBadge
            var user = await _context.Users
                .Include(u => u.FeaturedBadge)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound(ApiResponse<object>.ErrorResponse("User not found"));

            // Tính toán tổng số phút tập trung hôm nay (UTC)
            var todayUtc = DateTime.UtcNow.Date;
            var focusedMinutesToday = await _context.FocusSessions
                .Where(f => f.UserId == userId && f.StartTime >= todayUtc)
                .SumAsync(f => f.DurationMinutes);

            // Công thức XP yêu cầu của cấp độ hiện tại để lên cấp tiếp theo
            double nextLevelXp = Math.Round(100 * Math.Pow(user.Level, 1.5));

            var summary = new GamificationSummaryDto
            {
                Level = user.Level,
                ExpPoints = user.ExpPoints,
                NextLevelXp = nextLevelXp,
                Coins = user.Coins,
                Streak = user.Streak,
                DailyTargetMinutes = user.DailyTargetMinutes,
                FocusedMinutesToday = focusedMinutesToday,
                FeaturedBadgeId = user.FeaturedBadgeId,
                FeaturedBadgeName = user.FeaturedBadge?.Name ?? string.Empty,
                FeaturedBadgeIcon = user.FeaturedBadge?.IconUrl ?? string.Empty
            };

            return Ok(ApiResponse<GamificationSummaryDto>.SuccessResponse(summary));
        }

        [HttpGet("badges")]
        public async Task<IActionResult> GetBadges()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var allBadges = await _context.Badges.ToListAsync();
            var userBadges = await _context.UserBadges
                .Where(ub => ub.UserId == userId)
                .ToDictionaryAsync(ub => ub.BadgeId, ub => ub.EarnedAt);

            var badgeDtos = allBadges.Select(b => new BadgeDto
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                IconUrl = b.IconUrl,
                MetricType = b.MetricType,
                ThresholdValue = b.ThresholdValue,
                IsUnlocked = userBadges.ContainsKey(b.Id),
                EarnedAt = userBadges.ContainsKey(b.Id) ? userBadges[b.Id] : (DateTime?)null
            }).ToList();

            return Ok(ApiResponse<List<BadgeDto>>.SuccessResponse(badgeDtos));
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard([FromQuery] string sortBy = "Level")
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            // Đảm bảo giá trị sortBy hợp lệ
            if (sortBy != "Level" && sortBy != "Achievements" && sortBy != "Pet")
            {
                sortBy = "Level";
            }

            var entries = await _leaderboardService.GetGlobalLeaderboardAsync(20, sortBy);
            var userRank = await _leaderboardService.GetUserRankAsync(userId, sortBy);

            var response = new LeaderboardResponse
            {
                Entries = entries,
                UserRank = userRank
            };

            return Ok(ApiResponse<LeaderboardResponse>.SuccessResponse(response));
        }

        [HttpPut("featured-badge")]
        public async Task<IActionResult> SetFeaturedBadge([FromBody] SetFeaturedBadgeDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var success = await _gamificationService.SetFeaturedBadgeAsync(userId, dto.BadgeId);
            if (!success)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("The featured badge cannot be assigned. Have you unlocked this badge yet?"));
            }

            return Ok(ApiResponse<object>.SuccessResponse(null, "Updated the list of outstanding achievements!"));
        }
    }
}
