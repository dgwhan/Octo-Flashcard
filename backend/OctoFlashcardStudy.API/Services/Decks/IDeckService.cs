using OctoFlashcardStudy.API.Contracts.Decks;

namespace OctoFlashcardStudy.API.Services.Decks
{
    public interface IDeckService
    {
        Task<CreateDeckResponse> CreateAsync(Guid ownerId, CreateDeckRequest request);

        Task<IReadOnlyList<DeckResponse>> GetAllAsync(Guid ownerId);
    }
}