using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services.Interfaces
{
    public interface ISavedPhraseService
    {
        /// <summary>The user's saved phrases, newest first.</summary>
        Task<List<SavedPhraseDto>> GetAllAsync(string userId);

        /// <summary>Saves a phrase, or returns the existing one if the same text is already saved.
        /// Throws InvalidOperationException on invalid input or when the user's limit is reached.</summary>
        Task<SavePhraseResultDto> SaveAsync(string userId, CreateSavedPhraseDto dto);

        /// <summary>False if the phrase does not exist or belongs to someone else.</summary>
        Task<bool> DeleteAsync(string userId, Guid id);
    }
}
