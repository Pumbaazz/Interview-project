using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    public class User
    {
        /// <summary>
        /// Gets or sets the user's ID.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the user's name.
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the user's email.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the user's password.
        /// </summary>
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the user react to movie.
        /// </summary>
        //public List<Likes>? Likes { get; set; }
    }
}
