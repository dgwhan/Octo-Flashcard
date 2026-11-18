using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IGrammarProgressRepository : IBaseRepository<UserGrammarProgress>
    {
        Task<List<UserGrammarProgress>> GetByUserIdAsync(string userId);
        Task<UserGrammarProgress?> GetByTopicIdAsync(string userId, string topicId);
        Task<int> GetCompletedCountAsync(string userId);
    }
}
