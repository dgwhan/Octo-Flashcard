using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    /// <summary>The learner's speaking phrasebook: phrases and corrected sentences saved from role-play feedback.</summary>
    [ApiController]
    [Route("api/speaking/phrases")]
    [Authorize]
    public class SpeakingPhrasesController : ControllerBase
    {
        private readonly ISavedPhraseService _phrases;
        private readonly IUserUtils _userUtils;

        public SpeakingPhrasesController(ISavedPhraseService phrases, IUserUtils userUtils)
        {
            _phrases = phrases;
            _userUtils = userUtils;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            return Ok(ApiResponse<List<SavedPhraseDto>>.SuccessResponse(await _phrases.GetAllAsync(userId)));
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] CreateSavedPhraseDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            try
            {
                var result = await _phrases.SaveAsync(userId, dto);
                return Ok(ApiResponse<SavePhraseResultDto>.SuccessResponse(result));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            return await _phrases.DeleteAsync(userId, id)
                ? Ok(ApiResponse<object>.SuccessResponse(new { }))
                : NotFound(ApiResponse<object>.ErrorResponse("Không tìm thấy câu này."));
        }
    }
}
