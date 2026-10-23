using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface ITaskRepository : IBaseRepository<StudyTask>
    {
        Task<List<StudyTask>> GetTasksByUserIdAsync(string userId);
        Task<StudyTask?> GetTaskByIdAsync(Guid id, string userId);
        Task<int> GetCompletedTaskCountAsync(string userId);
        Task<List<StudyTask>> GetPendingRemindersAsync(DateTime threshold);
    }
}
