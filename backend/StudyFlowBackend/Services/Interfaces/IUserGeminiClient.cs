using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services.Interfaces
{
    /// <summary>Calls Gemini with a user's own key (bring-your-own-key features).</summary>
    public interface IUserGeminiClient
    {
        Task<string> GenerateAsync(
            string apiKey,
            string model,
            string system,
            IReadOnlyList<GeminiTurnDto> turns,
            bool json,
            double temperature,
            CancellationToken ct = default);

        Task<GeminiAudioDto> SynthesizeAsync(string apiKey, string text, string voice, CancellationToken ct = default);
    }

    /// <summary>A Gemini failure translated for the learner; StatusCode is what our API should answer with.</summary>
    public class GeminiProxyException : Exception
    {
        public int StatusCode { get; }

        public GeminiProxyException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
