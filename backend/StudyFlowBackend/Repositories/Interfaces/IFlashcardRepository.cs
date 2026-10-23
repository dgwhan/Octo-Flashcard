using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IFlashcardRepository : IBaseRepository<FlashcardSet>
    {
        Task<List<FlashcardSet>> GetSetsByUserIdAsync(string userId);
        Task<FlashcardSet?> GetSetByIdAsync(Guid id, string userId);
        Task<int> GetTotalFlashcardCountAsync(string userId);
        Task<List<Flashcard>> GetFlashcardsForSearchAsync(string userId);
        Task AddSetAsync(FlashcardSet set);
        void RemoveSet(FlashcardSet set);
    }
}
