using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Services.Interfaces;

namespace StudyFlowBackend.Services.Implementations
{
    public class SavedPhraseService : ISavedPhraseService
    {
        public const int MaxTextLength = 300;
        public const int MaxMeaningLength = 500;
        public const int MaxScenarioTitleLength = 120;
        private const int MaxPerUser = 2000;

        // Topic and scenario ids are short keys defined by the frontend scenario list
        private static readonly Regex KeyPattern = new(@"^[a-z0-9-]{1,40}$", RegexOptions.Compiled);
        private static readonly Regex Spaces = new(@"\s+", RegexOptions.Compiled);

        private readonly AppDbContext _db;

        public SavedPhraseService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<SavedPhraseDto>> GetAllAsync(string userId)
        {
            return await _db.SavedPhrases
                .AsNoTracking()
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => ToDto(p))
                .ToListAsync();
        }

        public async Task<SavePhraseResultDto> SaveAsync(string userId, CreateSavedPhraseDto dto)
        {
            var text = Spaces.Replace(dto.Text ?? string.Empty, " ").Trim();
            var meaning = (dto.Meaning ?? string.Empty).Trim();
            var scenarioTitle = (dto.ScenarioTitle ?? string.Empty).Trim();
            var scenarioId = (dto.ScenarioId ?? string.Empty).Trim();

            if (text.Length == 0 || text.Length > MaxTextLength)
                throw new InvalidOperationException($"Câu cần lưu phải có từ 1 đến {MaxTextLength} ký tự.");
            if (meaning.Length > MaxMeaningLength || scenarioTitle.Length > MaxScenarioTitleLength)
                throw new InvalidOperationException("Nội dung kèm theo quá dài.");
            if (dto.Kind != "phrase" && dto.Kind != "sentence")
                throw new InvalidOperationException("Loại câu không hợp lệ.");
            if (!KeyPattern.IsMatch(dto.Topic ?? string.Empty) || (scenarioId.Length > 0 && !KeyPattern.IsMatch(scenarioId)))
                throw new InvalidOperationException("Chủ đề không hợp lệ.");

            var normalized = text.ToLowerInvariant();
            var existing = await _db.SavedPhrases.AsNoTracking()
                .FirstOrDefaultAsync(p => p.UserId == userId && p.NormalizedText == normalized);
            if (existing != null) return new SavePhraseResultDto { Phrase = ToDto(existing), Duplicate = true };

            if (await _db.SavedPhrases.CountAsync(p => p.UserId == userId) >= MaxPerUser)
                throw new InvalidOperationException($"Sổ tay đã đủ {MaxPerUser} câu. Xóa bớt câu cũ để lưu thêm.");

            var entity = new SavedPhrase
            {
                UserId = userId,
                Text = text,
                NormalizedText = normalized,
                Meaning = meaning,
                Kind = dto.Kind,
                Topic = dto.Topic!,
                ScenarioId = scenarioId,
                ScenarioTitle = scenarioTitle,
            };
            _db.SavedPhrases.Add(entity);
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // Same text saved by a parallel request (unique index): report it as the duplicate it is
                _db.Entry(entity).State = EntityState.Detached;
                var saved = await _db.SavedPhrases.AsNoTracking()
                    .FirstOrDefaultAsync(p => p.UserId == userId && p.NormalizedText == normalized);
                if (saved == null) throw;
                return new SavePhraseResultDto { Phrase = ToDto(saved), Duplicate = true };
            }

            return new SavePhraseResultDto { Phrase = ToDto(entity) };
        }

        public async Task<bool> DeleteAsync(string userId, Guid id)
        {
            var deleted = await _db.SavedPhrases
                .Where(p => p.Id == id && p.UserId == userId)
                .ExecuteDeleteAsync();
            return deleted > 0;
        }

        private static SavedPhraseDto ToDto(SavedPhrase p) => new()
        {
            Id = p.Id,
            Text = p.Text,
            Meaning = p.Meaning,
            Kind = p.Kind,
            Topic = p.Topic,
            ScenarioId = p.ScenarioId,
            ScenarioTitle = p.ScenarioTitle,
            CreatedAt = p.CreatedAt,
        };
    }
}
