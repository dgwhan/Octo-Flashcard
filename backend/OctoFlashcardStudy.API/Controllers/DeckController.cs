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

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<DeckResponse>>> GetAllAsync()
        {
            var ownerId = User.GetUserId();
            var response = await _deckService.GetAllAsync(ownerId);
             
            return Ok(response);
        }

        [HttpGet("{deckId:guid}")]
        public async Task<ActionResult<GetDeckResponse>> GetByIdAsync(Guid deckId)
        {
            var ownerId = User.GetUserId();
            var response = await _deckService.GetByIdAsync(deckId, ownerId);

            return Ok(response);
        }

        [HttpPut("{deckId:guid}")]
        public async Task<ActionResult<GetDeckResponse>> UpdateAsync(Guid deckId, UpdateDeckRequest request)
        {
            var ownerId = User.GetUserId();
            var response = await _deckService.UpdateAsync(deckId, ownerId, request);

            return StatusCode(StatusCodes.Status200OK, response);
        }

        [HttpDelete("{deckId:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid deckId)
        {
            var ownerId = User.GetUserId();

            await _deckService.DeleteAsync(deckId, ownerId);

            return NoContent();
        }
    }
}
