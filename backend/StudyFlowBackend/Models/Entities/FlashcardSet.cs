using System;
using System.Collections.Generic;

namespace StudyFlowBackend.Models
{
    public class FlashcardSet
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        public string Title { get; set; } = string.Empty;
        
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }

        public Guid? TargetDocumentId { get; set; }
        public ScannedDocument? TargetDocument { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
    }
}
