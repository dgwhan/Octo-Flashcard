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
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var sets = await _flashcardService.GetFlashcardSetsByUserIdAsync(userId);
            return Ok(ApiResponse<IEnumerable<FlashcardSetDto>>.SuccessResponse(sets));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFlashcardSet(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var set = await _flashcardService.GetFlashcardSetByIdAsync(id, userId);
            if (set == null) return NotFound(ApiResponse<object>.ErrorResponse("Could not find the flashcard set"));

            return Ok(ApiResponse<FlashcardSetDto>.SuccessResponse(set));
        }

        [HttpPost]
        public async Task<IActionResult> CreateFlashcardSet([FromBody] CreateFlashcardSetDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            try
            {
                var created = await _flashcardService.CreateFlashcardSetAsync(userId, dto);
                return CreatedAtAction(nameof(GetFlashcardSet), new { id = created.Id }, ApiResponse<FlashcardSetDto>.SuccessResponse(created, "Tạo bộ flashcard thành công"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlashcardSet(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var deleted = await _flashcardService.DeleteFlashcardSetAsync(id, userId);
            if (!deleted) return NotFound(ApiResponse<object>.ErrorResponse("Could not find the flashcard set"));

            return Ok(ApiResponse<object>.SuccessResponse(null, "Successfully deleted the flashcard set"));
        }
    }
}
