namespace OctoFlashcardStudy.API.Configurations
{
    public class JwtSettings
    {
        public const string SectionName = "Jwt";

        //HMACSHA256 signing key. Must be at least 32 bytes (256 bits)
        public string Key { get; init; } = string.Empty;

        //Identifies who issued this token
        public string Issuer { get; init; } = string.Empty;

        //Identifies which service this token is intended for
        public string Audience { get; init; } = string.Empty;

        //Access token lifetime in minutes
        public int ExpiresInMinutes { get; init; } = 60;
    }
}
