namespace OctoFlashcardStudy.API.Contracts.Common
{
    public class ValidationErrorResponse : ErrorResponse
    {
        public Dictionary<string, string[]> Errors { get; init; } = [];
    }
}
