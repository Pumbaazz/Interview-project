using WebAPI.Helper.ApplicationDbContext;
using WebAPI.Commands;
using MediatR;
using WebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Handlers
{
    public class GetAllMoviesHandler : IRequestHandler<GetAllMoviesCommand, IEnumerable<Movies>>
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        public GetAllMoviesHandler(ApplicationDbContext movieVoteDbContext)
        {
            MovieVoteDbContext = movieVoteDbContext;
        }

        public async Task<IEnumerable<Movies>> Handle(GetAllMoviesCommand request, CancellationToken cancellationToken)
        {
            if (request is null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            var result = await MovieVoteDbContext.Movies.ToListAsync().ConfigureAwait(false);
            return result;
        }
    }
}
