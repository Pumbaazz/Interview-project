using MediatR;
using WebAPI.Model;

namespace WebAPI.Features.GetAllMovies
{
    public class GetAllMoviesQuery : IRequest<IEnumerable<Movies>>
    {
    }
}
