using WebAPI.Repository.ApplicationDbContext;
using MediatR;
using WebAPI.Domain.Model;
using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.DTO;
using AutoMapper;
using WebAPI.Features.Reactions;

namespace WebAPI.Features.GetAllMovies
{
    // Replace return ienumerable entity -> Dto, create new Dto
    public class DislikeReactionCommandHandler : IRequestHandler<DislikeReactionCommand, MoviesDto>
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        private readonly IMapper _mapper;

        public DislikeReactionCommandHandler(ApplicationDbContext movieVoteDbContext, IMapper mapper)
        {
            MovieVoteDbContext = movieVoteDbContext;
            _mapper = mapper;
        }

        public async Task<MoviesDto> Handle(DislikeReactionCommand request, CancellationToken cancellationToken)
        {
            var movie = MovieVoteDbContext.Movies.FirstOrDefault(x => x.MovieId == request.MovieId);
            if (movie == null)
            {
                throw new BadHttpRequestException("An error occurred. Please try again later.");
            }
            if (movie.Likes > 0)
            {
                movie.Likes--;
            }
            await MovieVoteDbContext.SaveChangesAsync().ConfigureAwait(false);
            var result = this._mapper.Map<Movies, MoviesDto>(movie);
            return result;
        }
    }
}
