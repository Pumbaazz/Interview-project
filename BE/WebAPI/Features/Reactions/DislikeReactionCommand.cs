using MediatR;
using WebAPI.Domain.DTO;

namespace WebAPI.Features.Reactions
{
    public class DislikeReactionCommand : IRequest<MoviesDto>
    {
        public int MovieId { get; set; }
    }
}
