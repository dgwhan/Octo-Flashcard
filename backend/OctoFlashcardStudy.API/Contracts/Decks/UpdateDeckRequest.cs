using OctoFlashcardStudy.API.Domain.Enums;

namespace OctoFlashcardStudy.API.Contracts.Decks
{
    public class UpdateDeckRequest
    {
        public string Name { get; init; } = string.Empty;
        public string? Description { get; init; }
        public DeckVisibility Visibility { get; init; }  
    }
}
