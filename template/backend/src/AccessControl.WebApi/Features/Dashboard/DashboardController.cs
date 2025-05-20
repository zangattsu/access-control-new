using AccessControl.Application.Users.CreateUser;
using AccessControl.WebApi.Common;
using AccessControl.WebApi.Features.Users.CreateUser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccessControl.WebApi.Features.Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : BaseController
    {
        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="request">The user creation request</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>The created user details</returns>
        [HttpGet]
        public IActionResult GetTestAuth()
        {
            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Test successfully"
            });
        }
    }
}
