namespace OctoFlashcardStudy.API.Contracts.Auth
{
    public class JwtTokenResult
    {
        public string AccessToken { get; init; } = string.Empty;

        public DateTime ExpiresAt { get; init; }
    }
}