using System;
using System.Threading.Tasks;
using StudyFlowBackend.Data;
using StudyFlowBackend.Repositories.Interfaces;

namespace StudyFlowBackend.Repositories.Implementations
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public IUserRepository Users { get; }
        public ITaskRepository Tasks { get; }
        public IFocusSessionRepository FocusSessions { get; }
        public IFlashcardRepository Flashcards { get; }
        public IScannedDocumentRepository ScannedDocuments { get; }
        public IGamificationRepository Gamification { get; }
        public IPetRepository Pets { get; }
        public INotificationRepository Notifications { get; }
        public IChatMessageRepository ChatMessages { get; }

        public UnitOfWork(
            AppDbContext context,
            IUserRepository users,
            ITaskRepository tasks,
            IFocusSessionRepository focusSessions,
            IFlashcardRepository flashcards,
            IScannedDocumentRepository scannedDocuments,
            IGamificationRepository gamification,
            IPetRepository pets,
            INotificationRepository notifications,
            IChatMessageRepository chatMessages)
        {
            _context = context;
            Users = users;
            Tasks = tasks;
            FocusSessions = focusSessions;
            Flashcards = flashcards;
            ScannedDocuments = scannedDocuments;
            Gamification = gamification;
            Pets = pets;
            Notifications = notifications;
            ChatMessages = chatMessages;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
