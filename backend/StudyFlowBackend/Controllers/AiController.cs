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
        private readonly IUserSettingsService _settings;

        public AiController(
            IGeminiService geminiService,
            IFlashcardService flashcardService,
            IScannedDocumentService documentService,
            IChatService chatService,
            IUserUtils userUtils,
            IUserSettingsService settings)
        {
            _geminiService = geminiService;
            _flashcardService = flashcardService;
            _documentService = documentService;
            _chatService = chatService;
            _userUtils = userUtils;
            _settings = settings;
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

        // Generate cards from pasted text (e.g. a VOA story). Returns them for review; nothing is saved here.
        [HttpPost("generate-flashcards-from-text")]
        public async Task<IActionResult> GenerateFlashcardsFromText([FromBody] GenerateFlashcardsFromTextDto request)
        {
            var user = await _userUtils.GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            var text = request?.Text?.Trim() ?? string.Empty;
            if (text.Length < 40) return BadRequest(ApiResponse<object>.ErrorResponse("Đoạn văn quá ngắn (cần ít nhất 40 ký tự)."));
            if (text.Length > 8000) return BadRequest(ApiResponse<object>.ErrorResponse("Đoạn văn quá dài (tối đa 8000 ký tự)."));

            // With their own key (Settings) the user pays for the call, so the shared daily limit does not apply
            var own = await _settings.GetGeminiCredentialsAsync(user.Id);
            if (own == null && !await _chatService.CheckAndIncrementAiLimitAsync(user))
                return StatusCode(429, ApiResponse<object>.ErrorResponse("Bạn đã dùng hết lượt AI hôm nay. Thêm API key Gemini của bạn trong Cài đặt để dùng tiếp."));

            List<CreateFlashcardDto> cards;
            try
            {
                cards = await _geminiService.GenerateFlashcardsFromTextAsync(text, own?.ApiKey, own?.Model);
            }
            catch (InvalidOperationException)
            {
                // no server key and no user key
                await _chatService.DecrementAiLimitAsync(user);
                return StatusCode(503, ApiResponse<object>.ErrorResponse("Chưa có API key để tạo thẻ. Thêm API key Gemini của bạn trong Cài đặt."));
            }
            if (cards == null || cards.Count == 0)
            {
                if (own == null) await _chatService.DecrementAiLimitAsync(user);
                return StatusCode(503, ApiResponse<object>.ErrorResponse("AI chưa tạo được thẻ. Thử lại sau hoặc kiểm tra API key trong Cài đặt."));
            }

            return Ok(ApiResponse<List<CreateFlashcardDto>>.SuccessResponse(cards));
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
