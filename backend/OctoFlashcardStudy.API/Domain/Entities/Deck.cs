using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Domain.Entities
{
    public class Deck
    {
        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DeckVisibility Visibility { get; set; } = DeckVisibility.Private;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public User Owner { get; set; } = null!;
    }
}
