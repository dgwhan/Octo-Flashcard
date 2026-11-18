using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models.DTOs;

namespace StudyFlowBackend.Services.Interfaces
{
    public interface IGrammarService
    {
        Task<GrammarRoadmapSummaryDto> GetRoadmapSummaryAsync(string userId);
        Task<GrammarProgressDto?> GetTopicProgressAsync(string userId, string topicId);
        Task<GrammarProgressDto> SaveProgressAsync(string userId, SaveGrammarProgressRequest request);
        Task<bool> ResetProgressAsync(string userId, string topicId);
    }
}
