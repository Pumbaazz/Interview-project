using WebAPI.Repository.ApplicationDbContext;
using MediatR;
using WebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Features.GetAllMovies
{
    // Replace return ienumerable entity -> Dto, create new Dto
    public class GetAllMoviesQueryHandler : IRequestHandler<GetAllMoviesQuery, IEnumerable<Movies>>
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        public GetAllMoviesQueryHandler(ApplicationDbContext movieVoteDbContext)
        {
            MovieVoteDbContext = movieVoteDbContext;
        }

        public async Task<IEnumerable<Movies>> Handle(GetAllMoviesQuery request, CancellationToken cancellationToken)
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
