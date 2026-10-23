using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IScannedDocumentRepository : IBaseRepository<ScannedDocument>
    {
        Task<List<ScannedDocument>> GetAllByUserIdAsync(string userId);
        Task<ScannedDocument?> GetByIdAsync(Guid id, string userId);
        Task<ScannedDocument?> GetByIdAnyUserAsync(Guid id);
        Task<List<ScannedDocument>> SearchAsync(string userId, string query);
        Task<List<ScannedDocument>> GetTrashAsync(string userId);
        Task<ScannedDocument?> GetTrashByIdAsync(Guid id, string userId);
        Task<List<ScannedDocument>> GetByIdsAsync(string userId, List<Guid> ids);
        Task<List<ScannedDocument>> GetDeletedBeforeAsync(DateTime cutoffDate);
        Task<long> GetTotalStorageBytesAsync(string userId);
        Task<int> GetDocumentCountAsync(string userId);
    }
}
