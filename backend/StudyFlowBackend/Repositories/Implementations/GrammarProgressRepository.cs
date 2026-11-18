using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Repositories.Implementations
{
    public class GrammarProgressRepository : BaseRepository<UserGrammarProgress>, IGrammarProgressRepository
    {
        public GrammarProgressRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<UserGrammarProgress>> GetByUserIdAsync(string userId)
        {
            return await _context.GrammarProgresses
                .Where(gp => gp.UserId == userId)
                .OrderByDescending(gp => gp.LastStudiedAt)
                .ToListAsync();
        }

        public async Task<UserGrammarProgress?> GetByTopicIdAsync(string userId, string topicId)
        {
            return await _context.GrammarProgresses
                .FirstOrDefaultAsync(gp => gp.UserId == userId && gp.TopicId == topicId);
        }

        public async Task<int> GetCompletedCountAsync(string userId)
        {
            return await _context.GrammarProgresses
                .CountAsync(gp => gp.UserId == userId && gp.Status == "Completed");
        }
    }
}
