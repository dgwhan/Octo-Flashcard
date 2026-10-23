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
    }
}
