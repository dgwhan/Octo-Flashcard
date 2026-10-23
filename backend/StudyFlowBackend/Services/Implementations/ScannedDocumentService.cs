using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Service xử lý CRUD và tìm kiếm tài liệu OCR đã quét.
    /// Tích hợp kiểm tra storage quota trước khi tạo document mới.
    /// </summary>
    public class ScannedDocumentService : IScannedDocumentService
    {
        private readonly AppDbContext _context;
        private readonly IStorageQuotaService _storageQuotaService;

        public ScannedDocumentService(AppDbContext context, IStorageQuotaService storageQuotaService)
        {
            _context = context;
            _storageQuotaService = storageQuotaService;
        }

        /// <summary>
        /// Tạo mới tài liệu OCR. Kiểm tra quota trước, nếu vượt giới hạn sẽ throw exception.
        /// Sau khi tạo thành công sẽ cập nhật lại storage usage của user.
        /// </summary>
        public async Task<ScannedDocumentResponseDto> CreateAsync(string userId, CreateScannedDocumentDto dto)
        {
            // Kiểm tra quota trước khi tạo document mới
            var totalNewBytes = dto.ImageSizeBytes + dto.TextSizeBytes;
            var hasQuota = await _storageQuotaService.CheckQuotaAsync(userId, totalNewBytes);
            if (!hasQuota)
            {
                throw new InvalidOperationException("Storage quota exceeded. Please delete old documents to free up space.");
            }

            // Parse ImageBase64 to byte array
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

            _context.ScannedDocuments.Add(document);
            await _context.SaveChangesAsync();

            // Cập nhật lại storage usage sau khi tạo document
            await _storageQuotaService.UpdateUsageAsync(userId);

            return MapToDto(document);
        }

        /// <summary>
        /// Lấy tất cả tài liệu OCR của user, sắp xếp theo ngày tạo mới nhất.
        /// </summary>
        public async Task<List<ScannedDocumentResponseDto>> GetAllAsync(string userId)
        {
            var documents = await _context.ScannedDocuments
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();

            return documents.Select(MapToDto).ToList();
        }

        /// <summary>
        /// Lấy chi tiết 1 tài liệu OCR theo ID. Kiểm tra quyền sở hữu bằng userId.
        /// </summary>
        public async Task<ScannedDocumentResponseDto?> GetByIdAsync(string userId, Guid id)
        {
            var document = await _context.ScannedDocuments
                .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId);

            if (document == null) return null;
            return MapToDto(document);
        }

        /// <summary>
        /// Cập nhật Title hoặc ExtractedText của tài liệu OCR.
        /// Chỉ cập nhật các field được gửi (không null).
        /// </summary>
        public async Task<bool> UpdateAsync(string userId, Guid id, UpdateScannedDocumentDto dto)
        {
            var document = await _context.ScannedDocuments
                .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId);

            if (document == null) return false;

            // Chỉ cập nhật field được gửi (nullable check)
            if (dto.Title != null) document.Title = dto.Title;
            if (dto.ExtractedText != null) document.ExtractedText = dto.ExtractedText;

            document.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Xóa mềm tài liệu OCR (đưa vào thùng rác).
        /// Storage usage không bị giảm đi (vẫn tính dung lượng của thùng rác).
        /// </summary>
        public async Task<bool> DeleteAsync(string userId, Guid id)
        {
            var document = await _context.ScannedDocuments
                .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId);

            if (document == null) return false;

            document.IsDeleted = true;
            document.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Tìm kiếm tài liệu OCR theo keyword trên Title và ExtractedText.
        /// Sử dụng EF.Functions.ILike cho PostgreSQL (case-insensitive search).
        /// </summary>
        public async Task<List<ScannedDocumentResponseDto>> SearchAsync(string userId, string query)
        {
            // Tạo pattern ILIKE cho PostgreSQL (case-insensitive, partial match)
            var pattern = $"%{query}%";

            var documents = await _context.ScannedDocuments
                .Where(d => d.UserId == userId &&
                    (EF.Functions.ILike(d.Title, pattern) || 
                     EF.Functions.ILike(d.ExtractedText, pattern)))
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();

            return documents.Select(MapToDto).ToList();
        }

        /// <summary>
        /// Map entity ScannedDocument sang ScannedDocumentResponseDto.
        /// </summary>
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
                // Note: DTO should ideally have IsDeleted and DeletedAt added, but keeping it as is to avoid breaking changes if not needed. We'll add it if required.
            };
        }

        /// <summary>
        /// Lấy tất cả tài liệu OCR trong thùng rác của user.
        /// </summary>
        public async Task<List<ScannedDocumentResponseDto>> GetTrashAsync(string userId)
        {
            var documents = await _context.ScannedDocuments
                .IgnoreQueryFilters()
                .Where(d => d.UserId == userId && d.IsDeleted)
                .OrderByDescending(d => d.DeletedAt)
                .ToListAsync();

            return documents.Select(MapToDto).ToList();
        }

        /// <summary>
        /// Phục hồi tài liệu từ thùng rác.
        /// </summary>
        public async Task<bool> RestoreAsync(string userId, Guid id)
        {
            var document = await _context.ScannedDocuments
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId && d.IsDeleted);

            if (document == null) return false;

            document.IsDeleted = false;
            document.DeletedAt = null;
            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Xóa vĩnh viễn tài liệu OCR.
        /// </summary>
        public async Task<bool> HardDeleteAsync(string userId, Guid id)
        {
            var document = await _context.ScannedDocuments
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(d => d.Id == id && d.UserId == userId && d.IsDeleted);

            if (document == null) return false;

            _context.ScannedDocuments.Remove(document);
            await _context.SaveChangesAsync();

            // Cập nhật lại storage usage sau khi xóa vĩnh viễn
            await _storageQuotaService.UpdateUsageAsync(userId);

            return true;
        }

        /// <summary>
        /// Xóa mềm nhiều tài liệu cùng lúc.
        /// </summary>
        public async Task<bool> BatchDeleteAsync(string userId, List<Guid> ids)
        {
            var documents = await _context.ScannedDocuments
                .Where(d => ids.Contains(d.Id) && d.UserId == userId && !d.IsDeleted)
                .ToListAsync();

            if (!documents.Any()) return false;

            var now = DateTime.UtcNow;
            foreach (var doc in documents)
            {
                doc.IsDeleted = true;
                doc.DeletedAt = now;
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
