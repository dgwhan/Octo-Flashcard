using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StudyFlowBackend.Repositories.Interfaces;

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

            try
            {
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

                    await Task.Delay(_checkInterval, stoppingToken);
                }
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                // Graceful shutdown requested
            }

            _logger.LogInformation("TrashCleanupService is stopping.");
        }

        private async Task CleanupTrashAsync(CancellationToken stoppingToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var docRepo = scope.ServiceProvider.GetRequiredService<IScannedDocumentRepository>();
                var storageQuotaService = scope.ServiceProvider.GetRequiredService<IStorageQuotaService>();

                var cutoffDate = DateTime.UtcNow.AddDays(-_retentionDays);
                var documentsToDelete = await docRepo.GetDeletedBeforeAsync(cutoffDate);

                if (documentsToDelete.Any())
                {
                    var userIdsToUpdate = documentsToDelete.Select(d => d.UserId).Distinct().ToList();

                    docRepo.RemoveRange(documentsToDelete);
                    await docRepo.SaveChangesAsync();

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
