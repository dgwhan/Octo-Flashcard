using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services.Implementations
{
    public class FlashcardService : IFlashcardService
    {
        private readonly IFlashcardRepository _flashcardRepository;

        public FlashcardService(IFlashcardRepository flashcardRepository)
        {
            _flashcardRepository = flashcardRepository;
        }

        public async Task<IEnumerable<FlashcardSetDto>> GetFlashcardSetsByUserIdAsync(string userId)
        {
            var sets = await _flashcardRepository.GetSetsByUserIdAsync(userId);
            return sets.Select(MapToSetDto);
        }

        public async Task<FlashcardSetDto?> GetFlashcardSetByIdAsync(Guid id, string userId)
        {
            var set = await _flashcardRepository.GetSetByIdAsync(id, userId);
            if (set == null) return null;
            return MapToSetDto(set);
        }

        public async Task<FlashcardSetDto> CreateFlashcardSetAsync(string userId, CreateFlashcardSetDto dto)
        {
            var existingCount = await GetTotalFlashcardCountAsync(userId);
            var cardLimit = 200;

            var targetDocId = (dto.TargetDocumentId.HasValue && dto.TargetDocumentId.Value != Guid.Empty)
                ? dto.TargetDocumentId
                : null;

            var set = new FlashcardSet
            {
                Id = Guid.NewGuid(),
                Title = string.IsNullOrWhiteSpace(dto.Title) ? "Learning Materials" : dto.Title.Trim(),
                UserId = userId,
                TargetDocumentId = targetDocId,
                CreatedAt = DateTime.UtcNow
            };

            var newCardsCount = dto.Flashcards?.Count ?? 0;
            if (existingCount + newCardsCount > cardLimit)
            {
                var allowedCount = cardLimit - existingCount;
                if (allowedCount <= 0)
                {
                    throw new InvalidOperationException("You have reached the maximum limit of 200 flashcards.");
                }

                if (dto.Flashcards != null)
                {
                    dto.Flashcards = dto.Flashcards.Take(allowedCount).ToList();
                }
            }

            if (dto.Flashcards != null)
            {
                foreach (var cardDto in dto.Flashcards)
                {
                    set.Flashcards.Add(new Flashcard
                    {
                        Id = Guid.NewGuid(),
                        FlashcardSetId = set.Id,
                        Question = cardDto.Question?.Trim() ?? string.Empty,
                        Answer = cardDto.Answer?.Trim() ?? string.Empty,
                        CreatedAt = DateTime.UtcNow
                    });
                }
            }

            await _flashcardRepository.AddSetAsync(set);
            await _flashcardRepository.SaveChangesAsync();

            return MapToSetDto(set);
        }

        public async Task<FlashcardSetDto?> UpdateFlashcardSetAsync(Guid id, string userId, UpdateFlashcardSetDto dto)
        {
            var set = await _flashcardRepository.GetSetByIdAsync(id, userId);
            if (set == null) return null;

            if (!string.IsNullOrWhiteSpace(dto.Title))
            {
                set.Title = dto.Title.Trim();
            }

            if (dto.NewFlashcards != null && dto.NewFlashcards.Count > 0)
            {
                var existingCount = await GetTotalFlashcardCountAsync(userId);
                var cardLimit = 200;
                var cardsToAdd = dto.NewFlashcards;

                if (existingCount + cardsToAdd.Count > cardLimit)
                {
                    var allowedCount = cardLimit - existingCount;
                    if (allowedCount > 0)
                    {
                        cardsToAdd = cardsToAdd.Take(allowedCount).ToList();
                    }
                    else
                    {
                        cardsToAdd = new List<CreateFlashcardDto>();
                    }
                }

                var cardsToAddEntities = new List<Flashcard>();
                foreach (var cardDto in cardsToAdd)
                {
                    cardsToAddEntities.Add(new Flashcard
                    {
                        Id = Guid.NewGuid(),
                        FlashcardSetId = set.Id,
                        Question = cardDto.Question?.Trim() ?? string.Empty,
                        Answer = cardDto.Answer?.Trim() ?? string.Empty,
                        CreatedAt = DateTime.UtcNow
                    });
                }

                if (cardsToAddEntities.Count > 0)
                {
                    await _flashcardRepository.AddCardsAsync(cardsToAddEntities);
                }
            }

            await _flashcardRepository.SaveChangesAsync();
            return MapToSetDto(set);
        }

        public async Task<FlashcardDto?> AddFlashcardItemAsync(Guid setId, string userId, CreateFlashcardDto dto)
        {
            var set = await _flashcardRepository.GetSetByIdAsync(setId, userId);
            if (set == null) return null;

            var existingCount = await GetTotalFlashcardCountAsync(userId);
            if (existingCount >= 200)
            {
                throw new InvalidOperationException("You have reached the maximum limit of 200 flashcards.");
            }

            var card = new Flashcard
            {
                Id = Guid.NewGuid(),
                Question = dto.Question?.Trim() ?? string.Empty,
                Answer = dto.Answer?.Trim() ?? string.Empty,
                FlashcardSetId = setId,
                CreatedAt = DateTime.UtcNow
            };

            await _flashcardRepository.AddCardAsync(card);
            await _flashcardRepository.SaveChangesAsync();

            return MapToDto(card);
        }

        public async Task<bool> DeleteFlashcardSetAsync(Guid id, string userId)
        {
            var set = await _flashcardRepository.GetSetByIdAsync(id, userId);
            if (set == null) return false;

            _flashcardRepository.RemoveSet(set);
            await _flashcardRepository.SaveChangesAsync();
            return true;
        }

        public async Task<List<FlashcardDto>> SearchRelevantFlashcardsAsync(string userId, string queryText, int limit = 15)
        {
            if (string.IsNullOrWhiteSpace(queryText))
            {
                return new List<FlashcardDto>();
            }

            var terms = queryText.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            var matchedCards = await _flashcardRepository.GetFlashcardsForSearchAsync(userId);

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
            return await _flashcardRepository.GetTotalFlashcardCountAsync(userId);
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
