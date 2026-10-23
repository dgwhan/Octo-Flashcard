using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IGamificationService _gamificationService;
        private readonly ILeaderboardService _leaderboardService;
        private readonly IUserUtils _userUtils;

        public GamificationController(
            IGamificationService gamificationService,
            ILeaderboardService leaderboardService, 
            IUserUtils userUtils)
        {
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

            var summary = await _gamificationService.GetSummaryAsync(userId);
            if (summary == null)
                return NotFound(ApiResponse<object>.ErrorResponse("User not found"));

            return Ok(ApiResponse<GamificationSummaryDto>.SuccessResponse(summary));
        }

        [HttpGet("badges")]
        public async Task<IActionResult> GetBadges()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var badgeDtos = await _gamificationService.GetBadgesAsync(userId);
            return Ok(ApiResponse<List<BadgeDto>>.SuccessResponse(badgeDtos));
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard([FromQuery] string sortBy = "Level")
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

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
