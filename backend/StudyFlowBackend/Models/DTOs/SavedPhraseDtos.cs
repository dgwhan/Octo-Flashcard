using System;

namespace StudyFlowBackend.DTOs
{
    public class SavedPhraseDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Meaning { get; set; } = string.Empty;
        public string Kind { get; set; } = "phrase";
        public string Topic { get; set; } = string.Empty;
        public string ScenarioId { get; set; } = string.Empty;
        public string ScenarioTitle { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class CreateSavedPhraseDto
    {
        public string Text { get; set; } = string.Empty;
        public string? Meaning { get; set; }
        public string Kind { get; set; } = "phrase";
        public string Topic { get; set; } = string.Empty;
        public string? ScenarioId { get; set; }
        public string? ScenarioTitle { get; set; }
    }

    public class SavePhraseResultDto
    {
        public SavedPhraseDto Phrase { get; set; } = new();

        /// <summary>True when the same text was already saved; Phrase is then the existing entry.</summary>
        public bool Duplicate { get; set; }
    }
}
