using OctoFlashcardStudy.API.Contracts.Decks;

namespace OctoFlashcardStudy.API.Services.Decks
{
    public interface IDeckService
    {
        Task<CreateDeckResponse> CreateAsync(Guid ownerId, CreateDeckRequest request);

        Task<IReadOnlyList<DeckResponse>> GetAllAsync(Guid ownerId);

        Task<GetDeckResponse> GetByIdAsync(Guid deckId, Guid ownerId);

        Task<GetDeckResponse> UpdateAsync(Guid deckId, Guid ownerId, UpdateDeckRequest request);

        Task DeleteAsync(Guid deckId, Guid ownerId);
    }
}