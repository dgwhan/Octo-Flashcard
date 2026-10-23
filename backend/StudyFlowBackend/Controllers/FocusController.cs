using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services;
using System.Security.Claims;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Yêu cầu Firebase token hợp lệ (đã được JWT Middleware xác thực)
    public class FocusController : ControllerBase
    {
        private readonly IFocusSessionService _focusSessionService;

        public FocusController(IFocusSessionService focusSessionService)
        {
            _focusSessionService = focusSessionService;
        }

        private string GetUserId()
        {
            // Lấy UID từ claims (được map từ Firebase Token bởi Middleware)
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }
            return userId;
        }

        [HttpPost("sessions")]
        public async Task<ActionResult<FocusSessionDto>> CreateFocusSession([FromBody] CreateFocusSessionDto dto)
        {
            try
            {
                var userId = GetUserId();
                var createdSession = await _focusSessionService.CreateFocusSessionAsync(userId, dto);
                return Ok(createdSession);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("sessions")]
        public async Task<ActionResult<IEnumerable<FocusSessionDto>>> GetFocusSessions()
        {
            try
            {
                var userId = GetUserId();
                var sessions = await _focusSessionService.GetFocusSessionsByUserIdAsync(userId);
                return Ok(sessions);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("heatmap")]
        public async Task<ActionResult<IEnumerable<DailyFocusHeatmapDto>>> GetHeatmap([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                var userId = GetUserId();
                var heatmapData = await _focusSessionService.GetHeatmapDataAsync(userId, startDate, endDate);
                return Ok(heatmapData);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
