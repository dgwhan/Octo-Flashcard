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
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly IUserUtils _userUtils;

        public NotificationsController(INotificationService notificationService, IUserUtils userUtils)
        {
            _notificationService = notificationService;
            _userUtils = userUtils;
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var notifications = await _notificationService.GetNotificationsByUserIdAsync(userId);
            return Ok(ApiResponse<IEnumerable<UserNotificationDto>>.SuccessResponse(notifications));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var result = await _notificationService.DeleteNotificationAsync(id, userId);
            if (!result)
                return NotFound(ApiResponse<object>.ErrorResponse("Notification not found"));

            return Ok(ApiResponse<object>.SuccessResponse(null, "Notification deleted successfully"));
        }

        [HttpDelete]
        public async Task<IActionResult> ClearNotifications()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            await _notificationService.ClearAllNotificationsAsync(userId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "All notifications cleared successfully"));
        }
    }
}
