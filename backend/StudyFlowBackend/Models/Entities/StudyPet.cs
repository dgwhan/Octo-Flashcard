using System;

namespace StudyFlowBackend.Models
{
    /// <summary>
    /// Thực thể lưu trữ thông tin về Thú cưng học tập (Study Pet) của người dùng.
    /// Thú cưng sẽ lớn lên và tiến hóa dựa trên cấp độ của thú cưng, 
    /// nhận được EXP từ việc được cho ăn.
    /// </summary>
    public class StudyPet
    {
        /// <summary>
        /// Khóa chính.
        /// </summary>
        public Guid Id { get; set; } = Guid.NewGuid();

        /// <summary>
        /// ID của người dùng sở hữu (FK liên kết 1-1 tới bảng Users).
        /// </summary>
        public string UserId { get; set; } = string.Empty;

        /// <summary>
        /// Tên của thú cưng (do người dùng đặt).
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Loại thú cưng (ví dụ: "Cat", "Dog", "Panda").
        /// </summary>
        public string PetType { get; set; } = string.Empty;

        /// <summary>
        /// Cấp độ hiện tại của thú cưng.
        /// </summary>
        public int Level { get; set; } = 1;

        /// <summary>
        /// Điểm kinh nghiệm hiện tại của thú cưng.
        /// </summary>
        public double Exp { get; set; } = 0;

        /// <summary>
        /// Giai đoạn tiến hóa hiện tại:
        /// - "Egg" (Quả trứng)
        /// - "Baby" (Thú sơ sinh)
        /// - "Teen" (Thú thiếu niên)
        /// - "Adult" (Thú trưởng thành)
        /// </summary>
        public string EvolutionStage { get; set; } = "Egg";

        /// <summary>
        /// Chỉ số no bụng (từ 0 đến 100).
        /// </summary>
        public int Hunger { get; set; } = 80;

        /// <summary>
        /// Lần cuối cùng thú cưng được cho ăn.
        /// </summary>
        public DateTime LastFedTime { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Ngày nhận nuôi/tạo.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Navigation property tới User.
        /// </summary>
        public User User { get; set; } = null!;
    }
}
