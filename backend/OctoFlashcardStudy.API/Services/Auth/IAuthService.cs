using OctoFlashcardStudy.API.Contracts.Auth;

namespace OctoFlashcardStudy.API.Services.Auth
{
    public interface IAuthService
    {
        Task<RegisterResponse> RegisterAsync(RegisterRequest request);
    }
}
