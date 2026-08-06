using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OctoFlashcardStudy.API.Contracts.Decks;
using OctoFlashcardStudy.API.Extensions;
using OctoFlashcardStudy.API.Services.Decks;

namespace OctoFlashcardStudy.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/decks")]
    public class DeckController : ControllerBase
    {
        private readonly IDeckService _deckService;

        public DeckController(IDeckService deckService)
        {
            _deckService = deckService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<CreateDeckResponse>> Create(
            CreateDeckRequest request)
        {
            //get current user
            var ownerId = User.GetUserId();

            var response = await _deckService.CreateAsync(ownerId, request);

            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpGet("mydeck")]
        public async Task<ActionResult<IReadOnlyList<DeckResponse>>> GetAllAsync()
        {
            var ownerId = User.GetUserId();
            var response = await _deckService.GetAllAsync(ownerId);
             
            return Ok(response);
        }
    }
}
