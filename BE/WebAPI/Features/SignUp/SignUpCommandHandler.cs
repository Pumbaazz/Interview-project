using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using WebAPI.Features.SignUp;
using WebAPI.Repository.ApplicationDbContext;
using WebAPI.Domain.Model;

namespace WebAPI.Features.Login
{
    public class SignUpCommandHandler : ControllerBase, IRequestHandler<SignUpCommand, IActionResult>
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        public SignUpCommandHandler(ApplicationDbContext movieVoteDbContext)
        {
            MovieVoteDbContext = movieVoteDbContext;
        }

        public async Task<IActionResult> Handle(SignUpCommand command, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(command.Email) || string.IsNullOrWhiteSpace(command.Password) || string.IsNullOrWhiteSpace(command.Name))
            {
                return BadRequest();
            }

            var user = await MovieVoteDbContext.Users.FirstOrDefaultAsync(x => x.Email == command.Email).ConfigureAwait(false);
            if (user != null)
            {
                // 409 Conflicts
                return Conflict();
            }

            MovieVoteDbContext.Users.Add(new User { Email = command.Email, Name = command.Name, Password = command.Password });
            MovieVoteDbContext.SaveChanges();
            return Ok();
        }
    }
}
