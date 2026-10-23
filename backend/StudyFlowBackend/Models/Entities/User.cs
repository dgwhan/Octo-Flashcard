using System;
using System.Collections.Generic;

namespace StudyFlowBackend.Models
{
    public class User
    {
        /// <summary>
        /// Firebase UID sẽ được dùng làm Primary Key
        /// </summary>
        public string Id { get; set; } = string.Empty;
        
        public string Username { get; set; } = string.Empty;
        
        public string Email { get; set; } = string.Empty;
        
        public string FullName { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public int Level { get; set; } = 1;
        public double ExpPoints { get; set; } = 0;
        
        public int Streak { get; set; } = 0;
        public int Coins { get; set; } = 0;
        public Guid? FeaturedBadgeId { get; set; }
        public Badge? FeaturedBadge { get; set; }
        
        public int DailyTargetMinutes { get; set; } = 60;
        public string Timezone { get; set; } = "Asia/Ho_Chi_Minh";
        
        public DateTime? LastStreakDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        /// <summary>
        /// Tổng dung lượng storage đã sử dụng (bytes) cho OCR documents
        /// </summary>
        public long StorageUsedBytes { get; set; } = 0;

        /// <summary>
        /// Giới hạn storage (bytes) - mặc định 200MB = 209715200 bytes
        /// </summary>
        public long StorageQuotaBytes { get; set; } = 209715200;

        /// <summary>
        /// EF Core 8 hỗ trợ map trực tiếp List<string> xuống PostgreSQL Array type.
        /// </summary>
        public List<string> StreakHistory { get; set; } = new List<string>();

        /// <summary>
        /// Số lượng AI request đã sử dụng trong ngày
        /// </summary>
        public int DailyAiRequestsUsed { get; set; } = 0;

        /// <summary>
        /// Lần cuối cùng thực hiện AI request (để reset daily limit)
        /// </summary>
        public DateTime? LastAiRequestDate { get; set; }

        // Navigation Property: 1 User có 1 StudyPet
        public StudyPet? Pet { get; set; }

        // Navigation Property: 1 User có nhiều UserBadges
        public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();

        // Navigation Property: 1 User có nhiều Tasks
        public ICollection<StudyTask> Tasks { get; set; } = new List<StudyTask>();

        // Navigation Property: 1 User có nhiều FocusSessions
        public ICollection<FocusSession> FocusSessions { get; set; } = new List<FocusSession>();

        // Navigation Property: 1 User có nhiều ScannedDocuments
        public ICollection<ScannedDocument> ScannedDocuments { get; set; } = new List<ScannedDocument>();
        
        // Navigation Property: 1 User có nhiều FlashcardSets
        public ICollection<FlashcardSet> FlashcardSets { get; set; } = new List<FlashcardSet>();
    }
}

