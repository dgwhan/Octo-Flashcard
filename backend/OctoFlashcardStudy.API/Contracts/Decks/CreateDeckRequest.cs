using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Contracts.Decks
{
    public class CreateDeckRequest
    {
        public string Name { get; init; } = string.Empty;

        public string? Description { get; init; }

    }
}
