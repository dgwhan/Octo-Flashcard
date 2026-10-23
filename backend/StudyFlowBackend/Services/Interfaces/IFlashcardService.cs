using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    public interface IFlashcardService
    {
        Task<IEnumerable<FlashcardSetDto>> GetFlashcardSetsByUserIdAsync(string userId);
        Task<FlashcardSetDto?> GetFlashcardSetByIdAsync(Guid id, string userId);
        Task<FlashcardSetDto> CreateFlashcardSetAsync(string userId, CreateFlashcardSetDto dto);
        Task<bool> DeleteFlashcardSetAsync(Guid id, string userId);
        Task<List<FlashcardDto>> SearchRelevantFlashcardsAsync(string userId, string queryText, int limit = 15);
        Task<int> GetTotalFlashcardCountAsync(string userId);
    }
}
