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
    public class LikeReactionCommandHandler : IRequestHandler<LikeReactionCommand, MoviesDto>
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        private readonly IMapper _mapper;

        public LikeReactionCommandHandler(ApplicationDbContext movieVoteDbContext, IMapper mapper)
        {
            MovieVoteDbContext = movieVoteDbContext;
            _mapper = mapper;
        }

        public async Task<MoviesDto> Handle(LikeReactionCommand request, CancellationToken cancellationToken)
        {
            var movie = MovieVoteDbContext.Movies.FirstOrDefault(x => x.MovieId == request.MovieId);
            if (movie == null)
            {
                throw new BadHttpRequestException("An error occurred. Please try again later.");
            }

            movie.Likes++;
            MovieVoteDbContext.SaveChanges();
            var result = this._mapper.Map<Movies, MoviesDto>(movie);
            return await Task.FromResult(result);
        }
    }
}
