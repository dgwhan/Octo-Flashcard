using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services.Interfaces;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    /// <summary>
    /// AI calls made with the signed-in user's own Gemini key (role-play, IELTS scoring, AI voice).
    /// The key stays on the server; the browser only sends prompts.
    /// </summary>
    [ApiController]
    [Route("api/ai/user")]
    [Authorize]
    [EnableRateLimiting("GeneratePolicy")]
    public class AiUserController : ControllerBase
    {
        private const int MaxSystemChars = 8_000;
        private const int MaxTurns = 60;
        private const int MaxTurnChars = 4_000;
        private const int MaxTotalChars = 40_000;
        private const int MaxTtsChars = 600;
        private static readonly Regex VoiceName = new(@"^[A-Za-z]{2,20}$", RegexOptions.Compiled);

        private const string NoKey = "Bạn chưa thêm API key Gemini. Vào Cài đặt để thêm key.";

        private readonly IUserSettingsService _settings;
        private readonly IUserGeminiClient _gemini;
        private readonly IUserUtils _userUtils;

        public AiUserController(IUserSettingsService settings, IUserGeminiClient gemini, IUserUtils userUtils)
        {
            _settings = settings;
            _gemini = gemini;
            _userUtils = userUtils;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> Generate([FromBody] UserAiGenerateDto dto, CancellationToken ct)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var turns = dto.Turns ?? new();
            if (string.IsNullOrWhiteSpace(dto.System) || dto.System.Length > MaxSystemChars)
                return BadRequest(ApiResponse<object>.ErrorResponse("Yêu cầu AI không hợp lệ."));
            if (turns.Count == 0 || turns.Count > MaxTurns)
                return BadRequest(ApiResponse<object>.ErrorResponse("Cuộc hội thoại quá dài, hãy bắt đầu lại."));
            if (turns.Any(t => (t.Role != "user" && t.Role != "model") || string.IsNullOrWhiteSpace(t.Text) || t.Text.Length > MaxTurnChars))
                return BadRequest(ApiResponse<object>.ErrorResponse("Nội dung gửi AI không hợp lệ."));
            if (dto.System.Length + turns.Sum(t => t.Text.Length) > MaxTotalChars)
                return BadRequest(ApiResponse<object>.ErrorResponse("Nội dung gửi AI quá dài."));
            if (dto.Temperature is < 0 or > 2)
                return BadRequest(ApiResponse<object>.ErrorResponse("Tham số AI không hợp lệ."));

            var creds = await _settings.GetGeminiCredentialsAsync(userId);
            if (creds == null) return StatusCode(412, ApiResponse<object>.ErrorResponse(NoKey));

            try
            {
                var text = await _gemini.GenerateAsync(creds.Value.ApiKey, creds.Value.Model, dto.System, turns, dto.Json, dto.Temperature, ct);
                return Ok(ApiResponse<UserAiTextDto>.SuccessResponse(new UserAiTextDto { Text = text }));
            }
            catch (GeminiProxyException ex)
            {
                return StatusCode(ex.StatusCode, ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpPost("tts")]
        public async Task<IActionResult> Tts([FromBody] UserAiTtsDto dto, CancellationToken ct)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var text = dto.Text?.Trim() ?? string.Empty;
            if (text.Length == 0 || text.Length > MaxTtsChars)
                return BadRequest(ApiResponse<object>.ErrorResponse($"Câu cần đọc phải dài 1–{MaxTtsChars} ký tự."));
            if (!VoiceName.IsMatch(dto.Voice ?? string.Empty))
                return BadRequest(ApiResponse<object>.ErrorResponse("Giọng đọc không hợp lệ."));

            var creds = await _settings.GetGeminiCredentialsAsync(userId);
            if (creds == null) return StatusCode(412, ApiResponse<object>.ErrorResponse(NoKey));

            try
            {
                var audio = await _gemini.SynthesizeAsync(creds.Value.ApiKey, text, dto.Voice!, ct);
                return Ok(ApiResponse<GeminiAudioDto>.SuccessResponse(audio));
            }
            catch (GeminiProxyException ex)
            {
                return StatusCode(ex.StatusCode, ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }
    }
}
