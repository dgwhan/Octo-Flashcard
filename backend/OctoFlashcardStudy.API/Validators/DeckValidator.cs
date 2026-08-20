using OctoFlashcardStudy.API.Contracts.Decks;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Validators
{
    public static class DeckValidator
    {
        public static void ValidateCreate(CreateDeckRequest request)
        {
            Validate(request.Name, request.Description);
            if (request.FlashCards.Count < 2)
            {
                throw new ApiException(
                    "Deck must contain at least 2 flashcards.",
                    StatusCodes.Status400BadRequest);
            }
        }

        public static void ValidateUpdate(UpdateDeckRequest request)
        {
            Validate(request.Name, request.Description);
        }

        private static void Validate(string name, string? description)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ApiException(
                    "Deck name is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (name.Length > 100)
            {
                throw new ApiException(
                    "Deck name must not exceed 100 characters.",
                    StatusCodes.Status400BadRequest);
            }

            if (!string.IsNullOrWhiteSpace(description) &&
                description.Length > 500)
            {
                throw new ApiException(
                    "Description must not exceed 500 characters.",
                    StatusCodes.Status400BadRequest);
            }
        }
    }
}