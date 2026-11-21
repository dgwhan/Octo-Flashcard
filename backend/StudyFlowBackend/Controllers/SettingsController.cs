using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    /// <summary>Per-user settings: Gemini key (stored encrypted, never returned) and voice preferences.</summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SettingsController : ControllerBase
    {
        private readonly IUserSettingsService _settings;
        private readonly IUserUtils _userUtils;

        public SettingsController(IUserSettingsService settings, IUserUtils userUtils)
        {
            _settings = settings;
            _userUtils = userUtils;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            return Ok(ApiResponse<UserSettingsDto>.SuccessResponse(await _settings.GetAsync(userId)));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateUserSettingsDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            try
            {
                return Ok(ApiResponse<UserSettingsDto>.SuccessResponse(await _settings.UpdateAsync(userId, dto)));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpPut("gemini-key")]
        [EnableRateLimiting("AuthPolicy")] // each attempt calls Google: keep key guessing slow
        public async Task<IActionResult> SetGeminiKey([FromBody] SetGeminiKeyDto dto, CancellationToken ct)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            try
            {
                var result = await _settings.SetGeminiKeyAsync(userId, dto, ct);
                return Ok(ApiResponse<UserSettingsDto>.SuccessResponse(result, "Đã lưu API key."));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
            catch (GeminiProxyException ex)
            {
                return StatusCode(ex.StatusCode == 429 ? 429 : 400, ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("gemini-key")]
        public async Task<IActionResult> ClearGeminiKey()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            return Ok(ApiResponse<UserSettingsDto>.SuccessResponse(await _settings.ClearGeminiKeyAsync(userId), "Đã xóa API key."));
        }
    }
}
