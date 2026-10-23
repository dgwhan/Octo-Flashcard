using System;
using System.Collections.Generic;

namespace StudyFlowBackend.DTOs
{
    public class FlashcardDto
    {
        public Guid Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
        public Guid FlashcardSetId { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class FlashcardSetDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public Guid? TargetDocumentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<FlashcardDto> Flashcards { get; set; } = new();
    }

    public class CreateFlashcardDto
    {
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }

    public class CreateFlashcardSetDto
    {
        public string Title { get; set; } = string.Empty;
        public Guid? TargetDocumentId { get; set; }
        public List<CreateFlashcardDto> Flashcards { get; set; } = new();
    }

    public class GenerateFlashcardsRequestDto
    {
        public Guid DocumentId { get; set; }
        public string? CustomTitle { get; set; }
    }
}
