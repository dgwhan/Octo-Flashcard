using Microsoft.AspNetCore.Mvc;
using OctoFlashcardStudy.API.Contracts.Auth;
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
    }
}
