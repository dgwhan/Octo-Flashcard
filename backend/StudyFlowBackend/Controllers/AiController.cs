using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Services;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AiController : ControllerBase
    {
        private readonly IGeminiService _geminiService;
        private readonly IFlashcardService _flashcardService;
        private readonly IScannedDocumentService _documentService;
        private readonly IChatService _chatService;
        private readonly IUserUtils _userUtils;

        public AiController(
            IGeminiService geminiService,
            IFlashcardService flashcardService,
            IScannedDocumentService documentService,
            IChatService chatService,
            IUserUtils userUtils)
        {
            _geminiService = geminiService;
            _flashcardService = flashcardService;
            _documentService = documentService;
            _chatService = chatService;
            _userUtils = userUtils;
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetChatHistory()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var history = await _chatService.GetChatHistoryAsync(userId, limit: 50);
            return Ok(ApiResponse<IEnumerable<ChatMessageDto>>.SuccessResponse(history));
        }

        [HttpPost("clear")]
        public async Task<IActionResult> ClearChatHistory()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            await _chatService.ClearChatHistoryAsync(userId);
            return Ok(ApiResponse<object>.SuccessResponse(null, "Chat history cleared."));
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequestDto request)
        {
            var user = await _userUtils.GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            // Kiểm tra và reset hạn mức hàng ngày (20 requests)
            var allowed = await _chatService.CheckAndIncrementAiLimitAsync(user);
            if (!allowed)
            {
                return StatusCode(429, ApiResponse<object>.ErrorResponse("You have used up all your AI requests today (Maximum 20 requests/day). Please try again tomorrow!"));
            }

            var responseDto = await _chatService.ProcessChatAsync(user, request.Message);
            if (responseDto == null)
            {
                return StatusCode(503, ApiResponse<object>.ErrorResponse("Failed to process message with AI. Please try again later."));
            }

            return Ok(ApiResponse<ChatResponseDto>.SuccessResponse(responseDto));
        }

        [HttpPost("generate-flashcards")]
        public async Task<IActionResult> GenerateFlashcards([FromBody] GenerateFlashcardsRequestDto request)
        {
            var user = await _userUtils.GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            // 1. Kiểm tra hạn mức request AI
            var allowed = await _chatService.CheckAndIncrementAiLimitAsync(user);
            if (!allowed)
            {
                return StatusCode(429, ApiResponse<object>.ErrorResponse("You have used up all your AI requests today. Please try again tomorrow!"));
            }

            // 2. Lấy tài liệu scan thông qua Document Service
            var doc = await _documentService.GetByIdAsync(user.Id, request.DocumentId);
            if (doc == null)
            {
                await _chatService.DecrementAiLimitAsync(user);
                return NotFound(ApiResponse<object>.ErrorResponse("Could not find the scanned document."));
            }

            if (string.IsNullOrWhiteSpace(doc.ExtractedText))
            {
                await _chatService.DecrementAiLimitAsync(user);
                return BadRequest(ApiResponse<object>.ErrorResponse("The document does not contain any extracted text."));
            }

            // 3. Sinh flashcard từ Gemini
            var generatedCards = await _geminiService.GenerateFlashcardsFromTextAsync(doc.ExtractedText);
            if (generatedCards == null || generatedCards.Count == 0)
            {
                await _chatService.DecrementAiLimitAsync(user);
                return StatusCode(503, ApiResponse<object>.ErrorResponse("Could not generate flashcards from this document text."));
            }

            // 4. Lưu bộ flashcard vào DB
            var createDto = new CreateFlashcardSetDto
            {
                Title = string.IsNullOrEmpty(request.CustomTitle) ? $"Flashcards: {doc.Title}" : request.CustomTitle,
                TargetDocumentId = doc.Id,
                Flashcards = generatedCards
            };

            try
            {
                var createdSet = await _flashcardService.CreateFlashcardSetAsync(user.Id, createDto);
                return Ok(ApiResponse<FlashcardSetDto>.SuccessResponse(createdSet, "Successfully generated flashcards using AI!"));
            }
            catch (InvalidOperationException ex)
            {
                await _chatService.DecrementAiLimitAsync(user);
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }
    }
}
