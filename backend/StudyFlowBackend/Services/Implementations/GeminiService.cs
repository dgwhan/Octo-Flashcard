using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services.Implementations
{
    public class GeminiService : IGeminiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _modelName;
        private readonly ILogger<GeminiService> _logger;

        public GeminiService(HttpClient httpClient, IConfiguration configuration, ILogger<GeminiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY") 
                      ?? configuration["Gemini:ApiKey"] 
                      ?? string.Empty;
            _modelName = configuration["Gemini:Model"] ?? "gemini-3.1-flash-lite";
        }

        public async Task<(string Reply, List<AiActionSuggestionDto> Actions, bool IsSuccess)> ProcessChatWithContextAsync(
            string userMessage, 
            List<ChatMessageDto> history, 
            List<FlashcardDto> contextCards,
            string userTimeZoneId = "Asia/Ho_Chi_Minh")
        {
            if (string.IsNullOrEmpty(_apiKey))
            {
                return ("Error: Gemini API key not configured in the backend.", new List<AiActionSuggestionDto>(), false);
            }

            var url = $"https://generativelanguage.googleapis.com/v1beta/models/{_modelName}:generateContent?key={_apiKey}";

            // Tạo context từ các flashcard liên quan
            var contextBuilder = new StringBuilder();
            if (contextCards != null && contextCards.Count > 0)
            {
                contextBuilder.AppendLine("Below are flashcards related to the user's lesson. Please refer to them to answer the questions if necessary:");
                foreach (var card in contextCards)
                {
                    contextBuilder.AppendLine($"- Question: {card.Question} | Answer: {card.Answer}");
                }
                contextBuilder.AppendLine("---");
            }

            // Resolve user's timezone, fallback to "Asia/Ho_Chi_Minh"
            TimeZoneInfo userTimeZone;
            try
            {
                userTimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimeZoneId);
            }
            catch
            {
                try
                {
                    userTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                }
                catch
                {
                    userTimeZone = TimeZoneInfo.Utc;
                }
            }

            var userNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, userTimeZone);
            var currentDate = userNow.ToString("yyyy-MM-dd");
            var currentTime = userNow.ToString("HH:mm");
            var systemInstruction = $"You are a highly efficient learning assistant in the StudyFlow system. Today's date is {currentDate} ({userNow.DayOfWeek}) and current time is {currentTime} (Local Time: {userTimeZoneId}).\n" +
                                    "Your task is to support users in studying, organizing tasks, arranging schedules, and generating review flashcards.\n\n" +
                                    "=== ACTION TYPE DEFINITIONS ===\n" +
                                    "You have exactly 3 action types. You MUST pick the correct one based on user intent:\n\n" +
                                    "1. **CREATE_TASK** — For creating a to-do item, assignment, homework, reminder, or any actionable work item.\n" +
                                    "   - Keywords: \"task\", \"to-do\", \"homework\", \"assignment\", \"remind me\", \"add work\", \"deadline\", \"submit\", \"complete\"\n" +
                                    "   - Required fields: `title`, `description`, `dueDate` (YYYY-MM-DD)\n" +
                                    "   - Optional fields: `startTime` (HH:mm), `endTime` (HH:mm)\n" +
                                    "   - Example: User says \"Add a task to review math chapter 5 by Friday\" → CREATE_TASK\n\n" +
                                    "2. **CREATE_SCHEDULE** — For scheduling a study session, class, meeting, or time-blocked event.\n" +
                                    "   - Keywords: \"schedule\", \"plan\", \"session\", \"class\", \"arrange\", \"study session\", \"timetable\"\n" +
                                    "   - Required fields: `title`, `description`, `date` (YYYY-MM-DD), `startTime` (HH:mm), `endTime` (HH:mm)\n" +
                                    "   - Example: User says \"Schedule a study session for tomorrow 2-4pm\" → CREATE_SCHEDULE\n\n" +
                                    "3. **CREATE_FLASHCARD_SET** — For generating a SET of question-and-answer flashcards for studying/reviewing a topic.\n" +
                                    "   - Keywords: \"flashcard\", \"flash card\", \"study cards\", \"review cards\", \"Q&A cards\", \"quiz cards\", \"create cards\", \"generate cards\", \"thẻ ghi nhớ\", \"thẻ học\"\n" +
                                    "   - Required fields: `title`, `flashcards` array (each with `question` and `answer`, generate 5-10 cards)\n" +
                                    "   - DO NOT fill `dueDate`, `startTime`, `endTime`, or `date` for flashcard sets.\n" +
                                    "   - Example: User says \"Create flashcards about World War 2\" → CREATE_FLASHCARD_SET with 5-10 Q&A pairs\n" +
                                    "   - Example: User says \"Make study cards for biology chapter 3\" → CREATE_FLASHCARD_SET\n" +
                                    "   - Example: User says \"Tạo flashcard về lịch sử Việt Nam\" → CREATE_FLASHCARD_SET\n\n" +
                                    "=== CRITICAL RULES ===\n" +
                                    "1. You MUST NOT trigger any deletion of user data under any circumstances.\n" +
                                    "2. **FLASHCARD vs TASK DISTINCTION (MOST IMPORTANT RULE):**\n" +
                                    "   - If the user mentions \"flashcard\", \"flash card\", \"thẻ ghi nhớ\", \"study cards\", \"review cards\", \"cards\", \"Q&A\", or asks to generate/create question-answer pairs for studying → ALWAYS use **CREATE_FLASHCARD_SET**. NEVER use CREATE_TASK for these.\n" +
                                    "   - CREATE_FLASHCARD_SET MUST include a `flashcards` array with actual question-answer pairs. Never return an empty flashcards array.\n" +
                                    "   - CREATE_TASK is ONLY for actionable work items (things to do/complete), NOT for generating study materials.\n" +
                                    "3. If the user does not specify a date, use today's date.\n" +
                                    "4. Always respond strictly in the following JSON format:\n" +
                                    "{\n" +
                                    "  \"reply\": \"Friendly response message to the user\",\n" +
                                    "  \"suggestedActions\": [\n" +
                                    "     { \"actionType\": \"CREATE_TASK\", \"title\": \"Task title\", \"description\": \"Details\", \"dueDate\": \"YYYY-MM-DD\", \"startTime\": \"14:00\", \"endTime\": \"16:00\" },\n" +
                                    "     { \"actionType\": \"CREATE_FLASHCARD_SET\", \"title\": \"Flashcard Set Title\", \"description\": \"Topic description\", \"flashcards\": [ { \"question\": \"Q1?\", \"answer\": \"A1\" }, { \"question\": \"Q2?\", \"answer\": \"A2\" } ] }\n" +
                                    "  ]\n" +
                                    "}\n" +
                                    "5. Provide clean raw JSON output. Do NOT wrap it in markdown code blocks like ```json ```.";

            // Xây dựng payload contents
            var contents = new List<object>();

            // Hệ thống chỉ dẫn
            contents.Add(new
            {
                role = "user",
                parts = new[] { new { text = $"SYSTEM INSTRUCTION:\n{systemInstruction}\n\nCONTEXT:\n{contextBuilder}" } }
            });
            contents.Add(new
            {
                role = "model",
                parts = new[] { new { text = "I understand the instructions clearly. I will:\n1. Use CREATE_TASK only for actionable to-do items\n2. Use CREATE_FLASHCARD_SET whenever the user wants flashcards, study cards, or Q&A pairs - and always include the flashcards array with actual questions and answers\n3. Use CREATE_SCHEDULE for time-blocked study sessions\n4. Never confuse flashcards with tasks\n5. Respond in the requested JSON format" } }
            });

            // Lịch sử hội thoại (giới hạn vài tin nhắn gần nhất để tiết kiệm token)
            foreach (var msg in history)
            {
                contents.Add(new
                {
                    role = msg.Role == "user" ? "user" : "model",
                    parts = new[] { new { text = msg.Content } }
                });
            }

            // Câu hỏi hiện tại
            contents.Add(new
            {
                role = "user",
                parts = new[] { new { text = userMessage } }
            });

            var payload = new
            {
                contents = contents,
                generationConfig = new
                {
                    responseMimeType = "application/json",
                    temperature = 0.7
                }
            };

            try
            {
                var jsonPayload = JsonSerializer.Serialize(payload);
                var requestContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(url, requestContent);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("Gemini API Error: {Status} - {Response}", response.StatusCode, responseString);
                    return ($"The AI system is currently busy. (Gemini API Error {response.StatusCode}: {responseString})", new List<AiActionSuggestionDto>(), false);
                }

                using var doc = JsonDocument.Parse(responseString);
                var root = doc.RootElement;
                
                // Lấy text output từ cấu trúc của Gemini response
                var candidates = root.GetProperty("candidates");
                if (candidates.GetArrayLength() > 0)
                {
                    var text = candidates[0]
                        .GetProperty("content")
                        .GetProperty("parts")[0]
                        .GetProperty("text")
                        .GetString();

                    if (!string.IsNullOrEmpty(text))
                    {
                        try
                        {
                            var chatResult = JsonSerializer.Deserialize<ChatJsonResult>(text, new JsonSerializerOptions
                            {
                                PropertyNameCaseInsensitive = true
                            });

                            if (chatResult != null)
                            {
                                return (chatResult.Reply, chatResult.SuggestedActions ?? new List<AiActionSuggestionDto>(), true);
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Failed to parse Gemini response JSON: {RawText}", text);
                            return (text, new List<AiActionSuggestionDto>(), true);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while calling Gemini API");
                return ($"Unable to receive response from AI: {ex.Message} ({ex.GetType().Name})", new List<AiActionSuggestionDto>(), false);
            }

            return ("Unable to receive response from AI: Empty response or invalid structure.", new List<AiActionSuggestionDto>(), false);
        }

        public async Task<List<CreateFlashcardDto>> GenerateFlashcardsFromTextAsync(string documentText)
        {
            var result = new List<CreateFlashcardDto>();
            if (string.IsNullOrEmpty(_apiKey)) 
            {
                throw new InvalidOperationException("Error: Gemini API key not configured in the backend.");
            }

            var url = $"https://generativelanguage.googleapis.com/v1beta/models/{_modelName}:generateContent?key={_apiKey}";

            var systemPrompt = "You are an smart learning assistant. Your task is to read the scanned document text provided below and generate a list of up to 10 flashcards (concise question and corresponding answer pairs) to help the student review and memorize effectively.\n" +
                               "Respond strictly in the following JSON array format:\n" +
                               "[\n" +
                               "  { \"question\": \"Question 1\", \"answer\": \"Answer 1\" },\n" +
                               "  { \"question\": \"Question 2\", \"answer\": \"Answer 2\" }\n" +
                               "]\n" +
                               "Provide clean raw JSON output. Do NOT wrap it in markdown code blocks like ```json ```.";

            var payload = new
            {
                contents = new[]
                {
                    new {
                        role = "user",
                        parts = new[] { new { text = $"{systemPrompt}\n\nTài liệu:\n{documentText}" } }
                    }
                },
                generationConfig = new
                {
                    responseMimeType = "application/json",
                    temperature = 0.5
                }
            };

            try
            {
                var jsonPayload = JsonSerializer.Serialize(payload);
                var requestContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(url, requestContent);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("Gemini Flashcard API Error: {Status} - {Response}", response.StatusCode, responseString);
                    throw new HttpRequestException($"Gemini API Error {response.StatusCode}: {responseString}");
                }

                using var doc = JsonDocument.Parse(responseString);
                var root = doc.RootElement;
                var candidates = root.GetProperty("candidates");
                if (candidates.GetArrayLength() > 0)
                {
                    var text = candidates[0]
                        .GetProperty("content")
                        .GetProperty("parts")[0]
                        .GetProperty("text")
                        .GetString();

                    if (!string.IsNullOrEmpty(text))
                    {
                        var cards = JsonSerializer.Deserialize<List<CreateFlashcardDto>>(text, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });
                        if (cards != null) return cards;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating flashcards from Gemini API");
                throw;
            }

            throw new InvalidOperationException("Empty response or invalid structure from Gemini API.");
        }

        private class ChatJsonResult
        {
            public string Reply { get; set; } = string.Empty;
            public List<AiActionSuggestionDto>? SuggestedActions { get; set; }
        }
    }
}
