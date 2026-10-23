using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Service quản lý storage quota cho tính năng OCR Document Scanning.
    /// Tính toán dung lượng từ ImageSizeBytes + TextSizeBytes của tất cả ScannedDocuments.
    /// Giới hạn mặc định: 200MB (209715200 bytes) cho mỗi user.
    /// </summary>
    public class StorageQuotaService : IStorageQuotaService
    {
        private readonly AppDbContext _context;

        public StorageQuotaService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Kiểm tra xem user còn đủ quota để lưu thêm dữ liệu không.
        /// So sánh tổng usage hiện tại + additionalBytes với StorageQuotaBytes của user.
        /// </summary>
        public async Task<bool> CheckQuotaAsync(string userId, long additionalBytes)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return false;

            // Tính tổng dung lượng hiện tại từ tất cả ScannedDocuments
            var currentUsage = await _context.ScannedDocuments
                .Where(d => d.UserId == userId)
                .SumAsync(d => d.ImageSizeBytes + d.TextSizeBytes);

            var quotaBytes = (user.StorageQuotaBytes > 0) ? user.StorageQuotaBytes : 209715200; // Mặc định 200MB
            // Kiểm tra nếu thêm additionalBytes có vượt quota không
            return (currentUsage + additionalBytes) <= quotaBytes;
        }

        /// <summary>
        /// Tính lại tổng dung lượng đã sử dụng từ tất cả ScannedDocuments và cập nhật vào User.StorageUsedBytes.
        /// Gọi sau khi tạo hoặc xóa document.
        /// </summary>
        public async Task UpdateUsageAsync(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return;

            // Tính lại tổng dung lượng từ database
            var totalUsage = await _context.ScannedDocuments
                .Where(d => d.UserId == userId)
                .SumAsync(d => d.ImageSizeBytes + d.TextSizeBytes);

            user.StorageUsedBytes = totalUsage;
            user.UpdatedAt = System.DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Lấy thông tin dung lượng storage hiện tại: đã dùng, quota, phần trăm, số document.
        /// </summary>
        public async Task<StorageUsageResponseDto> GetUsageAsync(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            // Đếm số document của user
            var documentCount = await _context.ScannedDocuments
                .CountAsync(d => d.UserId == userId);

            // Tính tổng usage trực tiếp từ documents (chính xác hơn)
            var usedBytes = await _context.ScannedDocuments
                .Where(d => d.UserId == userId)
                .SumAsync(d => d.ImageSizeBytes + d.TextSizeBytes);

            var quotaBytes = (user != null && user.StorageQuotaBytes > 0) ? user.StorageQuotaBytes : 209715200; // Mặc định 200MB

            return new StorageUsageResponseDto
            {
                UsedBytes = usedBytes,
                QuotaBytes = quotaBytes,
                UsedPercentage = quotaBytes > 0 ? System.Math.Round((double)usedBytes / quotaBytes * 100, 2) : 0,
                DocumentCount = documentCount
            };
        }
    }
}
