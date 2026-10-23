using System;
using System.Collections.Generic;

namespace StudyFlowBackend.Models
{
    /// <summary>
    /// Thực thể đại diện cho các huy hiệu (achievements/badges) trong hệ thống.
    /// </summary>
    public class Badge
    {
        /// <summary>
        /// Khóa chính của huy hiệu.
        /// </summary>
        public Guid Id { get; set; } = Guid.NewGuid();

        /// <summary>
        /// Tên của huy hiệu (ví dụ: "Focus Master").
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Mô tả điều kiện đạt được huy hiệu (ví dụ: "Tập trung tổng cộng 10 giờ").
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Đường dẫn biểu tượng hoặc mã icon (ví dụ: "emoji_events" hoặc URL ảnh).
        /// </summary>
        public string IconUrl { get; set; } = string.Empty;

        /// <summary>
        /// Loại chỉ số cần kiểm tra để trao giải:
        /// - "Level": Dựa trên cấp độ của user.
        /// - "FocusMinutes": Dựa trên tổng số phút tập trung.
        /// - "TasksCompleted": Dựa trên tổng số task hoàn thành.
        /// - "StreakDays": Dựa trên số ngày streak hiện tại/cao nhất.
        /// </summary>
        public string MetricType { get; set; } = string.Empty;

        /// <summary>
        /// Ngưỡng chỉ số cần vượt qua để nhận huy hiệu (ví dụ: 600 phút, cấp độ 10...).
        /// </summary>
        public int ThresholdValue { get; set; }

        /// <summary>
        /// Ngày tạo huy hiệu.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Danh sách người dùng đã sở hữu huy hiệu này (Navigation Property).
        /// </summary>
        public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
    }
}
