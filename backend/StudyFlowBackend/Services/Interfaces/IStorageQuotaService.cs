using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Interface quản lý storage quota cho tính năng OCR Document Scanning.
    /// Kiểm tra giới hạn dung lượng và cập nhật usage cho từng user.
    /// </summary>
    public interface IStorageQuotaService
    {
        /// <summary>
        /// Kiểm tra xem user còn đủ quota để lưu thêm dữ liệu không.
        /// </summary>
        /// <param name="userId">Firebase UID của user</param>
        /// <param name="additionalBytes">Số bytes muốn thêm vào</param>
        /// <returns>True nếu còn đủ quota, false nếu vượt giới hạn</returns>
        Task<bool> CheckQuotaAsync(string userId, long additionalBytes);

        /// <summary>
        /// Tính lại tổng dung lượng đã sử dụng từ tất cả ScannedDocuments và cập nhật vào User.
        /// </summary>
        /// <param name="userId">Firebase UID của user</param>
        Task UpdateUsageAsync(string userId);

        /// <summary>
        /// Lấy thông tin dung lượng storage hiện tại của user.
        /// </summary>
        /// <param name="userId">Firebase UID của user</param>
        /// <returns>DTO chứa thông tin usage, quota, phần trăm và số document</returns>
        Task<StorageUsageResponseDto> GetUsageAsync(string userId);
    }
}
