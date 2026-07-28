using OctoFlashcardStudy.API.Contracts.Auth;
using OctoFlashcardStudy.API.Domain.Entities;

namespace OctoFlashcardStudy.API.Services.Auth
{
    public interface IJwtTokenService
    {
        JwtTokenResult GenerateToken(User user);
    }
}
