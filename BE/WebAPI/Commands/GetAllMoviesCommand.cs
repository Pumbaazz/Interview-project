using MediatR;
using WebAPI.Model;

namespace WebAPI.Commands
{
    public class GetAllMoviesCommand : IRequest<IEnumerable<Movies>>
    {
    }
}
