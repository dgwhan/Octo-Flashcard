using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Contracts.Decks
{
    public class DeckResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DeckVisibility Visibility { get; set; } = DeckVisibility.Private;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
