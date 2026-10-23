using Microsoft.AspNetCore.Mvc;
using StudyFlowBackend.Utils;

namespace StudyFlowBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(ApiResponse<string>.SuccessResponse("pong", "Server is running smoothly."));
        }
    }
}
