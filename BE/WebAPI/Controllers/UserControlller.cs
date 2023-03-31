using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using WebAPI.Helper.ApplicationDbContext;
using WebAPI.Model;
using WebAPI.ExceptionHandling;

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

        public UserControlller(ApplicationDbContext movieVoteDbContext)
        {
            MovieVoteDbContext = movieVoteDbContext;
        }

        /// <summary>
        /// Login method.
        /// </summary>
        /// <returns>Data of user login successfully.</returns>
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if(string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password)) 
            {
                return BadRequest();
            }
            var user = await MovieVoteDbContext.Users.FirstOrDefaultAsync(x => x.Email == model.Email && x.Password == model.Password).ConfigureAwait(false);
            if (user == null)
            {
                return Unauthorized();
            }
            // Refactor return JWT

            return Ok(user);
        }

        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel model)
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
