using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Repositories.Implementations
{
    public class ChatMessageRepository : BaseRepository<ChatMessage>, IChatMessageRepository
    {
        public ChatMessageRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<ChatMessage>> GetRecentMessagesAsync(string userId, int limit = 50)
        {
            return await _context.ChatMessages
                .Where(cm => cm.UserId == userId)
                .OrderByDescending(cm => cm.CreatedAt)
                .Take(limit)
                .OrderBy(cm => cm.CreatedAt)
                .ToListAsync();
        }

        public async Task ClearHistoryAsync(string userId)
        {
            var messages = await _context.ChatMessages
                .Where(cm => cm.UserId == userId)
                .ToListAsync();

            if (messages.Any())
            {
                _context.ChatMessages.RemoveRange(messages);
                await _context.SaveChangesAsync();
            }
        }
    }
}
