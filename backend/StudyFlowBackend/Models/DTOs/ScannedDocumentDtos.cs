using System;

namespace StudyFlowBackend.DTOs
{
    /// <summary>
    /// DTO dùng khi tạo mới tài liệu OCR.
    /// Client gửi kèm text đã extract và thông tin ảnh từ Firebase Storage.
    /// </summary>
    public class CreateScannedDocumentDto
    {
        public string Title { get; set; } = string.Empty;
        public string ExtractedText { get; set; } = string.Empty;
        public string DetectedLanguage { get; set; } = "vi";
        public double ConfidenceScore { get; set; } = 0;
        public long ImageSizeBytes { get; set; } = 0;
        public long TextSizeBytes { get; set; } = 0;
        public string? ImageBase64 { get; set; }
    }

    /// <summary>
    /// DTO dùng khi cập nhật tài liệu OCR (chỉ cho phép sửa Title và ExtractedText).
    /// </summary>
    public class UpdateScannedDocumentDto
    {
        public string? Title { get; set; }
        public string? ExtractedText { get; set; }
    }

    /// <summary>
    /// DTO trả về thông tin đầy đủ của tài liệu OCR cho client.
    /// </summary>
    public class ScannedDocumentResponseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ExtractedText { get; set; } = string.Empty;
        public string? OriginalImageUrl { get; set; }
        public long ImageSizeBytes { get; set; }
        public long TextSizeBytes { get; set; }
        public string DetectedLanguage { get; set; } = "vi";
        public double ConfidenceScore { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UserId { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO trả về thông tin dung lượng storage đã sử dụng và giới hạn.
    /// </summary>
    public class StorageUsageResponseDto
    {
        public long UsedBytes { get; set; }
        public long QuotaBytes { get; set; }
        public double UsedPercentage { get; set; }
        public int DocumentCount { get; set; }
    }
}
