using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Repositories.Implementations
{
    public class TaskRepository : BaseRepository<StudyTask>, ITaskRepository
    {
        public TaskRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<StudyTask>> GetTasksByUserIdAsync(string userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Date)
                .ToListAsync();
        }

        public async Task<StudyTask?> GetTaskByIdAsync(Guid id, string userId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
        }

        public async Task<int> GetCompletedTaskCountAsync(string userId)
        {
            return await _context.Tasks
                .CountAsync(t => t.UserId == userId && t.IsCompleted);
        }

        public async Task<List<StudyTask>> GetPendingRemindersAsync(DateTime threshold)
        {
            return await _context.Tasks
                .Where(t => !t.IsCompleted && !t.IsReminderSent && t.ReminderTime.HasValue && t.ReminderTime.Value <= threshold)
                .ToListAsync();
        }
    }
}
