using Microsoft.AspNetCore.Mvc;
using WebAPI.Helper.ApplicationDbContext;
using WebAPI.Model;

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

        public MoviesController(ApplicationDbContext movieVoteDbContext)
        {
            MovieVoteDbContext = movieVoteDbContext;
        }

        /// <summary>
        /// Get all movies from database.
        /// </summary>
        /// <returns>List all movie.</returns>
        [HttpGet]
        [Route("get-movies")]
        public ActionResult<List<Movies>> GetAllMovies()
        {
            var result = MovieVoteDbContext.Movies.ToList();
            return Ok(result);
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
