using System;

namespace StudyFlowBackend.Models
{
    /// <summary>
    /// Bảng trung gian thể hiện các huy hiệu mà người dùng đã mở khóa được.
    /// </summary>
    public class UserBadge
    {
        /// <summary>
        /// ID của người dùng (Firebase UID).
        /// </summary>
        public string UserId { get; set; } = string.Empty;

        /// <summary>
        /// ID của huy hiệu được mở khóa.
        /// </summary>
        public Guid BadgeId { get; set; }

        /// <summary>
        /// Thời điểm người dùng mở khóa huy hiệu này.
        /// </summary>
        public DateTime EarnedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Navigation property tới User.
        /// </summary>
        public User User { get; set; } = null!;

        /// <summary>
        /// Navigation property tới Badge.
        /// </summary>
        public Badge Badge { get; set; } = null!;
    }
}
