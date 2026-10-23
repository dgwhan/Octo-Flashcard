using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StudyFlowBackend.Data;

namespace StudyFlowBackend.Services
{
    /// <summary>
    /// Background service to automatically permanently delete scanned documents
    /// that have been in the trash for more than 10 days.
    /// Runs periodically (e.g., daily).
    /// </summary>
    public class TrashCleanupService : BackgroundService
    {
        private readonly ILogger<TrashCleanupService> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly TimeSpan _checkInterval = TimeSpan.FromHours(24);
        private readonly int _retentionDays = 10;

        public TrashCleanupService(ILogger<TrashCleanupService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("TrashCleanupService is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await CleanupTrashAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while cleaning up trash.");
                }

                // Wait before running again
                await Task.Delay(_checkInterval, stoppingToken);
            }

            _logger.LogInformation("TrashCleanupService is stopping.");
        }

        private async Task CleanupTrashAsync(CancellationToken stoppingToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var storageQuotaService = scope.ServiceProvider.GetRequiredService<IStorageQuotaService>();

                var cutoffDate = DateTime.UtcNow.AddDays(-_retentionDays);

                var documentsToDelete = await context.ScannedDocuments
                    .IgnoreQueryFilters()
                    .Where(d => d.IsDeleted && d.DeletedAt != null && d.DeletedAt < cutoffDate)
                    .ToListAsync(stoppingToken);

                if (documentsToDelete.Any())
                {
                    var userIdsToUpdate = documentsToDelete.Select(d => d.UserId).Distinct().ToList();

                    context.ScannedDocuments.RemoveRange(documentsToDelete);
                    await context.SaveChangesAsync(stoppingToken);

                    // Update storage quota for affected users
                    foreach (var userId in userIdsToUpdate)
                    {
                        await storageQuotaService.UpdateUsageAsync(userId);
                    }

                    _logger.LogInformation($"Cleaned up {documentsToDelete.Count} items from trash.");
                }
            }
        }
    }
}
