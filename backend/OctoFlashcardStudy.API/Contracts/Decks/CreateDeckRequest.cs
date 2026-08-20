using OctoFlashcardStudy.API.Contracts.FlashCards;
using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Contracts.Decks
{
    public class CreateDeckRequest
    {
        public string Name { get; init; } = string.Empty;

        public string? Description { get; init; }

        public DeckVisibility Visibility { get; set; } = DeckVisibility.Public;

        public List<CreateFlashCardRequest> FlashCards { get; set; } = new();

    }
}
