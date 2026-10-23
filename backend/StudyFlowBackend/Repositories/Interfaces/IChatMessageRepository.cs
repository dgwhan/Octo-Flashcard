using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IChatMessageRepository : IBaseRepository<ChatMessage>
    {
        Task<List<ChatMessage>> GetRecentMessagesAsync(string userId, int limit = 50);
        Task ClearHistoryAsync(string userId);
    }
}
