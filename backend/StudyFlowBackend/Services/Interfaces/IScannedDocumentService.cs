using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Interface quản lý CRUD và tìm kiếm tài liệu OCR đã quét.
    /// </summary>
    public interface IScannedDocumentService
    {
        Task<ScannedDocumentResponseDto> CreateAsync(string userId, CreateScannedDocumentDto dto);
        Task<List<ScannedDocumentResponseDto>> GetAllAsync(string userId);
        Task<ScannedDocumentResponseDto?> GetByIdAsync(string userId, Guid id);
        Task<bool> UpdateAsync(string userId, Guid id, UpdateScannedDocumentDto dto);
        Task<bool> DeleteAsync(string userId, Guid id);
        Task<List<ScannedDocumentResponseDto>> SearchAsync(string userId, string query);
        Task<List<ScannedDocumentResponseDto>> GetTrashAsync(string userId);
        Task<bool> RestoreAsync(string userId, Guid id);
        Task<bool> HardDeleteAsync(string userId, Guid id);
        Task<bool> BatchDeleteAsync(string userId, List<Guid> ids);
        Task<byte[]?> GetDocumentImageAsync(Guid id);
    }
}
