using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OctoFlashcardStudy.API.Contracts.FlashCards;
using OctoFlashcardStudy.API.Extensions;
using OctoFlashcardStudy.API.Services.FlashCards;

namespace OctoFlashcardStudy.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/decks/{deckId:guid}/flashcards")]
    public class FlashCardController : ControllerBase
    {
        private readonly IFlashCardService _flashCardService;

        public FlashCardController(IFlashCardService flashCardService)
        {
            _flashCardService = flashCardService;
        }

        [HttpPost]
        public async Task<ActionResult<FlashCardResponse>> CreateAsync(Guid deckId, CreateFlashCardRequest request)
        {
            var ownerId = User.GetUserId();
            var response = await _flashCardService.CreateAsync(deckId, ownerId, request);
            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<FlashCardResponse>>> GetAllAsync(Guid deckId)
        {
            var ownerId = User.GetUserId();
            var response = await _flashCardService.GetAllAsync(deckId, ownerId);
            return Ok(response);
        }

        [HttpPut("{flashCardId:guid}")]
        public async Task<ActionResult<FlashCardResponse>> UpdateAsync(Guid deckId, Guid flashCardId, UpdateFlashCardRequest request)
        {
            var ownerId = User.GetUserId();
            var response = await _flashCardService.UpdateAsync(deckId, flashCardId, ownerId, request);
            return Ok(response);
        }

        [HttpDelete("{flashCardId:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid deckId, Guid flashCardId)
        {
            var ownerId = User.GetUserId();
            await _flashCardService.DeleteAsync(deckId, flashCardId, ownerId);
            return NoContent();
        }
    }
}
