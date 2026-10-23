using System;

namespace StudyFlowBackend.Models
{
    /// <summary>
    /// Entity đại diện cho tài liệu đã được quét bằng OCR.
    /// Lưu trữ text đã extract và URL ảnh gốc trên Firebase Storage.
    /// </summary>
    public class ScannedDocument
    {
        public Guid Id { get; set; }
        
        /// <summary>
        /// Tiêu đề do user đặt cho tài liệu
        /// </summary>
        public string Title { get; set; } = string.Empty;
        
        /// <summary>
        /// Nội dung text đã extract từ OCR (toàn bộ text nhận diện được)
        /// </summary>
        public string ExtractedText { get; set; } = string.Empty;
        
        /// <summary>
        /// URL ảnh gốc (trỏ về endpoint của Backend)
        /// </summary>
        public string? OriginalImageUrl { get; set; }
        
        /// <summary>
        /// Dữ liệu ảnh thô lưu trong DB
        /// </summary>
        public byte[]? ImageData { get; set; }
        
        /// <summary>
        /// Kích thước ảnh gốc (bytes) - dùng tính storage quota
        /// </summary>
        public long ImageSizeBytes { get; set; } = 0;
        
        /// <summary>
        /// Kích thước text (bytes) - dùng tính storage quota
        /// </summary>
        public long TextSizeBytes { get; set; } = 0;
        
        /// <summary>
        /// Ngôn ngữ phát hiện được từ OCR (vi, en)
        /// </summary>
        public string DetectedLanguage { get; set; } = "vi";
        
        /// <summary>
        /// Độ tin cậy OCR (0.0 - 1.0)
        /// </summary>
        public double ConfidenceScore { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Indicates if the document is soft-deleted (in Trash)
        /// </summary>
        public bool IsDeleted { get; set; } = false;

        /// <summary>
        /// When the document was soft-deleted. Null if not deleted.
        /// </summary>
        public DateTime? DeletedAt { get; set; }
        
        // --- Foreign Key ---
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }
    }
}
