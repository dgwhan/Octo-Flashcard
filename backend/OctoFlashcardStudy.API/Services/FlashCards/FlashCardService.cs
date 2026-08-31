using Microsoft.EntityFrameworkCore;
using OctoFlashcardStudy.API.Contracts.FlashCards;
using OctoFlashcardStudy.API.Data;
using OctoFlashcardStudy.API.Validators;
using OctoFlashcardStudy.API.Domain.Entities;
using OctoFlashcardStudy.API.Exceptions;

namespace OctoFlashcardStudy.API.Services.FlashCards
{
    public class FlashCardService : IFlashCardService
    {
        private readonly ApplicationDbContext _context;

        public FlashCardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FlashCardResponse> CreateAsync(Guid deckId, Guid ownerId, CreateFlashCardRequest request)
        {
            //validate
            FlashCardValidator.ValidateCreate(request);

            //verify deck existence and ownership
            var deckExists = await _context.Decks
                .AnyAsync(deck => deck.Id == deckId && deck.OwnerId == ownerId);

            if (!deckExists)
            {
                throw new ApiException("Deck not found", StatusCodes.Status404NotFound);
            }

            // normalize
            var term = request.Term.Trim();
            var termLanguage = request.TermLanguage.Trim();
            var definition = request.Definition.Trim();
            var definitionLanguage = request.DefinitionLanguage.Trim();

            // create flashcard
            var flashCard = new FlashCard
            {
                Id = Guid.NewGuid(),
                DeckId = deckId,
                Term = term,
                TermLanguage = termLanguage,
                Definition = definition,
                DefinitionLanguage = definitionLanguage,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            // save db
            _context.FlashCards.Add(flashCard);
            await _context.SaveChangesAsync();

            // return response
            return new FlashCardResponse
            {
                Id = flashCard.Id,
                DeckId = flashCard.DeckId,
                Term = flashCard.Term,
                TermLanguage = flashCard.TermLanguage,
                Definition = flashCard.Definition,
                DefinitionLanguage = flashCard.DefinitionLanguage,
                CreatedAt = flashCard.CreatedAt,
                UpdatedAt = flashCard.UpdatedAt
            };
        }
       
        public async Task<IReadOnlyList<FlashCardResponse>> GetAllAsync(Guid deckId, Guid ownerId)
        {
            return await _context.FlashCards
                .AsNoTracking()
                .Where(flashCard => flashCard.DeckId == deckId && flashCard.Deck.OwnerId == ownerId)
                .OrderBy(flashCard => flashCard.CreatedAt)
                .Select(flashCard => new FlashCardResponse
                {
                    Id = flashCard.Id,
                    DeckId = flashCard.DeckId,
                    Term = flashCard.Term,
                    TermLanguage = flashCard.TermLanguage,
                    Definition = flashCard.Definition,
                    DefinitionLanguage = flashCard.DefinitionLanguage,
                    CreatedAt = flashCard.CreatedAt,
                    UpdatedAt = flashCard.UpdatedAt
                })
                .ToListAsync();
        }   

        public async Task<FlashCardResponse> UpdateAsync(Guid deckId, Guid flashCardId, Guid ownerId, UpdateFlashCardRequest request)
        {
            FlashCardValidator.ValidateUpdate(request);

            var flashCard = await _context.FlashCards
                .FirstOrDefaultAsync(flashCard => 
                    flashCard.Id == flashCardId &&
                    flashCard.DeckId == deckId &&
                    flashCard.Deck.OwnerId == ownerId);

            if (flashCard == null)
            {
                throw new ApiException("Flashcard not found", StatusCodes.Status404NotFound);
            }

            flashCard.Term = request.Term.Trim();
            flashCard.TermLanguage = request.TermLanguage.Trim();
            flashCard.Definition = request.Definition.Trim();
            flashCard.DefinitionLanguage = request.DefinitionLanguage.Trim();
            flashCard.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new FlashCardResponse
            {
                Id = flashCardId,
                DeckId = flashCard.DeckId,
                Term = flashCard.Term,
                TermLanguage = flashCard.TermLanguage,
                Definition = flashCard.Definition,
                DefinitionLanguage = flashCard.DefinitionLanguage,
                CreatedAt = flashCard.CreatedAt,
                UpdatedAt = flashCard.UpdatedAt
            };

        }

        public async Task DeleteAsync(Guid deckId, Guid flashCardId, Guid ownerId)
        {
            var flashCard = await _context.FlashCards
                .FirstOrDefaultAsync(flashCard => 
                    flashCard.Id == flashCardId &&
                    flashCard.DeckId == deckId &&
                    flashCard.Deck.OwnerId == ownerId);

            if (flashCard == null)
            {
                throw new ApiException(
                    "Flashcard not found", StatusCodes.Status404NotFound);
            }

            _context.FlashCards.Remove(flashCard);

            await _context.SaveChangesAsync();
        }
    }
}
