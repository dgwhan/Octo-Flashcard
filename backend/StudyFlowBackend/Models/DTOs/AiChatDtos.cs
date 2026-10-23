using System;
using System.Collections.Generic;

namespace StudyFlowBackend.DTOs
{
    public class ChatRequestDto
    {
        public string Message { get; set; } = string.Empty;
        public List<ChatMessageDto> History { get; set; } = new();
    }

    public class ChatMessageDto
    {
        public string Role { get; set; } = string.Empty; // "user" or "model" / "assistant"
        public string Content { get; set; } = string.Empty;
    }

    public class ChatResponseDto
    {
        public string Response { get; set; } = string.Empty;
        public int DailyRequestsRemaining { get; set; }
        public List<AiActionSuggestionDto> SuggestedActions { get; set; } = new();
    }

    public class AiActionSuggestionDto
    {
        public string ActionType { get; set; } = string.Empty; // "CREATE_TASK", "CREATE_SCHEDULE", or "CREATE_FLASHCARD_SET"
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public string? StartTime { get; set; } // e.g. "08:00"
        public string? EndTime { get; set; } // e.g. "09:00"
        public string? Date { get; set; } // e.g. "2026-06-13"
        public List<CreateFlashcardDto>? Flashcards { get; set; }
    }
}
