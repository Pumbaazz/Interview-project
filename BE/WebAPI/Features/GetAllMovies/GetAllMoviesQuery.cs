using MediatR;
using WebAPI.Domain.Model;

namespace WebAPI.Features.GetAllMovies
{
    public class GetAllMoviesQuery : IRequest<IEnumerable<Movies>>
    {
    }
}
