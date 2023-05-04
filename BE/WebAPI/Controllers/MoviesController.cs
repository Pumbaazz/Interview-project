using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Helper.ApplicationDbContext;
using WebAPI.Model;
using WebAPI.Commands;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/")]
    public class MoviesController : ControllerBase
    {
        /// <summary>
        /// Application db context.
        /// </summary>
        public ApplicationDbContext MovieVoteDbContext;

        /// <summary>
        /// The mediator.
        /// </summary>
        public IMediator _mediator;

        public MoviesController(ApplicationDbContext movieVoteDbContext, IMediator mediator)
        {
            MovieVoteDbContext = movieVoteDbContext;
            _mediator = mediator;
        }

        /// <summary>
        /// Get all movies from database.
        /// </summary>
        /// <returns>List all movie.</returns>
        [HttpGet]
        [Route("get-movies")]
        public async Task<IEnumerable<Movies>> GetAllMovies()
        {
            //var result = await MovieVoteDbContext.Movies.ToListAsync().ConfigureAwait(false);
            //return Ok(result);
            var result = await _mediator.Send(new GetAllMoviesCommand()).ConfigureAwait(false);
            return result;
        }

        /// <summary>
        /// Update like number when action is like.
        /// </summary>
        /// <param name="movieId">The movie ID.</param>
        /// <returns>Movie modified.</returns>
        [HttpPut]
        [Route("like/{movieId}")]
        public async Task<Movies> UpdateReactionLike(int movieId)
        {
            var movie = MovieVoteDbContext.Movies.FirstOrDefault(x => x.MovieId == movieId);
            if(movie == null) 
            {
                throw new BadHttpRequestException("An error occurred. Please try again later.");
            }
            movie.Likes++;
            await MovieVoteDbContext.SaveChangesAsync().ConfigureAwait(false);
            return movie;
        }

        /// <summary>
        /// Update like number when action is dislike.
        /// </summary>
        /// <param name="movieId">The movie ID.</param>
        /// <returns>Movie modified.</returns>
        [HttpPut]
        [Route("dislike/{movieId}")]
        public async Task<Movies> UpdateReactionDislike(int movieId)
        {
            var movie = MovieVoteDbContext.Movies.FirstOrDefault(x => x.MovieId == movieId);
            if(movie == null) 
            {
                throw new BadHttpRequestException("An error occurred. Please try again later.");
            }
            if (movie.Likes > 0)
            {
                movie.Likes--;
            }
            await MovieVoteDbContext.SaveChangesAsync().ConfigureAwait(false);
            return movie;
        }
    }
}
