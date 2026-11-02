using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.Models.DTOs;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GrammarController : ControllerBase
    {
        private readonly IGrammarService _grammarService;
        private readonly IUserUtils _userUtils;

        public GrammarController(IGrammarService grammarService, IUserUtils userUtils)
        {
            _grammarService = grammarService;
            _userUtils = userUtils;
        }

        /// <summary>
        /// Lấy toàn bộ tiến độ lộ trình ngữ pháp của người dùng kèm thống kê tổng quan
        /// </summary>
        [HttpGet("progress")]
        public async Task<IActionResult> GetRoadmapSummary()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));
            }

            try
            {
                var summary = await _grammarService.GetRoadmapSummaryAsync(userId);
                return Ok(ApiResponse<GrammarRoadmapSummaryDto>.SuccessResponse(summary));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, 
                    ApiResponse<object>.ErrorResponse($"Lỗi khi tải tiến độ ngữ pháp: {ex.Message}"));
            }
        }

        /// <summary>
        /// Lấy tiến độ học của một chủ điểm ngữ pháp cụ thể
        /// </summary>
        [HttpGet("progress/{topicId}")]
        public async Task<IActionResult> GetTopicProgress(string topicId)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));
            }

            try
            {
                var progress = await _grammarService.GetTopicProgressAsync(userId, topicId);
                return Ok(ApiResponse<GrammarProgressDto?>.SuccessResponse(progress));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    ApiResponse<object>.ErrorResponse($"Lỗi khi tải tiến độ chủ điểm: {ex.Message}"));
            }
        }

        /// <summary>
        /// Lưu hoặc cập nhật tiến độ học một chủ điểm ngữ pháp (hoàn thành lý thuyết, bài tập hoặc ôn tập)
        /// </summary>
        [HttpPost("progress")]
        public async Task<IActionResult> SaveProgress([FromBody] SaveGrammarProgressRequest request)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));
            }

            if (request == null || string.IsNullOrWhiteSpace(request.TopicId))
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("TopicId không được để trống"));
            }

            try
            {
                var updated = await _grammarService.SaveProgressAsync(userId, request);
                return Ok(ApiResponse<GrammarProgressDto>.SuccessResponse(updated, "Cập nhật tiến độ ngữ pháp thành công"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    ApiResponse<object>.ErrorResponse($"Lỗi khi lưu tiến độ ngữ pháp: {ex.Message}"));
            }
        }

        /// <summary>
        /// Đặt lại tiến độ của một chủ điểm để học lại
        /// </summary>
        [HttpPost("progress/{topicId}/reset")]
        public async Task<IActionResult> ResetProgress(string topicId)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));
            }

            try
            {
                var result = await _grammarService.ResetProgressAsync(userId, topicId);
                return Ok(ApiResponse<bool>.SuccessResponse(result, "Đã đặt lại tiến độ chủ điểm thành công"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    ApiResponse<object>.ErrorResponse($"Lỗi khi đặt lại tiến độ: {ex.Message}"));
            }
        }
    }
}
