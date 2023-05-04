using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using WebAPI.Repository.ApplicationDbContext;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Commands;
using WebAPI.Features.Login;
using WebAPI.Features.GetAllMovies;
using MediatR;

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
        public async Task<IActionResult> Login([FromBody] LoginCommand model)
        {
            var result = await _mediator.Send(model).ConfigureAwait(false);
            return result;
        }

        /// <summary>
        /// Create new user.
        /// </summary>
        /// <param name="model">New user data payload.</param>
        /// <returns>Status code.</returns>
        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] SignUpCommand model)
        {
            if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password) || string.IsNullOrWhiteSpace(model.Name))
            {
                return BadRequest();
            }

            var user = await MovieVoteDbContext.Users.FirstOrDefaultAsync(x => x.Email == model.Email).ConfigureAwait(false);
            if(user != null)
            {
                // 409 Conflicts
                return Conflict();
            }

            MovieVoteDbContext.Users.Add(new Model.User { Email = model.Email, Name = model.Name, Password = model.Password });
            MovieVoteDbContext.SaveChanges();
            return Ok();
        }
    }
}
