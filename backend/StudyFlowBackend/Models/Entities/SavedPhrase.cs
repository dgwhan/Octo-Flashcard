using System;

namespace StudyFlowBackend.Models
{
    /// <summary>
    /// A phrase or corrected sentence the learner kept from a speaking session (role-play feedback),
    /// stored apart from flashcards and grouped by topic.
    /// </summary>
    public class SavedPhrase
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }

        /// <summary>The English phrase or sentence.</summary>
        public string Text { get; set; } = string.Empty;

        /// <summary>Lowercased, whitespace-collapsed Text: the duplicate check (PostgreSQL compares case-sensitively).</summary>
        public string NormalizedText { get; set; } = string.Empty;

        /// <summary>Vietnamese meaning (phrases) or why the sentence is better (corrections).</summary>
        public string Meaning { get; set; } = string.Empty;

        /// <summary>"phrase" (a useful expression) or "sentence" (a corrected version of what the learner said).</summary>
        public string Kind { get; set; } = "phrase";

        /// <summary>Topic key from the frontend scenario list, e.g. "food", "travel", "work".</summary>
        public string Topic { get; set; } = string.Empty;

        public string ScenarioId { get; set; } = string.Empty;
        public string ScenarioTitle { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
