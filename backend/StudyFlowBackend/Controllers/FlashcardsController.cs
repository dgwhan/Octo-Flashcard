using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FlashcardsController : ControllerBase
    {
        private readonly IFlashcardService _flashcardService;
        private readonly IUserUtils _userUtils;

        public FlashcardsController(IFlashcardService flashcardService, IUserUtils userUtils)
        {
            _flashcardService = flashcardService;
            _userUtils = userUtils;
        }

        [HttpGet]
        public async Task<IActionResult> GetFlashcardSets()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            try
            {
                var sets = await _flashcardService.GetFlashcardSetsByUserIdAsync(userId);
                return Ok(ApiResponse<IEnumerable<FlashcardSetDto>>.SuccessResponse(sets));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<object>.ErrorResponse($"Lỗi khi lấy danh sách bộ thẻ: {ex.Message}"));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFlashcardSet(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            try
            {
                var set = await _flashcardService.GetFlashcardSetByIdAsync(id, userId);
                if (set == null) return NotFound(ApiResponse<object>.ErrorResponse("Không tìm thấy bộ flashcard"));

                return Ok(ApiResponse<FlashcardSetDto>.SuccessResponse(set));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<object>.ErrorResponse($"Lỗi khi lấy chi tiết bộ thẻ: {ex.Message}"));
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateFlashcardSet([FromBody] CreateFlashcardSetDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            if (dto == null)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Dữ liệu tạo bộ thẻ không hợp lệ"));
            }

            try
            {
                var created = await _flashcardService.CreateFlashcardSetAsync(userId, dto);
                return StatusCode(StatusCodes.Status201Created, ApiResponse<FlashcardSetDto>.SuccessResponse(created, "Tạo bộ flashcard thành công"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<object>.ErrorResponse($"Lỗi khi tạo bộ thẻ: {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFlashcardSet(Guid id, [FromBody] UpdateFlashcardSetDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            if (dto == null)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Dữ liệu cập nhật không hợp lệ"));
            }

            try
            {
                var updated = await _flashcardService.UpdateFlashcardSetAsync(id, userId, dto);
                if (updated == null) return NotFound(ApiResponse<object>.ErrorResponse("Không tìm thấy bộ flashcard"));

                return Ok(ApiResponse<FlashcardSetDto>.SuccessResponse(updated, "Cập nhật bộ flashcard thành công"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<object>.ErrorResponse($"Lỗi khi cập nhật bộ flashcard: {ex.Message}"));
            }
        }

        [HttpPost("{id}/items")]
        public async Task<IActionResult> AddFlashcardItem(Guid id, [FromBody] CreateFlashcardDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            if (dto == null)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse("Dữ liệu thẻ mới không hợp lệ"));
            }

            try
            {
                var card = await _flashcardService.AddFlashcardItemAsync(id, userId, dto);
                if (card == null) return NotFound(ApiResponse<object>.ErrorResponse("Không tìm thấy bộ flashcard"));

                return StatusCode(StatusCodes.Status201Created, ApiResponse<FlashcardDto>.SuccessResponse(card, "Thêm thẻ ghi nhớ mới thành công"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<object>.ErrorResponse($"Lỗi khi thêm thẻ mới: {ex.Message}"));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlashcardSet(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            try
            {
                var deleted = await _flashcardService.DeleteFlashcardSetAsync(id, userId);
                if (!deleted) return NotFound(ApiResponse<object>.ErrorResponse("Không tìm thấy bộ flashcard"));

                return Ok(ApiResponse<object>.SuccessResponse(null, "Xóa bộ flashcard thành công"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<object>.ErrorResponse($"Lỗi khi xóa bộ thẻ: {ex.Message}"));
            }
        }
    }
}
