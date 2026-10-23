using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Service class implementing ITaskService interface to execute business rules for managing Study Tasks.
    /// </summary>
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IGamificationService _gamificationService;

        public TaskService(ITaskRepository taskRepository, IGamificationService gamificationService)
        {
            _taskRepository = taskRepository;
            _gamificationService = gamificationService;
        }

        /// <summary>
        /// Retrieves all study tasks for a specific user ID, ordered by date descending.
        /// </summary>
        public async Task<IEnumerable<TaskDto>> GetTasksByUserIdAsync(string userId)
        {
            var tasks = await _taskRepository.GetTasksByUserIdAsync(userId);
            return tasks.Select(MapToDto);
        }

        /// <summary>
        /// Retrieves a specific task for a user.
        /// </summary>
        public async Task<TaskDto?> GetTaskByIdAsync(Guid id, string userId)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id, userId);
            if (task == null) return null;
            return MapToDto(task);
        }

        /// <summary>
        /// Creates a new study task and saves it to the database.
        /// </summary>
        public async Task<TaskDto> CreateTaskAsync(string userId, CreateTaskDto dto)
        {
            var task = new StudyTask
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Title = dto.Title,
                Description = dto.Description,
                Date = dto.Date,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                IsCompleted = false,
                ReminderTime = dto.ReminderTime,
                IsReminderSent = false
            };

            await _taskRepository.AddAsync(task);
            await _taskRepository.SaveChangesAsync();

            return MapToDto(task);
        }

        /// <summary>
        /// Updates a study task. If the status transitions to Completed, rewards XP and Coins to the user.
        /// </summary>
        public async Task<TaskDto?> UpdateTaskAsync(Guid id, string userId, UpdateTaskDto dto)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id, userId);
            if (task == null) return null;

            bool wasCompleted = task.IsCompleted;

            if (dto.Title != null) task.Title = dto.Title;
            if (dto.Description != null) task.Description = dto.Description;
            if (dto.Date.HasValue) task.Date = dto.Date.Value;
            if (dto.StartTime.HasValue) task.StartTime = dto.StartTime.Value;
            if (dto.EndTime.HasValue) task.EndTime = dto.EndTime.Value;
            if (dto.IsCompleted.HasValue) task.IsCompleted = dto.IsCompleted.Value;
            
            // Check if ReminderTime is modified
            if (dto.ReminderTime != task.ReminderTime)
            {
                task.ReminderTime = dto.ReminderTime;
                task.IsReminderSent = false;
            }

            _taskRepository.Update(task);
            await _taskRepository.SaveChangesAsync();

            // If the task transitions to Completed status (from not completed)
            if (task.IsCompleted && !wasCompleted)
            {
                await _gamificationService.AddXpAndCoinsAsync(userId, 10, 10, $"Task completed: {task.Title}");
            }

            return MapToDto(task);
        }

        /// <summary>
        /// Deletes a study task from the database.
        /// </summary>
        public async Task<bool> DeleteTaskAsync(Guid id, string userId)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id, userId);
            if (task == null) return false;

            _taskRepository.Remove(task);
            await _taskRepository.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Maps a StudyTask entity to its corresponding TaskDto object.
        /// </summary>
        private static TaskDto MapToDto(StudyTask task)
        {
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Date = task.Date,
                StartTime = task.StartTime,
                EndTime = task.EndTime,
                IsCompleted = task.IsCompleted,
                UserId = task.UserId,
                ReminderTime = task.ReminderTime
            };
        }
    }
}
