namespace OctoFlashcardStudy.API.Contracts.Auth
{
    public class RegisterResponse
    {
        public Guid Id { get; set; }
        public string Username { get; init; } = string.Empty;
        public string Email { get; init; } = string.Empty;
        public DateTime CreatedAt { get; init; }
    }
}
