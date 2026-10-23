using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Services.Implementations
{
    public class FlashcardService : IFlashcardService
    {
        private readonly AppDbContext _context;

        public FlashcardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FlashcardSetDto>> GetFlashcardSetsByUserIdAsync(string userId)
        {
            var sets = await _context.FlashcardSets
                .Include(fs => fs.Flashcards)
                .Where(fs => fs.UserId == userId)
                .OrderByDescending(fs => fs.CreatedAt)
                .ToListAsync();

            return sets.Select(MapToSetDto);
        }

        public async Task<FlashcardSetDto?> GetFlashcardSetByIdAsync(Guid id, string userId)
        {
            var set = await _context.FlashcardSets
                .Include(fs => fs.Flashcards)
                .FirstOrDefaultAsync(fs => fs.Id == id && fs.UserId == userId);

            if (set == null) return null;
            return MapToSetDto(set);
        }

        public async Task<FlashcardSetDto> CreateFlashcardSetAsync(string userId, CreateFlashcardSetDto dto)
        {
            // Kiểm tra số lượng card hiện tại của User
            var existingCount = await GetTotalFlashcardCountAsync(userId);
            var cardLimit = 200;

            var set = new FlashcardSet
            {
                Title = string.IsNullOrEmpty(dto.Title) ? "Learning Materials" : dto.Title,
                UserId = userId,
                TargetDocumentId = dto.TargetDocumentId,
                CreatedAt = DateTime.UtcNow
            };

            var newCardsCount = dto.Flashcards.Count;
            if (existingCount + newCardsCount > cardLimit)
            {
                // Giới hạn tối đa 200 flashcards, chỉ import số lượng còn lại
                var allowedCount = cardLimit - existingCount;
                if (allowedCount <= 0)
                {
                    throw new InvalidOperationException("You have reached the maximum limit of 200 flashcards.");
                }

                // Cắt bớt flashcard vượt hạn mức
                dto.Flashcards = dto.Flashcards.Take(allowedCount).ToList();
            }

            foreach (var cardDto in dto.Flashcards)
            {
                set.Flashcards.Add(new Flashcard
                {
                    Question = cardDto.Question,
                    Answer = cardDto.Answer,
                    CreatedAt = DateTime.UtcNow
                });
            }

            _context.FlashcardSets.Add(set);
            await _context.SaveChangesAsync();

            return MapToSetDto(set);
        }

        public async Task<bool> DeleteFlashcardSetAsync(Guid id, string userId)
        {
            var set = await _context.FlashcardSets
                .FirstOrDefaultAsync(fs => fs.Id == id && fs.UserId == userId);

            if (set == null) return false;

            _context.FlashcardSets.Remove(set);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<FlashcardDto>> SearchRelevantFlashcardsAsync(string userId, string queryText, int limit = 15)
        {
            if (string.IsNullOrWhiteSpace(queryText))
            {
                return new List<FlashcardDto>();
            }

            var terms = queryText.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);

            // Tìm kiếm đơn giản sử dụng keyword matching trên Question & Answer
            // Lấy tất cả flashcards của user để thực hiện search hoặc query trực tiếp bằng EF
            // Để tối ưu, chúng ta sẽ query trực tiếp
            var query = _context.Flashcards
                .Include(f => f.FlashcardSet)
                .Where(f => f.FlashcardSet!.UserId == userId);

            // Lọc ra các card khớp từ khóa
            var matchedCards = await query.ToListAsync();

            // Sắp xếp theo mức độ khớp từ khóa
            var scoredCards = matchedCards
                .Select(f => new
                {
                    Card = f,
                    Score = terms.Count(t => f.Question.ToLower().Contains(t) || f.Answer.ToLower().Contains(t))
                })
                .Where(x => x.Score > 0)
                .OrderByDescending(x => x.Score)
                .Take(limit)
                .Select(x => MapToDto(x.Card))
                .ToList();

            return scoredCards;
        }

        public async Task<int> GetTotalFlashcardCountAsync(string userId)
        {
            return await _context.Flashcards
                .CountAsync(f => f.FlashcardSet!.UserId == userId);
        }

        private static FlashcardDto MapToDto(Flashcard f)
        {
            return new FlashcardDto
            {
                Id = f.Id,
                Question = f.Question,
                Answer = f.Answer,
                FlashcardSetId = f.FlashcardSetId,
                CreatedAt = f.CreatedAt
            };
        }

        private static FlashcardSetDto MapToSetDto(FlashcardSet fs)
        {
            return new FlashcardSetDto
            {
                Id = fs.Id,
                Title = fs.Title,
                TargetDocumentId = fs.TargetDocumentId,
                CreatedAt = fs.CreatedAt,
                Flashcards = fs.Flashcards.Select(MapToDto).ToList()
            };
        }
    }
}
