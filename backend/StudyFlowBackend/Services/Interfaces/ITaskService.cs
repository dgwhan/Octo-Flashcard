using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;

namespace StudyFlowBackend.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetTasksByUserIdAsync(string userId);
        Task<TaskDto?> GetTaskByIdAsync(Guid id, string userId);
        Task<TaskDto> CreateTaskAsync(string userId, CreateTaskDto dto);
        Task<TaskDto?> UpdateTaskAsync(Guid id, string userId, UpdateTaskDto dto);
        Task<bool> DeleteTaskAsync(Guid id, string userId);
    }
}
