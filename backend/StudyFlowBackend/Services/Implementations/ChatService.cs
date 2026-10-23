using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;
using StudyFlowBackend.Services.Interfaces;

namespace StudyFlowBackend.Services.Implementations
{
    public class ChatService : IChatService
    {
        private readonly IChatMessageRepository _chatMessageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IFlashcardService _flashcardService;
        private readonly IGeminiService _geminiService;

        public ChatService(
            IChatMessageRepository chatMessageRepository,
            IUserRepository userRepository,
            IFlashcardService flashcardService,
            IGeminiService geminiService)
        {
            _chatMessageRepository = chatMessageRepository;
            _userRepository = userRepository;
            _flashcardService = flashcardService;
            _geminiService = geminiService;
        }

        public async Task<List<ChatMessageDto>> GetChatHistoryAsync(string userId, int limit = 50)
        {
            var history = await _chatMessageRepository.GetRecentMessagesAsync(userId, limit);
            return history.Select(cm => new ChatMessageDto
            {
                Role = cm.Role,
                Content = cm.Content
            }).ToList();
        }

        public async Task ClearChatHistoryAsync(string userId)
        {
            await _chatMessageRepository.ClearHistoryAsync(userId);
        }

        public async Task<bool> CheckAndIncrementAiLimitAsync(User user)
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
            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();
            return true;
        }

        public async Task DecrementAiLimitAsync(User user)
        {
            if (user.DailyAiRequestsUsed > 0)
            {
                user.DailyAiRequestsUsed--;
                _userRepository.Update(user);
                await _userRepository.SaveChangesAsync();
            }
        }

        public async Task<ChatResponseDto?> ProcessChatAsync(User user, string message)
        {
            // Fetch last 10 messages for conversation context
            var history = await GetChatHistoryAsync(user.Id, limit: 10);

            // Fetch relevant flashcards for RAG
            var relevantCards = await _flashcardService.SearchRelevantFlashcardsAsync(user.Id, message, limit: 15);

            // Call Gemini
            var result = await _geminiService.ProcessChatWithContextAsync(message, history, relevantCards, user.Timezone);

            if (!result.IsSuccess)
            {
                await DecrementAiLimitAsync(user);
                return null;
            }

            // Save user message
            var userMsg = new ChatMessage
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Role = "user",
                Content = message,
                CreatedAt = DateTime.UtcNow
            };
            await _chatMessageRepository.AddAsync(userMsg);

            // Save AI reply message
            var modelMsg = new ChatMessage
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Role = "model",
                Content = result.Reply,
                CreatedAt = DateTime.UtcNow
            };
            await _chatMessageRepository.AddAsync(modelMsg);
            await _chatMessageRepository.SaveChangesAsync();

            return new ChatResponseDto
            {
                Response = result.Reply,
                DailyRequestsRemaining = Math.Max(0, 20 - user.DailyAiRequestsUsed),
                SuggestedActions = result.Actions
            };
        }
    }
}
