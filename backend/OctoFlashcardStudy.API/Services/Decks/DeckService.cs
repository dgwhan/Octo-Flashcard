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

        public DeckService (ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CreateDeckResponse> CreateAsync(Guid ownerId, CreateDeckRequest request)
        {
            //validate 
            DeckValidator.ValidateCreate(request);

            //normalize name
            var normalizedName = request.Name.Trim();

            //check duplicate
            var nameExists = await _context.Decks.AnyAsync(x => x.OwnerId == ownerId && x.Name == normalizedName);

            if (nameExists) {
                throw new ApiException("A deck with the same name already exists", StatusCodes.Status409Conflict);
            }

            //create entity
            var deck = new Deck
            {
                Id = Guid.NewGuid(),
                OwnerId = ownerId,
                Name = normalizedName,
                Description = request.Description?.Trim(),
                Visibility = DeckVisibility.Private,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            //save db 
            _context.Decks.Add(deck);
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
                    Name = deck.Name,
                    Visibility = deck.Visibility,
                    CreatedAt = deck.CreatedAt,
                })
                .ToListAsync();
            
        }
    }
}
