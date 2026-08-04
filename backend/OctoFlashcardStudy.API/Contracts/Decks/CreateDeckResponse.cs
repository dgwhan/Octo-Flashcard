using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Contracts.Decks
{
    public class CreateDeckResponse
    {
        public Guid Id { get; init; }

        public string Name { get; init; } = string.Empty;

        public string? Description { get; init; }

        public DeckVisibility Visibility { get; init; } = DeckVisibility.Private;

        public DateTime CreatedAt { get; init; }
    }
}
