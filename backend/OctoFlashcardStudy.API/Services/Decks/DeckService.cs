using Microsoft.EntityFrameworkCore;
using OctoFlashcardStudy.API.Contracts.Decks;
using OctoFlashcardStudy.API.Data;
using OctoFlashcardStudy.API.Domain.Entities;
using OctoFlashcardStudy.API.Domain.Enums;
using OctoFlashcardStudy.API.Exceptions;
using OctoFlashcardStudy.API.Validators;

namespace OctoFlashcardStudy.API.Services.Decks
{
    public class DeckService : IDeckService
    {
        private readonly ApplicationDbContext _context;

        public DeckService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CreateDeckResponse> CreateAsync(Guid ownerId, CreateDeckRequest request)
        {
            // validate deck
            DeckValidator.ValidateCreate(request);

            // validate flashcards
            foreach (var requestCard in request.FlashCards)
            {
                FlashCardValidator.ValidateCreate(requestCard);
            }

            // normalize deck
            var normalizedName = request.Name.Trim();

            //create deck
            var deck = new Deck
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId,
                Name = normalizedName,
                Description = request.Description?.Trim(),
                Visibility = request.Visibility,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            //add deck
            _context.Decks.Add(deck);

            // create flashcards
            foreach (var requestCard in request.FlashCards)
            {
                var flashCard = new FlashCard
                {
                    Id = Guid.NewGuid(),
                    DeckId = deck.Id,
                    Term = requestCard.Term.Trim(),
                    TermLanguage = requestCard.TermLanguage.Trim(),
                    Definition = requestCard.Definition.Trim(),
                    DefinitionLanguage = requestCard.DefinitionLanguage.Trim(),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.FlashCards.Add(flashCard);
            }

            //save db
            await _context.SaveChangesAsync();

            //return response
            return new CreateDeckResponse
            {
                Id = deck.Id,
                Name = deck.Name,
                Description = deck.Description,
                Visibility = deck.Visibility,
                CreatedAt = deck.CreatedAt
            };
        }

        public async Task<IReadOnlyList<DeckResponse>> GetAllAsync(Guid ownerId)
        {
            return await _context.Decks
                .AsNoTracking()
                .Where(deck => deck.OwnerId == ownerId)
                .OrderByDescending(deck => deck.CreatedAt)
                .Select(deck => new DeckResponse
                {
                    Id = deck.Id,
                    OwnerId = deck.OwnerId,
                    OwnerName = deck.Owner.Username,
                    Name = deck.Name,
                    Description = deck.Description,
                    Visibility = deck.Visibility,
                    CreatedAt = deck.CreatedAt,
                })
                .ToListAsync();
            
        }

        public async Task<GetDeckResponse> GetByIdAsync(Guid deckId, Guid ownerId)
        {
            var result = await _context.Decks
                .AsNoTracking()
                .Where(deck => deck.Id == deckId && deck.OwnerId == ownerId)
                .Select(deck => new GetDeckResponse
                {
                    Id = deck.Id,
                    OwnerId = deck.OwnerId,
                    OwnerName = deck.Owner.Username,
                    Name = deck.Name,
                    Description = deck.Description,
                    Visibility = deck.Visibility,
                    CreatedAt = deck.CreatedAt,
                    UpdatedAt = deck.UpdatedAt
                })
                .FirstOrDefaultAsync();

            if (result == null)
                throw new ApiException("Deck not found", StatusCodes.Status404NotFound);

            return result;
        }

        public async Task<GetDeckResponse> UpdateAsync(Guid deckId, Guid ownerId, UpdateDeckRequest request)
        {
            DeckValidator.ValidateUpdate(request);

            var deck = await _context.Decks
                .Include(deck => deck.Owner)
                .FirstOrDefaultAsync(deck => deck.Id == deckId && deck.OwnerId == ownerId);

            if (deck == null)
                throw new ApiException("Deck not found", StatusCodes.Status404NotFound);

            deck.Name = request.Name.Trim();
            deck.Description = request.Description?.Trim();
            deck.Visibility = request.Visibility;
            deck.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new GetDeckResponse
            {
                Id = deck.Id,
                OwnerId = deck.OwnerId,
                OwnerName = deck.Owner.Username,
                Name = deck.Name,
                Description = deck.Description,
                Visibility = deck.Visibility,
                CreatedAt = deck.CreatedAt,
                UpdatedAt = deck.UpdatedAt
            };
        }

        public async Task DeleteAsync(Guid deckId, Guid ownerId)
        {
            var deck = await _context.Decks
                .FirstOrDefaultAsync(deck => deck.Id == deckId && deck.OwnerId == ownerId);

            if (deck == null)
            {
                throw new ApiException(
                    "Deck not found",
                    StatusCodes.Status404NotFound);
            }

            _context.Decks.Remove(deck);

            await _context.SaveChangesAsync();
        }

    }
}
