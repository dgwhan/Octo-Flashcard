using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.Models;
using StudyFlowBackend.Models.DTOs;
using StudyFlowBackend.Repositories.Interfaces;
using StudyFlowBackend.Services.Interfaces;

namespace StudyFlowBackend.Services.Implementations
{
    public class GrammarService : IGrammarService
    {
        private readonly IUnitOfWork _unitOfWork;

        // Danh sách topic IDs chuẩn theo lộ trình 3 cấp độ
        private static readonly string[] OrderedTopicIds = new[]
        {
            // Stage 1: Foundation (A1 - A2)
            "present-simple",
            "present-continuous",
            "past-simple",
            "future-simple",
            "countable-uncountable",

            // Stage 2: Intermediate (B1)
            "present-perfect",
            "comparatives-superlatives",
            "modal-verbs",
            "passive-voice",
            "conditionals-0-1",

            // Stage 3: Advanced (B2 - C1)
            "conditionals-2-3",
            "relative-clauses",
            "reported-speech",
            "inversion",
            "subjunctive-wish"
        };

        public GrammarService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GrammarRoadmapSummaryDto> GetRoadmapSummaryAsync(string userId)
        {
            var progresses = await _unitOfWork.GrammarProgress.GetByUserIdAsync(userId);
            var progressMap = progresses.ToDictionary(p => p.TopicId, p => p);

            var totalTopics = OrderedTopicIds.Length;
            var completedCount = progresses.Count(p => p.Status == "Completed");
            var inProgressCount = progresses.Count(p => p.Status == "InProgress");

            double completionPercentage = totalTopics > 0 
                ? Math.Round((double)completedCount / totalTopics * 100, 1) 
                : 0;

            var scoredPractices = progresses.Where(p => p.IsPracticeCompleted && p.PracticeScore > 0).ToList();
            double avgPracticeScore = scoredPractices.Any() 
                ? Math.Round(scoredPractices.Average(p => p.PracticeScore), 1) 
                : 0;

            var scoredMastery = progresses.Where(p => p.IsReviewCompleted && p.MasteryScore > 0).ToList();
            double avgMasteryScore = scoredMastery.Any() 
                ? Math.Round(scoredMastery.Average(p => p.MasteryScore), 1) 
                : 0;

            // Đề xuất chủ đề tiếp theo cần học
            string? nextRecommended = OrderedTopicIds.FirstOrDefault(id => 
                !progressMap.TryGetValue(id, out var prog) || prog.Status != "Completed");

            var progressDtos = progresses.Select(MapToDto).ToList();

            return new GrammarRoadmapSummaryDto
            {
                TotalTopicsCount = totalTopics,
                CompletedTopicsCount = completedCount,
                InProgressTopicsCount = inProgressCount,
                CompletionPercentage = completionPercentage,
                AveragePracticeScore = avgPracticeScore,
                AverageMasteryScore = avgMasteryScore,
                NextRecommendedTopicId = nextRecommended ?? OrderedTopicIds.FirstOrDefault(),
                ProgressList = progressDtos
            };
        }

        public async Task<GrammarProgressDto?> GetTopicProgressAsync(string userId, string topicId)
        {
            var progress = await _unitOfWork.GrammarProgress.GetByTopicIdAsync(userId, topicId);
            return progress != null ? MapToDto(progress) : null;
        }

        public async Task<GrammarProgressDto> SaveProgressAsync(string userId, SaveGrammarProgressRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.TopicId))
            {
                throw new ArgumentException("TopicId is required.", nameof(request.TopicId));
            }

            var progress = await _unitOfWork.GrammarProgress.GetByTopicIdAsync(userId, request.TopicId);
            bool isNew = false;

            if (progress == null)
            {
                isNew = true;
                progress = new UserGrammarProgress
                {
                    UserId = userId,
                    TopicId = request.TopicId,
                    CreatedAt = DateTime.UtcNow
                };
            }

            if (request.IsTheoryCompleted.HasValue && request.IsTheoryCompleted.Value)
            {
                progress.IsTheoryCompleted = true;
            }

            if (request.IsPracticeCompleted.HasValue && request.IsPracticeCompleted.Value)
            {
                progress.IsPracticeCompleted = true;
                if (request.PracticeScore.HasValue) progress.PracticeScore = Math.Max(progress.PracticeScore, request.PracticeScore.Value);
                if (request.PracticeTotalQuestions.HasValue) progress.PracticeTotalQuestions = request.PracticeTotalQuestions.Value;
                if (request.PracticeCorrectAnswers.HasValue) progress.PracticeCorrectAnswers = request.PracticeCorrectAnswers.Value;
            }

            if (request.IsReviewCompleted.HasValue && request.IsReviewCompleted.Value)
            {
                progress.IsReviewCompleted = true;
                if (request.MasteryScore.HasValue) progress.MasteryScore = Math.Max(progress.MasteryScore, request.MasteryScore.Value);
            }

            // Đánh giá trạng thái
            if (progress.IsTheoryCompleted && progress.IsPracticeCompleted)
            {
                progress.Status = "Completed";
                if (!progress.CompletedAt.HasValue)
                {
                    progress.CompletedAt = DateTime.UtcNow;
                }
            }
            else if (progress.IsTheoryCompleted || progress.IsPracticeCompleted || progress.IsReviewCompleted)
            {
                if (progress.Status != "Completed")
                {
                    progress.Status = "InProgress";
                }
            }

            progress.LastStudiedAt = DateTime.UtcNow;
            progress.UpdatedAt = DateTime.UtcNow;

            if (isNew)
            {
                await _unitOfWork.GrammarProgress.AddAsync(progress);
            }
            else
            {
                _unitOfWork.GrammarProgress.Update(progress);
            }

            // Thưởng nhẹ EXP cho User nếu hoàn thành bài học
            var user = await _unitOfWork.Users.GetByIdAsync(userId);
            if (user != null)
            {
                user.ExpPoints += 15;
                user.UpdatedAt = DateTime.UtcNow;
                _unitOfWork.Users.Update(user);
            }

            await _unitOfWork.SaveChangesAsync();

            return MapToDto(progress);
        }

        public async Task<bool> ResetProgressAsync(string userId, string topicId)
        {
            var progress = await _unitOfWork.GrammarProgress.GetByTopicIdAsync(userId, topicId);
            if (progress == null) return false;

            progress.IsTheoryCompleted = false;
            progress.IsPracticeCompleted = false;
            progress.PracticeScore = 0;
            progress.PracticeCorrectAnswers = 0;
            progress.IsReviewCompleted = false;
            progress.MasteryScore = 0;
            progress.Status = "NotStarted";
            progress.CompletedAt = null;
            progress.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.GrammarProgress.Update(progress);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        private static GrammarProgressDto MapToDto(UserGrammarProgress progress)
        {
            return new GrammarProgressDto
            {
                Id = progress.Id,
                UserId = progress.UserId,
                TopicId = progress.TopicId,
                IsTheoryCompleted = progress.IsTheoryCompleted,
                IsPracticeCompleted = progress.IsPracticeCompleted,
                PracticeScore = progress.PracticeScore,
                PracticeTotalQuestions = progress.PracticeTotalQuestions,
                PracticeCorrectAnswers = progress.PracticeCorrectAnswers,
                IsReviewCompleted = progress.IsReviewCompleted,
                MasteryScore = progress.MasteryScore,
                Status = progress.Status,
                CompletedAt = progress.CompletedAt,
                LastStudiedAt = progress.LastStudiedAt
            };
        }
    }
}
