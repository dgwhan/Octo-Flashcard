using OctoFlashcardStudy.API.Contracts.Decks;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Validators
{
    public static class DeckValidator
    {
        public static void ValidateCreate(CreateDeckRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                throw new ApiException("Deck name is required.", StatusCodes.Status400BadRequest);
            }

            if (request.Name.Length > 100)
            {
                throw new ApiException("Deck name must not exceed 100 characters.", StatusCodes.Status400BadRequest);
            }

            if (!string.IsNullOrWhiteSpace(request.Description) &&
                request.Description.Length > 500)
            {
                throw new ApiException("Description must not exceed 500 characters.", StatusCodes.Status400BadRequest);
            }
        }
    }
}