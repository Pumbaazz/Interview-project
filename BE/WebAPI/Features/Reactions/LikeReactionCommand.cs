using MediatR;
using WebAPI.Domain.DTO;

namespace WebAPI.Features.Reactions
{
    public class LikeReactionCommand : IRequest<MoviesDto>
    {
        public int MovieId { get; set; }
    }
}
