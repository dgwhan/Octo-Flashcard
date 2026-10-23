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
    public class ScannedDocumentRepository : BaseRepository<ScannedDocument>, IScannedDocumentRepository
    {
        public ScannedDocumentRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<ScannedDocument>> GetAllByUserIdAsync(string userId)
        {
            return await _context.ScannedDocuments
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
        }

        public async Task<ScannedDocument?> GetByIdAsync(Guid id, string userId)
        {
            return await _context.ScannedDocuments
                .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId);
        }

        public async Task<ScannedDocument?> GetByIdAnyUserAsync(Guid id)
        {
            return await _context.ScannedDocuments
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<List<ScannedDocument>> SearchAsync(string userId, string query)
        {
            var pattern = $"%{query}%";
            return await _context.ScannedDocuments
                .Where(d => d.UserId == userId &&
                    (EF.Functions.ILike(d.Title, pattern) ||
                     EF.Functions.ILike(d.ExtractedText, pattern)))
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<ScannedDocument>> GetTrashAsync(string userId)
        {
            return await _context.ScannedDocuments
                .IgnoreQueryFilters()
                .Where(d => d.UserId == userId && d.IsDeleted)
                .OrderByDescending(d => d.DeletedAt)
                .ToListAsync();
        }

        public async Task<ScannedDocument?> GetTrashByIdAsync(Guid id, string userId)
        {
            return await _context.ScannedDocuments
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId && d.IsDeleted);
        }

        public async Task<List<ScannedDocument>> GetByIdsAsync(string userId, List<Guid> ids)
        {
            return await _context.ScannedDocuments
                .Where(d => ids.Contains(d.Id) && d.UserId == userId && !d.IsDeleted)
                .ToListAsync();
        }

        public async Task<List<ScannedDocument>> GetDeletedBeforeAsync(DateTime cutoffDate)
        {
            return await _context.ScannedDocuments
                .IgnoreQueryFilters()
                .Where(d => d.IsDeleted && d.DeletedAt.HasValue && d.DeletedAt.Value <= cutoffDate)
                .ToListAsync();
        }

        public async Task<long> GetTotalStorageBytesAsync(string userId)
        {
            return await _context.ScannedDocuments
                .Where(d => d.UserId == userId)
                .SumAsync(d => d.ImageSizeBytes + d.TextSizeBytes);
        }

        public async Task<int> GetDocumentCountAsync(string userId)
        {
            return await _context.ScannedDocuments
                .CountAsync(d => d.UserId == userId);
        }
    }
}
