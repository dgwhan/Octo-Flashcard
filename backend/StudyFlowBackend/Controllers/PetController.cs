using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.Models;
using StudyFlowBackend.Services;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PetController : ControllerBase
    {
        private readonly IPetService _petService;
        private readonly IUserUtils _userUtils;

        public PetController(IPetService petService, IUserUtils userUtils)
        {
            _petService = petService;
            _userUtils = userUtils;
        }

        public class AdoptPetDto
        {
            public string Name { get; set; } = string.Empty;
            public string PetType { get; set; } = string.Empty;
        }

        [HttpGet]
        public async Task<IActionResult> GetPet()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            var pet = await _petService.GetPetAsync(userId);
            if (pet == null)
            {
                // Trả về dữ liệu trống để Client biết là chưa nhận nuôi Pet
                return Ok(ApiResponse<StudyPet>.SuccessResponse(null, "No pet found. Please adopt one."));
            }

            return Ok(ApiResponse<StudyPet>.SuccessResponse(pet));
        }

        [HttpPost("adopt")]
        public async Task<IActionResult> AdoptPet([FromBody] AdoptPetDto dto)
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest(ApiResponse<object>.ErrorResponse("The pet's name cannot be left blank."));

            if (string.IsNullOrWhiteSpace(dto.PetType))
                return BadRequest(ApiResponse<object>.ErrorResponse("The pet type is invalid."));

            try
            {
                var pet = await _petService.AdoptPetAsync(userId, dto.Name, dto.PetType);
                return Ok(ApiResponse<StudyPet>.SuccessResponse(pet, "The pet has been adopted successfully!"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpPost("feed")]
        public async Task<IActionResult> FeedPet()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            try
            {
                var pet = await _petService.FeedPetAsync(userId);
                return Ok(ApiResponse<StudyPet>.SuccessResponse(pet, "The pet has been fed successfully!"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }

        [HttpPost("interact")]
        public async Task<IActionResult> InteractPet()
        {
            var userId = _userUtils.GetCurrentUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(ApiResponse<object>.ErrorResponse("Unauthorized"));

            try
            {
                var pet = await _petService.InteractWithPetAsync(userId);
                return Ok(ApiResponse<StudyPet>.SuccessResponse(pet, "Interacted with the pet successfully!"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<object>.ErrorResponse(ex.Message));
            }
        }
    }
}
