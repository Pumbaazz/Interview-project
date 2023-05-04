using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using WebAPI.Helper.ApplicationDbContext;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json.Linq;
using WebAPI.Queries;

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
        /// Constructor
        /// </summary>
        /// <param name="movieVoteDbContext">MovieVoteDbContext.</param>
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
        public async Task<IActionResult> Login([FromBody] LoginQuery model)
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

            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my super secret key with 32 bytes"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken(
                issuer: "JwtIssuer",
                audience: "JwtAudience",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
        }

        /// <summary>
        /// Create new user.
        /// </summary>
        /// <param name="model">New user data payload.</param>
        /// <returns>Status code.</returns>
        [HttpPost]
        [Route("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] SignUpQuery model)
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
