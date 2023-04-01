using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using WebAPI.Helper.ApplicationDbContext;
using WebAPI.Model;
using WebAPI.Model.Queries;

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

        [HttpGet]
        [Route("get-movies")]
        public ActionResult<List<Movies>> GetAllMovies()
        {
            var result = MovieVoteDbContext.Movies.ToList();
            return Ok(result);
        }

        [HttpPut]
        [Route("like/{movieId}")]
        public async Task<IActionResult> UpdateReactionLike(int movieId)
        {
            var movie = MovieVoteDbContext.Movies.FirstOrDefault(x => x.MovieId == movieId);
            if(movie == null) 
            {
                return BadRequest();
            }
            movie.Likes++;
            await MovieVoteDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("dislike/{movieId}")]
        public async Task<IActionResult> UpdateReactionDislike(int movieId)
        {
            var movie = MovieVoteDbContext.Movies.FirstOrDefault(x => x.MovieId == movieId);
            if(movie == null) 
            {
                return BadRequest();
            }
            if(movie.Likes > 0)
            {
                movie.Likes--;
            }
            await MovieVoteDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
