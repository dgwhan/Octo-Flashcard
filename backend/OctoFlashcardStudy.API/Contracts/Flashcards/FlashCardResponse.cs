namespace OctoFlashcardStudy.API.Contracts.FlashCards
{
    public class FlashCardResponse
    {
        public Guid Id { get; set; }
        public Guid DeckId { get; set; }

        public string Term { get; set; } = string.Empty;
        public string TermLanguage { get; set; } = string.Empty;

        public string Definition { get; set; } = string.Empty;
        public string DefinitionLanguage { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}