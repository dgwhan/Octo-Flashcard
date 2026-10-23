using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    public class ScannedDocumentService : IScannedDocumentService
    {
        private readonly IScannedDocumentRepository _scannedDocumentRepository;
        private readonly IStorageQuotaService _storageQuotaService;

        public ScannedDocumentService(
            IScannedDocumentRepository scannedDocumentRepository,
            IStorageQuotaService storageQuotaService)
        {
            _scannedDocumentRepository = scannedDocumentRepository;
            _storageQuotaService = storageQuotaService;
        }

        public async Task<ScannedDocumentResponseDto> CreateAsync(string userId, CreateScannedDocumentDto dto)
        {
            var totalNewBytes = dto.ImageSizeBytes + dto.TextSizeBytes;
            var hasQuota = await _storageQuotaService.CheckQuotaAsync(userId, totalNewBytes);
            if (!hasQuota)
            {
                throw new InvalidOperationException("Storage quota exceeded. Please delete old documents to free up space.");
            }

            byte[]? imageData = null;
            if (!string.IsNullOrEmpty(dto.ImageBase64))
            {
                try
                {
                    imageData = Convert.FromBase64String(dto.ImageBase64);
                }
                catch (FormatException)
                {
                    // Ignore or handle invalid base64
                }
            }

            var documentId = Guid.NewGuid();

            var document = new ScannedDocument
            {
                Id = documentId,
                UserId = userId,
                Title = dto.Title,
                ExtractedText = dto.ExtractedText,
                ImageData = imageData,
                OriginalImageUrl = $"/scanned-documents/{documentId}/image",
                ImageSizeBytes = dto.ImageSizeBytes,
                TextSizeBytes = dto.TextSizeBytes,
                DetectedLanguage = dto.DetectedLanguage,
                ConfidenceScore = dto.ConfidenceScore,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _scannedDocumentRepository.AddAsync(document);
            await _scannedDocumentRepository.SaveChangesAsync();

            await _storageQuotaService.UpdateUsageAsync(userId);

            return MapToDto(document);
        }

        public async Task<List<ScannedDocumentResponseDto>> GetAllAsync(string userId)
        {
            var documents = await _scannedDocumentRepository.GetAllByUserIdAsync(userId);
            return documents.Select(MapToDto).ToList();
        }

        public async Task<ScannedDocumentResponseDto?> GetByIdAsync(string userId, Guid id)
        {
            var document = await _scannedDocumentRepository.GetByIdAsync(id, userId);
            if (document == null) return null;
            return MapToDto(document);
        }

        public async Task<bool> UpdateAsync(string userId, Guid id, UpdateScannedDocumentDto dto)
        {
            var document = await _scannedDocumentRepository.GetByIdAsync(id, userId);
            if (document == null) return false;

            if (dto.Title != null) document.Title = dto.Title;
            if (dto.ExtractedText != null) document.ExtractedText = dto.ExtractedText;

            document.UpdatedAt = DateTime.UtcNow;
            _scannedDocumentRepository.Update(document);
            await _scannedDocumentRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(string userId, Guid id)
        {
            var document = await _scannedDocumentRepository.GetByIdAsync(id, userId);
            if (document == null) return false;

            document.IsDeleted = true;
            document.DeletedAt = DateTime.UtcNow;
            _scannedDocumentRepository.Update(document);
            await _scannedDocumentRepository.SaveChangesAsync();

            return true;
        }

        public async Task<List<ScannedDocumentResponseDto>> SearchAsync(string userId, string query)
        {
            var documents = await _scannedDocumentRepository.SearchAsync(userId, query);
            return documents.Select(MapToDto).ToList();
        }

        public async Task<List<ScannedDocumentResponseDto>> GetTrashAsync(string userId)
        {
            var documents = await _scannedDocumentRepository.GetTrashAsync(userId);
            return documents.Select(MapToDto).ToList();
        }

        public async Task<bool> RestoreAsync(string userId, Guid id)
        {
            var document = await _scannedDocumentRepository.GetTrashByIdAsync(id, userId);
            if (document == null) return false;

            document.IsDeleted = false;
            document.DeletedAt = null;
            _scannedDocumentRepository.Update(document);
            await _scannedDocumentRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> HardDeleteAsync(string userId, Guid id)
        {
            var document = await _scannedDocumentRepository.GetTrashByIdAsync(id, userId);
            if (document == null) return false;

            _scannedDocumentRepository.Remove(document);
            await _scannedDocumentRepository.SaveChangesAsync();

            await _storageQuotaService.UpdateUsageAsync(userId);
            return true;
        }

        public async Task<bool> BatchDeleteAsync(string userId, List<Guid> ids)
        {
            var documents = await _scannedDocumentRepository.GetByIdsAsync(userId, ids);
            if (!documents.Any()) return false;

            var now = DateTime.UtcNow;
            foreach (var doc in documents)
            {
                doc.IsDeleted = true;
                doc.DeletedAt = now;
                _scannedDocumentRepository.Update(doc);
            }

            await _scannedDocumentRepository.SaveChangesAsync();
            return true;
        }

        public async Task<byte[]?> GetDocumentImageAsync(Guid id)
        {
            var document = await _scannedDocumentRepository.GetByIdAnyUserAsync(id);
            if (document == null || document.ImageData == null || document.ImageData.Length == 0)
            {
                return null;
            }
            return document.ImageData;
        }

        private static ScannedDocumentResponseDto MapToDto(ScannedDocument document)
        {
            return new ScannedDocumentResponseDto
            {
                Id = document.Id,
                Title = document.Title,
                ExtractedText = document.ExtractedText,
                OriginalImageUrl = document.OriginalImageUrl,
                ImageSizeBytes = document.ImageSizeBytes,
                TextSizeBytes = document.TextSizeBytes,
                DetectedLanguage = document.DetectedLanguage,
                ConfidenceScore = document.ConfidenceScore,
                CreatedAt = document.CreatedAt,
                UpdatedAt = document.UpdatedAt,
                UserId = document.UserId
            };
        }
    }
}
