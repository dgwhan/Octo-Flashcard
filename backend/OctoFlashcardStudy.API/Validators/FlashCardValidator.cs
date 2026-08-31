using OctoFlashcardStudy.API.Contracts.FlashCards;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Validators
{
    public static class FlashCardValidator
    {
        public static void ValidateCreate(CreateFlashCardRequest request)
        {
            Validate(request.Term, request.TermLanguage, request.Definition, request.DefinitionLanguage);
        }

        public static void ValidateUpdate(UpdateFlashCardRequest request)
        {
            Validate(request.Term, request.TermLanguage, request.Definition, request.DefinitionLanguage);
        }

        private static void Validate(
            string term,
            string termLanguage,
            string definition,
            string definitionLanguage)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                throw new ApiException(
                    "Term is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (term.Length > 500)
            {
                throw new ApiException(
                    "Term must not exceed 500 characters.",
                    StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(termLanguage))
            {
                throw new ApiException(
                    "Term language is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (termLanguage.Length > 20)
            {
                throw new ApiException(
                    "Term language must not exceed 20 characters.",
                    StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(definition))
            {
                throw new ApiException(
                    "Definition is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (definition.Length > 2000)
            {
                throw new ApiException(
                    "Definition must not exceed 2000 characters.",
                    StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(definitionLanguage))
            {
                throw new ApiException(
                    "Definition language is required.",
                    StatusCodes.Status400BadRequest);
            }

            if (definitionLanguage.Length > 20)
            {
                throw new ApiException(
                    "Definition language must not exceed 20 characters.",
                    StatusCodes.Status400BadRequest);
            }
        }
    }
}