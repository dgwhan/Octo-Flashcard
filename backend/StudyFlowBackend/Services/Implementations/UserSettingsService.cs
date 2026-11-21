using System;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using StudyFlowBackend.Data;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Services.Interfaces;

namespace StudyFlowBackend.Services.Implementations
{
    public class UserSettingsService : IUserSettingsService
    {
        private const string ProtectorPurpose = "Octo.UserSettings.GeminiApiKey.v1";
        private static readonly Regex KeyPattern = new(@"^[A-Za-z0-9_\-]{20,200}$", RegexOptions.Compiled);
        private static readonly Regex ModelPattern = new(@"^[a-z0-9][a-z0-9.\-]{2,60}$", RegexOptions.Compiled);
        private static readonly Regex VoicePattern = new(@"^((kokoro|gemini):[A-Za-z0-9_]{1,40}|browser:[^\u0000-\u001f]{1,150})?$", RegexOptions.Compiled);

        private readonly AppDbContext _db;
        private readonly IDataProtector _protector;
        private readonly IUserGeminiClient _gemini;
        private readonly ILogger<UserSettingsService> _logger;
        private readonly string _defaultModel;

        public UserSettingsService(
            AppDbContext db,
            IDataProtectionProvider protection,
            IUserGeminiClient gemini,
            IConfiguration configuration,
            ILogger<UserSettingsService> logger)
        {
            _db = db;
            _protector = protection.CreateProtector(ProtectorPurpose);
            _gemini = gemini;
            _logger = logger;
            _defaultModel = configuration["Gemini:Model"] ?? "gemini-3.1-flash-lite";
        }

        public async Task<UserSettingsDto> GetAsync(string userId) =>
            ToDto(await _db.UserSettings.AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId));

        public async Task<UserSettingsDto> UpdateAsync(string userId, UpdateUserSettingsDto dto)
        {
            var s = await GetOrCreateAsync(userId);
            if (dto.Voice != null)
            {
                var voice = dto.Voice.Trim();
                if (!VoicePattern.IsMatch(voice)) throw new InvalidOperationException("Giọng đọc không hợp lệ.");
                s.Voice = voice;
            }
            if (dto.VoiceSpeed.HasValue)
            {
                if (dto.VoiceSpeed is < 0.5 or > 1.5) throw new InvalidOperationException("Tốc độ đọc phải từ 0.5 đến 1.5.");
                s.VoiceSpeed = Math.Round(dto.VoiceSpeed.Value, 2);
            }
            if (dto.GeminiModel != null)
            {
                var model = dto.GeminiModel.Trim();
                if (model.Length > 0 && !ModelPattern.IsMatch(model)) throw new InvalidOperationException("Tên model không hợp lệ.");
                s.GeminiModel = model.Length > 0 ? model : null;
            }
            s.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return ToDto(s);
        }

        public async Task<UserSettingsDto> SetGeminiKeyAsync(string userId, SetGeminiKeyDto dto, CancellationToken ct = default)
        {
            var key = dto.ApiKey?.Trim() ?? string.Empty;
            if (!KeyPattern.IsMatch(key)) throw new InvalidOperationException("API key không đúng định dạng.");

            var model = string.IsNullOrWhiteSpace(dto.Model) ? null : dto.Model.Trim();
            if (model != null && !ModelPattern.IsMatch(model)) throw new InvalidOperationException("Tên model không hợp lệ.");

            // Prove the key works before keeping it (cheapest possible call)
            await _gemini.GenerateAsync(
                key,
                model ?? _defaultModel,
                "Reply with the single word OK.",
                new[] { new GeminiTurnDto { Role = "user", Text = "ping" } },
                json: false,
                temperature: 0,
                ct);

            var s = await GetOrCreateAsync(userId);
            s.GeminiApiKeyProtected = _protector.Protect(key);
            s.GeminiApiKeyHint = key.Length > 8 ? $"{key[..4]}…{key[^4..]}" : "••••";
            if (model != null) s.GeminiModel = model;
            s.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync(ct);
            return ToDto(s);
        }

        public async Task<UserSettingsDto> ClearGeminiKeyAsync(string userId)
        {
            var s = await _db.UserSettings.FirstOrDefaultAsync(x => x.UserId == userId);
            if (s == null) return ToDto(null);
            s.GeminiApiKeyProtected = null;
            s.GeminiApiKeyHint = null;
            s.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return ToDto(s);
        }

        public async Task<(string ApiKey, string Model)?> GetGeminiCredentialsAsync(string userId)
        {
            var s = await _db.UserSettings.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == userId);
            if (string.IsNullOrEmpty(s?.GeminiApiKeyProtected)) return null;
            try
            {
                return (_protector.Unprotect(s.GeminiApiKeyProtected), s.GeminiModel ?? _defaultModel);
            }
            catch (CryptographicException ex)
            {
                // Data Protection keys were rotated away or lost: the stored key can no longer be read
                _logger.LogWarning(ex, "Could not decrypt Gemini key for user {UserId}", userId);
                return null;
            }
        }

        private async Task<UserSettings> GetOrCreateAsync(string userId)
        {
            var s = await _db.UserSettings.FirstOrDefaultAsync(x => x.UserId == userId);
            if (s != null) return s;
            s = new UserSettings { UserId = userId };
            _db.UserSettings.Add(s);
            return s;
        }

        private UserSettingsDto ToDto(UserSettings? s) => new()
        {
            HasGeminiKey = !string.IsNullOrEmpty(s?.GeminiApiKeyProtected),
            GeminiKeyHint = s?.GeminiApiKeyHint,
            GeminiModel = s?.GeminiModel ?? _defaultModel,
            Voice = s?.Voice ?? string.Empty,
            VoiceSpeed = s?.VoiceSpeed ?? 1.0,
        };
    }
}
