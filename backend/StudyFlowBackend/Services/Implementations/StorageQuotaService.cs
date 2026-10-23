using System;
using System.Threading.Tasks;
using StudyFlowBackend.DTOs;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Services
{
    public class StorageQuotaService : IStorageQuotaService
    {
        private readonly IUserRepository _userRepository;
        private readonly IScannedDocumentRepository _scannedDocumentRepository;

        public StorageQuotaService(
            IUserRepository userRepository,
            IScannedDocumentRepository scannedDocumentRepository)
        {
            _userRepository = userRepository;
            _scannedDocumentRepository = scannedDocumentRepository;
        }

        public async Task<bool> CheckQuotaAsync(string userId, long additionalBytes)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return false;

            var currentUsage = await _scannedDocumentRepository.GetTotalStorageBytesAsync(userId);
            var quotaBytes = (user.StorageQuotaBytes > 0) ? user.StorageQuotaBytes : 209715200; // Default 200MB

            return (currentUsage + additionalBytes) <= quotaBytes;
        }

        public async Task UpdateUsageAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return;

            var totalUsage = await _scannedDocumentRepository.GetTotalStorageBytesAsync(userId);

            user.StorageUsedBytes = totalUsage;
            user.UpdatedAt = DateTime.UtcNow;
            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();
        }

        public async Task<StorageUsageResponseDto> GetUsageAsync(string userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            var documentCount = await _scannedDocumentRepository.GetDocumentCountAsync(userId);
            var usedBytes = await _scannedDocumentRepository.GetTotalStorageBytesAsync(userId);
            var quotaBytes = (user != null && user.StorageQuotaBytes > 0) ? user.StorageQuotaBytes : 209715200;

            return new StorageUsageResponseDto
            {
                UsedBytes = usedBytes,
                QuotaBytes = quotaBytes,
                UsedPercentage = quotaBytes > 0 ? Math.Round((double)usedBytes / quotaBytes * 100, 2) : 0,
                DocumentCount = documentCount
            };
        }
    }
}
