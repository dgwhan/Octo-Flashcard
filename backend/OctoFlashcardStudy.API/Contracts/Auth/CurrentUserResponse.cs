namespace OctoFlashcardStudy.API.Contracts.Auth
{
    public class CurrentUserResponse
    {
        public Guid Id { get; init; }
        public string Username { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
    }
}
