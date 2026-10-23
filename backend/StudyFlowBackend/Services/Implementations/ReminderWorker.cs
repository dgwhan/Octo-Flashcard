using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StudyFlowBackend.Data;
using StudyFlowBackend.Models;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Background Hosted Service that runs periodically (every 1 minute) to check and trigger reminders.
    /// It covers both custom task reminders and the 20:00 daily summary reminder.
    /// </summary>
    public class ReminderWorker : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<ReminderWorker> _logger;
        private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(1);

        public ReminderWorker(IServiceScopeFactory serviceScopeFactory, ILogger<ReminderWorker> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        /// <summary>
        /// Main background processing loop executed when the application starts.
        /// </summary>
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Reminder Worker started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceScopeFactory.CreateScope())
                    {
                        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                        await CheckRemindersAsync(context);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An error occurred while running the Reminder Worker.");
                }

                await Task.Delay(_checkInterval, stoppingToken);
            }

            _logger.LogInformation("Reminder Worker stopped.");
        }

        /// <summary>
        /// Scans user schedules and tasks to send pending custom reminders and daily incomplete task reminders.
        /// </summary>
        private async Task CheckRemindersAsync(AppDbContext context)
        {
            var users = await context.Users.ToListAsync();
            foreach (var user in users)
            {
                // Resolve user's timezone, fallback to "Asia/Ho_Chi_Minh"
                var userTimezoneId = string.IsNullOrEmpty(user.Timezone) ? "Asia/Ho_Chi_Minh" : user.Timezone;
                TimeZoneInfo userTimeZone;
                try
                {
                    userTimeZone = TimeZoneInfo.FindSystemTimeZoneById(userTimezoneId);
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
                var userTodayStart = userNow.Date;
                var userTodayEnd = userTodayStart.AddDays(1);

                // Convert local start/end times back to UTC for database queries
                var userTodayStartUtc = TimeZoneInfo.ConvertTimeToUtc(userTodayStart, userTimeZone);
                var userTodayEndUtc = TimeZoneInfo.ConvertTimeToUtc(userTodayEnd, userTimeZone);

                // 1. Custom task reminders (ReminderTime is stored in UTC, so we compare with UTC time)
                var pendingCustomReminders = await context.Tasks
                    .Where(t => t.UserId == user.Id && t.ReminderTime != null && !t.IsReminderSent && t.ReminderTime <= DateTime.UtcNow && !t.IsCompleted)
                    .ToListAsync();

                if (pendingCustomReminders.Any())
                {
                    _logger.LogInformation($"Found {pendingCustomReminders.Count} pending custom task reminders to send for user {user.Id}.");
                    foreach (var task in pendingCustomReminders)
                    {
                        var notification = new UserNotification
                        {
                            Id = Guid.NewGuid(),
                            UserId = user.Id,
                            Title = "Task Reminder",
                            Message = $"It's time to complete the task: {task.Title}",
                            CreatedAt = DateTime.UtcNow,
                            IsRead = false,
                            Type = "CustomTask"
                        };
                        context.UserNotifications.Add(notification);
                        task.IsReminderSent = true;
                    }
                }

                // 2. Daily reminder at 20:00 (8:00 PM) for incomplete tasks
                if (userNow.Hour >= 20)
                {
                    var hasIncompleteTasks = await context.Tasks.AnyAsync(t =>
                        t.UserId == user.Id &&
                        t.Date >= userTodayStartUtc &&
                        t.Date < userTodayEndUtc &&
                        !t.IsCompleted);

                    if (hasIncompleteTasks)
                    {
                        var alreadySentToday = await context.UserNotifications.AnyAsync(un =>
                            un.UserId == user.Id &&
                            un.Type == "Daily" &&
                            un.CreatedAt >= userTodayStartUtc &&
                            un.CreatedAt < userTodayEndUtc);

                        if (!alreadySentToday)
                        {
                            _logger.LogInformation($"Sending daily reminder to user {user.FullName} ({user.Id})");
                            var notification = new UserNotification
                            {
                                Id = Guid.NewGuid(),
                                UserId = user.Id,
                                Title = "Daily Reminder",
                                Message = "You still have some unfinished tasks for today. Try to complete them as soon as possible!",
                                CreatedAt = DateTime.UtcNow,
                                IsRead = false,
                                Type = "Daily"
                            };
                            context.UserNotifications.Add(notification);
                        }
                    }
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
