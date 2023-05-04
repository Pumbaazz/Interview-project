using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Repository.ApplicationDbContext;

namespace WebAPI.Features.Login
{
    public class LoginCommandHandler : ControllerBase, IRequestHandler<LoginCommand, IActionResult>
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        public LoginCommandHandler(ApplicationDbContext movieVoteDbContext)
        {
            MovieVoteDbContext = movieVoteDbContext;
        }

        public async Task<IActionResult> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(command.Email) || string.IsNullOrWhiteSpace(command.Password))
            {
                return BadRequest();
            }
            var user = await MovieVoteDbContext.Users.FirstOrDefaultAsync(x => x.Email == command.Email && x.Password == command.Password).ConfigureAwait(false);
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

    }
}
