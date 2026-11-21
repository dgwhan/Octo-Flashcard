using System.Threading;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services.Interfaces
{
    public interface IUserSettingsService
    {
        Task<UserSettingsDto> GetAsync(string userId);

        /// <summary>Voice, speed, model. Throws InvalidOperationException on invalid values.</summary>
        Task<UserSettingsDto> UpdateAsync(string userId, UpdateUserSettingsDto dto);

        /// <summary>Checks the key against Gemini, then stores it encrypted. Throws GeminiProxyException / InvalidOperationException.</summary>
        Task<UserSettingsDto> SetGeminiKeyAsync(string userId, SetGeminiKeyDto dto, CancellationToken ct = default);

        Task<UserSettingsDto> ClearGeminiKeyAsync(string userId);

        /// <summary>The decrypted key and model for server-side calls, or null if the user has none.</summary>
        Task<(string ApiKey, string Model)?> GetGeminiCredentialsAsync(string userId);
    }
}
