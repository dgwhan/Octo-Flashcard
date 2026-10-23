using System;
using System.Threading.Tasks;

namespace StudyFlowBackend.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        ITaskRepository Tasks { get; }
        IFocusSessionRepository FocusSessions { get; }
        IFlashcardRepository Flashcards { get; }
        IScannedDocumentRepository ScannedDocuments { get; }
        IGamificationRepository Gamification { get; }
        IPetRepository Pets { get; }
        INotificationRepository Notifications { get; }
        IChatMessageRepository ChatMessages { get; }

        Task<int> SaveChangesAsync();
    }
}
