using System;

namespace StudyFlowBackend.Models
{
    public class Flashcard
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        public string Question { get; set; } = string.Empty;
        
        public string Answer { get; set; } = string.Empty;

        public Guid FlashcardSetId { get; set; }
        public FlashcardSet? FlashcardSet { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Spaced repetition (FSRS). The client computes the schedule; the server stores it.
        // Due: when the card is next due (null = new, never reviewed). ReviewState: the FSRS card as JSON.
        public DateTime? Due { get; set; }
        public string? ReviewState { get; set; }
    }
}
