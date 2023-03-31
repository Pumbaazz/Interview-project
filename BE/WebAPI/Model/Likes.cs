using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    public class Likes
    {
        /// <summary>
        /// Gets or sets the like ID.
        /// </summary>
        [Key]
        public int LikeId { get; set; }

        /// <summary>
        /// Gets or sets the user ID.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets the movie ID.
        /// </summary>
        public int MovieId { get; set; }
    }
}
