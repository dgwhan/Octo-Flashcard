using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Contracts.Decks
{
    public class GetDeckResponse
    {
        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }
        public string OwnerName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DeckVisibility Visibility { get; set; } = DeckVisibility.Private;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
