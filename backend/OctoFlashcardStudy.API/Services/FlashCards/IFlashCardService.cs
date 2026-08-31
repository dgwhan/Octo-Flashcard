using OctoFlashcardStudy.API.Contracts.FlashCards;

namespace OctoFlashcardStudy.API.Services.FlashCards
{
    public interface IFlashCardService
    {
        Task<FlashCardResponse> CreateAsync(Guid deckId, Guid ownerId, CreateFlashCardRequest request);
        Task<IReadOnlyList<FlashCardResponse>> GetAllAsync(Guid deckId, Guid ownerId);
        Task<FlashCardResponse> UpdateAsync(Guid deckId, Guid flashCardId, Guid ownerId, UpdateFlashCardRequest request);
        Task DeleteAsync(Guid deckId, Guid flashCardId, Guid ownerId);
    }
}
