using System.Threading.Tasks;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Giao diện dịch vụ quản lý tính năng Gamification (XP, Level, Streak, Huy hiệu).
    /// </summary>
    public interface IGamificationService
    {
        /// <summary>
        /// Cộng điểm kinh nghiệm (XP) và tiền xu (Coins) cho người dùng.
        /// Đồng thời kiểm tra thăng cấp và trao các huy hiệu tương ứng.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        /// <param name="xpAmount">Số XP cộng thêm.</param>
        /// <param name="coinsAmount">Số Coins cộng thêm.</param>
        /// <param name="reason">Lý do cộng điểm (ví dụ: "Hoàn thành Task").</param>
        /// <returns>True nếu người dùng thăng cấp (Level Up), ngược lại False.</returns>
        Task<bool> AddXpAndCoinsAsync(string userId, double xpAmount, int coinsAmount, string reason);

        /// <summary>
        /// Kiểm tra và trao các huy hiệu (Badges) cho người dùng dựa trên thành tích hiện tại.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        Task CheckAndAwardBadgesAsync(string userId);

        /// <summary>
        /// Cập nhật tiến trình tích luỹ thời gian tập trung trong ngày và chuỗi streak.
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        /// <param name="focusedMinutesToday">Số phút tập trung hoàn thành hôm nay.</param>
        Task UpdateDailyTargetProgressAsync(string userId, int focusedMinutesToday);

        /// <summary>
        /// Thiết lập huy hiệu nổi bật (danh hiệu hiển thị bên cạnh tên).
        /// </summary>
        /// <param name="userId">ID người dùng.</param>
        /// <param name="badgeId">ID của huy hiệu muốn gán, hoặc null nếu muốn gỡ bỏ.</param>
        /// <returns>True nếu gán thành công (người dùng đã mở khóa huy hiệu này), ngược lại False.</returns>
        Task<bool> SetFeaturedBadgeAsync(string userId, Guid? badgeId);
    }
}
