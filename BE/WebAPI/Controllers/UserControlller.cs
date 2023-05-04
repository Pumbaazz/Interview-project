using Microsoft.AspNetCore.Mvc;
using WebAPI.Repository.ApplicationDbContext;
using WebAPI.Features.Login;
using MediatR;
using WebAPI.Features.SignUp;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/")]
    public class UserControlller : ControllerBase
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        /// <summary>
        /// The mediator.
        /// </summary>
        public IMediator _mediator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="movieVoteDbContext">MovieVoteDbContext.</param>
        public UserControlller(ApplicationDbContext movieVoteDbContext, IMediator mediator)
        {
            MovieVoteDbContext = movieVoteDbContext;
            _mediator = mediator;
        }

        /// <summary>
        /// Login method.
        /// </summary>
        /// <returns>Data of user login successfully.</returns>
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            var result = await _mediator.Send(command).ConfigureAwait(false);
            return result;
        }

        /// <summary>
        /// Create new user.
        /// </summary>
        /// <param name="model">New user data payload.</param>
        /// <returns>Status code.</returns>
        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] SignUpCommand command)
        {
            var result = await _mediator.Send(command).ConfigureAwait(false);
            return result;
        }
    }
}
