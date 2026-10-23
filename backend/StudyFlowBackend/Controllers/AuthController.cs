using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserUtils _userUtils;

        public AuthController(IAuthService authService, IUserUtils userUtils)
        {
            _authService = authService;
            _userUtils = userUtils;
        }

        /// <summary>
        /// Register a new user with username, email, and password
        /// </summary>
        [HttpPost("register")]
        [EnableRateLimiting("AuthPolicy")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Invalid request data"));
            }

            var result = await _authService.RegisterAsync(dto);
            if (!result.Success)
            {
                if (result.Message.Contains("already exists", StringComparison.OrdinalIgnoreCase))
                {
                    return Conflict(result);
                }
                return BadRequest(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Login with username or email, and password
        /// </summary>
        [HttpPost("login")]
        [EnableRateLimiting("AuthPolicy")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Invalid request data"));
            }

            var result = await _authService.LoginAsync(dto);
            if (!result.Success)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }

        /// <summary>
        /// Get current authenticated user profile
        /// </summary>
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));
            }

            var result = await _authService.GetCurrentUserAsync(userId);
            if (!result.Success)
            {
                return NotFound(result);
            }

            return Ok(result);
        }
    }
}
