using System;

namespace StudyFlowBackend.Models
{
    /// <summary>
    /// Per-user preferences that follow the account across devices (1-1 with User).
    /// </summary>
    public class UserSettings
    {
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }

        /// <summary>Gemini API key encrypted with ASP.NET Data Protection. Never sent back to any client.</summary>
        public string? GeminiApiKeyProtected { get; set; }

        /// <summary>Masked form for display, e.g. "AIza…x9Qk".</summary>
        public string? GeminiApiKeyHint { get; set; }

        public string? GeminiModel { get; set; }

        /// <summary>"" = automatic, "kokoro:&lt;id&gt;", "gemini:&lt;voice&gt;" or "browser:&lt;voice name&gt;".</summary>
        public string Voice { get; set; } = string.Empty;

        public double VoiceSpeed { get; set; } = 1.0;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
