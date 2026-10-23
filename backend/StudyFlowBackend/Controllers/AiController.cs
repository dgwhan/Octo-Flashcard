using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Services;
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
        private readonly AppDbContext _context;
        private readonly IUserUtils _userUtils;

        public AiController(
            IGeminiService geminiService,
            IFlashcardService flashcardService,
            IScannedDocumentService documentService,
            AppDbContext context,
            IUserUtils userUtils)
        {
            _geminiService = geminiService;
            _flashcardService = flashcardService;
            _documentService = documentService;
            _context = context;
            _userUtils = userUtils;
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetChatHistory()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var history = await _context.ChatMessages
                .Where(cm => cm.UserId == userId)
                .OrderByDescending(cm => cm.CreatedAt)
                .Take(50)
                .OrderBy(cm => cm.CreatedAt)
                .Select(cm => new ChatMessageDto
                {
                    Role = cm.Role,
                    Content = cm.Content
                })
                .ToListAsync();

            return Ok(ApiResponse<IEnumerable<ChatMessageDto>>.SuccessResponse(history));
        }

        [HttpPost("clear")]
        public async Task<IActionResult> ClearChatHistory()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var messages = await _context.ChatMessages.Where(cm => cm.UserId == userId).ToListAsync();
            _context.ChatMessages.RemoveRange(messages);
            await _context.SaveChangesAsync();

            return Ok(ApiResponse<object>.SuccessResponse(null, "Chat history cleared."));
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequestDto request)
        {
            var user = await _userUtils.GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            // Kiểm tra và reset hạn mức hàng ngày (20 requests)
            if (!CheckAndIncrementAiRequestLimit(user))
            {
                return StatusCode(429, ApiResponse<object>.ErrorResponse("You have used up all your AI requests today (Maximum 20 requests/day). Please try again tomorrow!"));
            }

            // Lưu thay đổi quota tạm thời để giảm thiểu race condition (hoặc lưu khi thành công/thất bại)
            await _context.SaveChangesAsync();

            // 1. Lấy lịch sử hội thoại thực tế từ DB để gửi lên AI
            var history = await _context.ChatMessages
                .Where(cm => cm.UserId == user.Id)
                .OrderByDescending(cm => cm.CreatedAt)
                .Take(10)
                .OrderBy(cm => cm.CreatedAt)
                .Select(cm => new ChatMessageDto
                {
                    Role = cm.Role,
                    Content = cm.Content
                })
                .ToListAsync();

            // Tìm các flashcards liên quan để làm context (RAG Lite)
            var relevantCards = await _flashcardService.SearchRelevantFlashcardsAsync(user.Id, request.Message, limit: 15);

            // 2. Gửi request đến Gemini
            var result = await _geminiService.ProcessChatWithContextAsync(request.Message, history, relevantCards, user.Timezone);

            if (!result.IsSuccess)
            {
                // Revert quota
                if (user.DailyAiRequestsUsed > 0)
                {
                    user.DailyAiRequestsUsed--;
                    await _context.SaveChangesAsync();
                }
                return StatusCode(503, ApiResponse<object>.ErrorResponse(result.Reply));
            }

            // Lưu tin nhắn của user vào database
            var userMsg = new ChatMessage
            {
                UserId = user.Id,
                Role = "user",
                Content = request.Message,
                CreatedAt = DateTime.UtcNow
            };
            _context.ChatMessages.Add(userMsg);

            // Lưu câu trả lời của AI vào database
            var modelMsg = new ChatMessage
            {
                UserId = user.Id,
                Role = "model",
                Content = result.Reply,
                CreatedAt = DateTime.UtcNow
            };
            _context.ChatMessages.Add(modelMsg);
            await _context.SaveChangesAsync();

            var responseDto = new ChatResponseDto
            {
                Response = result.Reply,
                DailyRequestsRemaining = Math.Max(0, 20 - user.DailyAiRequestsUsed),
                SuggestedActions = result.Actions
            };

            return Ok(ApiResponse<ChatResponseDto>.SuccessResponse(responseDto));
        }

        [HttpPost("generate-flashcards")]
        public async Task<IActionResult> GenerateFlashcards([FromBody] GenerateFlashcardsRequestDto request)
        {
            var user = await _userUtils.GetCurrentUserAsync();
            if (user == null) return Unauthorized();

            // 1. Kiểm tra hạn mức request AI
            if (!CheckAndIncrementAiRequestLimit(user))
            {
                return StatusCode(429, ApiResponse<object>.ErrorResponse("You have used up all your AI requests today. Please try again tomorrow!"));
            }

            // 2. Lấy tài liệu scan
            var doc = await _context.ScannedDocuments.FirstOrDefaultAsync(d => d.Id == request.DocumentId && d.UserId == user.Id);
            if (doc == null)
            {
                // Revert quota
                if (user.DailyAiRequestsUsed > 0)
                {
                    user.DailyAiRequestsUsed--;
                    await _context.SaveChangesAsync();
                }
                return NotFound(ApiResponse<object>.ErrorResponse("Could not find the scanned document."));
            }

            if (string.IsNullOrWhiteSpace(doc.ExtractedText))
            {
                // Revert quota
                if (user.DailyAiRequestsUsed > 0)
                {
                    user.DailyAiRequestsUsed--;
                    await _context.SaveChangesAsync();
                }
                return BadRequest(ApiResponse<object>.ErrorResponse("The document does not contain any extracted text."));
            }

            // Lưu thay đổi hạn mức request trước khi gọi
            await _context.SaveChangesAsync();

            // 3. Sinh flashcard từ Gemini
            var generatedCards = await _geminiService.GenerateFlashcardsFromTextAsync(doc.ExtractedText);
            if (generatedCards == null || generatedCards.Count == 0)
            {
                // Revert quota
                if (user.DailyAiRequestsUsed > 0)
                {
                    user.DailyAiRequestsUsed--;
                    await _context.SaveChangesAsync();
                }
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
                // Revert quota if saving failed
                if (user.DailyAiRequestsUsed > 0)
                {
                    user.DailyAiRequestsUsed--;
                    await _context.SaveChangesAsync();
                }
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        private bool CheckAndIncrementAiRequestLimit(User user)
        {
            var today = DateTime.Today;
            
            if (user.LastAiRequestDate == null || user.LastAiRequestDate.Value.Date != today)
            {
                user.DailyAiRequestsUsed = 0;
                user.LastAiRequestDate = today;
            }

            if (user.DailyAiRequestsUsed >= 20)
            {
                return false;
            }

            user.DailyAiRequestsUsed++;
            return true;
        }
    }
}
