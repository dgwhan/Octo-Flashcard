using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserUtils _userUtils;

        public UsersController(IUserRepository userRepository, IUserUtils userUtils)
        {
            _userRepository = userRepository;
            _userUtils = userUtils;
        }

        [HttpPost("sync")]
        public async Task<IActionResult> SyncUser([FromBody] SyncUserDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var existingUser = await _userRepository.GetByIdAsync(userId);
            if (existingUser != null)
            {
                // Optionally update timezone if provided during sync
                if (!string.IsNullOrEmpty(dto.Timezone) && existingUser.Timezone != dto.Timezone)
                {
                    existingUser.Timezone = dto.Timezone;
                    existingUser.UpdatedAt = DateTime.UtcNow;
                    _userRepository.Update(existingUser);
                    await _userRepository.SaveChangesAsync();
                }
                return Ok(ApiResponse<User>.SuccessResponse(existingUser, "User already synced"));
            }

            var newUser = new User
            {
                Id = userId,
                Email = dto.Email,
                Username = dto.Username,
                FullName = dto.FullName,
                AvatarUrl = dto.AvatarUrl ?? string.Empty,
                Timezone = dto.Timezone ?? "Asia/Ho_Chi_Minh",
                Streak = 0,
                Level = 1,
                ExpPoints = 0,
                DailyTargetMinutes = 60,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(newUser);
            await _userRepository.SaveChangesAsync();

            return Ok(ApiResponse<User>.SuccessResponse(newUser, "User synced successfully"));
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return NotFound(ApiResponse<object>.ErrorResponse("User not found"));

            user.FullName = dto.FullName;
            user.AvatarUrl = dto.AvatarUrl;
            if (!string.IsNullOrEmpty(dto.Timezone))
            {
                user.Timezone = dto.Timezone;
            }
            user.UpdatedAt = DateTime.UtcNow;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return Ok(ApiResponse<User>.SuccessResponse(user, "Profile updated successfully"));
        }

        [HttpPut("streak")]
        public async Task<IActionResult> UpdateStreak([FromBody] UpdateStreakDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return NotFound(ApiResponse<object>.ErrorResponse("User not found"));

            user.Streak = dto.Streak;
            user.LastStreakDate = dto.LastStreakDate;
            user.StreakHistory = dto.StreakHistory;
            user.UpdatedAt = DateTime.UtcNow;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return Ok(ApiResponse<User>.SuccessResponse(user, "Streak updated successfully"));
        }
    }
}
