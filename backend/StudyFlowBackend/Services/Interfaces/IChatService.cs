using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Services.Interfaces
{
    public interface IChatService
    {
        Task<List<ChatMessageDto>> GetChatHistoryAsync(string userId, int limit = 50);
        Task ClearChatHistoryAsync(string userId);
        Task<ChatResponseDto?> ProcessChatAsync(User user, string message);
        Task<bool> CheckAndIncrementAiLimitAsync(User user);
        Task DecrementAiLimitAsync(User user);
    }
}
