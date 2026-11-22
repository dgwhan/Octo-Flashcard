using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Services.Interfaces;

namespace StudyFlowBackend.Services.Implementations
{
    public class UserGeminiClient : IUserGeminiClient
    {
        private const string Endpoint = "https://generativelanguage.googleapis.com/v1beta/models";

        // Newest first; a key without access to one gets 404 and falls through to the next.
        private static readonly string[] TtsModels =
        {
            "gemini-3.1-flash-lite",
            "gemini-3.8-flash-tts",
            "gemini-2.5-flash-preview-tts",
        };

        // Chat replies (role-play) need speed, not deep reasoning: ask for the lowest thinking level the model
        // accepts. Models differ (3.8 Flash rejects "minimal", 2.5 models take no level at all), so try them in
        // order and remember per model what worked. null = the model's default.
        private static readonly string?[] ChatThinkingLevels = { "minimal", "low", null };
        private static readonly ConcurrentDictionary<string, int> ChatThinkingStart = new();

        private readonly HttpClient _http;
        private readonly ILogger<UserGeminiClient> _logger;

        public UserGeminiClient(HttpClient http, ILogger<UserGeminiClient> logger)
        {
            _http = http;
            _logger = logger;
        }

        public async Task<string> GenerateAsync(
            string apiKey,
            string model,
            string system,
            IReadOnlyList<GeminiTurnDto> turns,
            bool json,
            double temperature,
            CancellationToken ct = default)
        {
            object Body(string? thinkingLevel)
            {
                var generationConfig = new Dictionary<string, object> { ["temperature"] = temperature };
                if (json) generationConfig["responseMimeType"] = "application/json";
                if (thinkingLevel != null) generationConfig["thinkingConfig"] = new { thinkingLevel };
                return new
                {
                    systemInstruction = new { parts = new[] { new { text = system } } },
                    contents = turns.Select(t => new { role = t.Role, parts = new[] { new { text = t.Text } } }),
                    generationConfig,
                };
            }

            JsonDocument doc;
            if (json)
            {
                // Scoring and feedback (JSON) keep the model's default thinking: quality matters more than speed there.
                doc = await PostAsync(apiKey, model, Body(null), ct);
            }
            else
            {
                var i = ChatThinkingStart.GetValueOrDefault(model);
                while (true)
                {
                    try
                    {
                        doc = await PostAsync(apiKey, model, Body(ChatThinkingLevels[i]), ct);
                        ChatThinkingStart[model] = i;
                        break;
                    }
                    catch (GeminiProxyException ex) when (
                        ex.StatusCode == 400 && i < ChatThinkingLevels.Length - 1 &&
                        ex.Message.Contains("thinking", StringComparison.OrdinalIgnoreCase))
                    {
                        i++;
                    }
                }
            }

            using var _ = doc;
            var text = string.Concat(Parts(doc.RootElement)
                .Select(p => p.TryGetProperty("text", out var t) ? t.GetString() : null));
            if (string.IsNullOrWhiteSpace(text))
                throw new GeminiProxyException(502, "AI không trả lời (có thể bị bộ lọc an toàn chặn). Thử diễn đạt khác.");
            return text.Trim();
        }

        public async Task<GeminiAudioDto> SynthesizeAsync(string apiKey, string text, string voice, CancellationToken ct = default)
        {
            var body = new
            {
                contents = new[] { new { parts = new[] { new { text } } } },
                generationConfig = new
                {
                    responseModalities = new[] { "AUDIO" },
                    speechConfig = new { voiceConfig = new { prebuiltVoiceConfig = new { voiceName = voice } } },
                },
            };

            foreach (var model in TtsModels)
            {
                JsonDocument doc;
                try
                {
                    doc = await PostAsync(apiKey, model, body, ct);
                }
                catch (GeminiProxyException ex) when (ex.StatusCode == 404)
                {
                    continue;
                }

                using (doc)
                {
                    foreach (var part in Parts(doc.RootElement))
                    {
                        if (!part.TryGetProperty("inlineData", out var data)) continue;
                        return new GeminiAudioDto
                        {
                            Data = data.TryGetProperty("data", out var d) ? d.GetString() ?? "" : "",
                            MimeType = data.TryGetProperty("mimeType", out var m) ? m.GetString() ?? "" : "",
                        };
                    }
                }
            }

            throw new GeminiProxyException(400, "Key này không dùng được model giọng đọc (TTS) của Gemini.");
        }

        private async Task<JsonDocument> PostAsync(string apiKey, string model, object body, CancellationToken ct)
        {
            using var request = new HttpRequestMessage(HttpMethod.Post, $"{Endpoint}/{Uri.EscapeDataString(model)}:generateContent")
            {
                Content = JsonContent.Create(body),
            };
            // Key in a header, never in the URL, so it cannot end up in proxy or server logs
            request.Headers.Add("x-goog-api-key", apiKey);

            HttpResponseMessage response;
            try
            {
                response = await _http.SendAsync(request, ct);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogWarning(ex, "Gemini request failed");
                throw new GeminiProxyException(502, "Không kết nối được tới Google AI. Thử lại sau.");
            }

            using (response)
            {
                var raw = await response.Content.ReadAsStringAsync(ct);
                if (!response.IsSuccessStatusCode)
                {
                    var message = "";
                    try
                    {
                        using var err = JsonDocument.Parse(raw);
                        message = err.RootElement.GetProperty("error").GetProperty("message").GetString() ?? "";
                    }
                    catch (Exception)
                    {
                        // non-JSON error body
                    }
                    throw Explain((int)response.StatusCode, message);
                }
                return JsonDocument.Parse(raw);
            }
        }

        private static IEnumerable<JsonElement> Parts(JsonElement root)
        {
            if (root.TryGetProperty("candidates", out var candidates) &&
                candidates.GetArrayLength() > 0 &&
                candidates[0].TryGetProperty("content", out var content) &&
                content.TryGetProperty("parts", out var parts))
            {
                return parts.EnumerateArray().ToList();
            }
            return Array.Empty<JsonElement>();
        }

        private static GeminiProxyException Explain(int status, string message)
        {
            if (status == 400 && message.Contains("api key", StringComparison.OrdinalIgnoreCase))
                return new GeminiProxyException(400, "API key không hợp lệ. Kiểm tra lại key trong Google AI Studio.");
            if (status == 401 || status == 403)
                return new GeminiProxyException(400,
                    "Google không chấp nhận key này (hoặc Gemini API chưa được bật cho project). " +
                    "Nếu key bắt đầu bằng \"AQ.\" mà vẫn lỗi, hãy tạo key dạng \"AIza…\" trong Google Cloud Console.");
            if (status == 404) return new GeminiProxyException(404, "Không tìm thấy model này. Kiểm tra lại tên model trong Cài đặt.");
            if (status == 429) return new GeminiProxyException(429, "Key đã hết hạn mức tạm thời. Đợi một lúc rồi thử lại.");
            if (status >= 500) return new GeminiProxyException(502, "Máy chủ Google AI đang lỗi, thử lại sau.");
            return new GeminiProxyException(400, string.IsNullOrEmpty(message) ? $"Lỗi {status} từ Google AI." : message);
        }
    }
}
