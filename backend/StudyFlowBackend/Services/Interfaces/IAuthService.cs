using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<RegisterResponseDto>> RegisterAsync(RegisterRequestDto request);
        Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto request);
        Task<ApiResponse<CurrentUserResponseDto>> GetCurrentUserAsync(string userId);
    }
}
