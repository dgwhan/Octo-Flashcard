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
        /// <summary>
        /// Tạo mới tài liệu OCR (kiểm tra quota trước khi lưu).
        /// </summary>
        Task<ScannedDocumentResponseDto> CreateAsync(string userId, CreateScannedDocumentDto dto);

        /// <summary>
        /// Lấy tất cả tài liệu OCR của user, sắp xếp theo ngày tạo mới nhất.
        /// </summary>
        Task<List<ScannedDocumentResponseDto>> GetAllAsync(string userId);

        /// <summary>
        /// Lấy chi tiết 1 tài liệu OCR theo ID.
        /// </summary>
        Task<ScannedDocumentResponseDto?> GetByIdAsync(string userId, Guid id);

        /// <summary>
        /// Cập nhật Title hoặc ExtractedText của tài liệu OCR.
        /// </summary>
        Task<bool> UpdateAsync(string userId, Guid id, UpdateScannedDocumentDto dto);

        /// <summary>
        /// Xóa tài liệu OCR và cập nhật lại storage usage.
        /// </summary>
        Task<bool> DeleteAsync(string userId, Guid id);

        /// <summary>
        /// Tìm kiếm tài liệu OCR theo keyword (ILIKE trên Title và ExtractedText).
        /// </summary>
        Task<List<ScannedDocumentResponseDto>> SearchAsync(string userId, string query);

        /// <summary>
        /// Lấy tất cả tài liệu OCR trong thùng rác của user.
        /// </summary>
        Task<List<ScannedDocumentResponseDto>> GetTrashAsync(string userId);

        /// <summary>
        /// Phục hồi tài liệu từ thùng rác.
        /// </summary>
        Task<bool> RestoreAsync(string userId, Guid id);

        /// <summary>
        /// Xóa vĩnh viễn tài liệu OCR.
        /// </summary>
        Task<bool> HardDeleteAsync(string userId, Guid id);

        /// <summary>
        /// Xóa mềm (hoặc vĩnh viễn) nhiều tài liệu cùng lúc.
        /// </summary>
        Task<bool> BatchDeleteAsync(string userId, List<Guid> ids);
    }
}
