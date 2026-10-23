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
    public class FlashcardRepository : BaseRepository<FlashcardSet>, IFlashcardRepository
    {
        public FlashcardRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<FlashcardSet>> GetSetsByUserIdAsync(string userId)
        {
            return await _context.FlashcardSets
                .Include(fs => fs.Flashcards)
                .Where(fs => fs.UserId == userId)
                .OrderByDescending(fs => fs.CreatedAt)
                .ToListAsync();
        }

        public async Task<FlashcardSet?> GetSetByIdAsync(Guid id, string userId)
        {
            return await _context.FlashcardSets
                .Include(fs => fs.Flashcards)
                .FirstOrDefaultAsync(fs => fs.Id == id && fs.UserId == userId);
        }

        public async Task<int> GetTotalFlashcardCountAsync(string userId)
        {
            return await _context.Flashcards
                .CountAsync(f => f.FlashcardSet!.UserId == userId);
        }

        public async Task<List<Flashcard>> GetFlashcardsForSearchAsync(string userId)
        {
            return await _context.Flashcards
                .Include(f => f.FlashcardSet)
                .Where(f => f.FlashcardSet!.UserId == userId)
                .ToListAsync();
        }

        public async Task AddSetAsync(FlashcardSet set)
        {
            await _context.FlashcardSets.AddAsync(set);
        }

        public void RemoveSet(FlashcardSet set)
        {
            _context.FlashcardSets.Remove(set);
        }
    }
}
