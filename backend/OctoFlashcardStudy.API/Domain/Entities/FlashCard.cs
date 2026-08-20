namespace OctoFlashcardStudy.API.Domain.Entities
{
    public class FlashCard
    {
        public Guid Id { get; set; }
        public Guid DeckId { get; set; }

        public string Term { get; set; } = string.Empty;
        public string TermLanguage { get; set; } = string.Empty;
        public string Definition { get; set; } = string.Empty;
        public string DefinitionLanguage { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Deck Deck { get; set; } = null!;
    }
}