using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OctoFlashcardStudy.API.Contracts.Auth;
using OctoFlashcardStudy.API.Exceptions;
using OctoFlashcardStudy.API.Extensions;
using OctoFlashcardStudy.API.Services.Auth;

namespace OctoFlashcardStudy.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var response = await _authService.RegisterAsync(request);

            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginRequest request)
        {
            var respone = await _authService.LoginAsync(request);
            return StatusCode(StatusCodes.Status200OK, respone);
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult<CurrentUserResponse> GetCurrentUser()
        {
            var userId = User.GetUserId();
            var username = User.FindFirstValue(ClaimTypes.Name);
            var email = User.FindFirstValue(ClaimTypes.Email);
            
            if (string.IsNullOrWhiteSpace(username) ||
                string.IsNullOrWhiteSpace(email))
            {
                throw new ApiException("Invalid credentials", StatusCodes.Status500InternalServerError);
            }

            var response = new CurrentUserResponse
            {
                Id = userId,
                Username = username,
                Email = email
            };

            return Ok(response);
        }

    }
}
