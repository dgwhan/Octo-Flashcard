using System.Collections.Generic;

namespace StudyFlowBackend.DTOs
{
    /// <summary>What the client may see: never the key itself.</summary>
    public class UserSettingsDto
    {
        public bool HasGeminiKey { get; set; }
        public string? GeminiKeyHint { get; set; }
        public string GeminiModel { get; set; } = string.Empty;
        public string Voice { get; set; } = string.Empty;
        public double VoiceSpeed { get; set; } = 1.0;
    }

    public class UpdateUserSettingsDto
    {
        public string? Voice { get; set; }
        public double? VoiceSpeed { get; set; }
        public string? GeminiModel { get; set; }
    }

    public class SetGeminiKeyDto
    {
        public string ApiKey { get; set; } = string.Empty;
        public string? Model { get; set; }
    }

    public class GeminiTurnDto
    {
        /// <summary>"user" or "model"</summary>
        public string Role { get; set; } = "user";
        public string Text { get; set; } = string.Empty;
    }

    public class UserAiGenerateDto
    {
        public string System { get; set; } = string.Empty;
        public List<GeminiTurnDto> Turns { get; set; } = new();
        public bool Json { get; set; }
        public double Temperature { get; set; } = 0.8;
    }

    public class UserAiTextDto
    {
        public string Text { get; set; } = string.Empty;
    }

    public class UserAiTtsDto
    {
        public string Text { get; set; } = string.Empty;
        public string Voice { get; set; } = "Kore";
    }

    public class GeminiAudioDto
    {
        /// <summary>Base64 audio as returned by Gemini (raw PCM or WAV).</summary>
        public string Data { get; set; } = string.Empty;
        public string MimeType { get; set; } = string.Empty;
    }
}
