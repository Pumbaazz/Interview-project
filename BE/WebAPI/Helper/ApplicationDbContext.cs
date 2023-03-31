using Microsoft.EntityFrameworkCore;
using Npgsql;
using WebAPI.Model;

namespace WebAPI.Helper.ApplicationDbContext
{
    public class ApplicationDbContext : DbContext
    {
        protected readonly IConfiguration? Configuration;

        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Likes> Likes { get; set; }
        public DbSet<Movies> Movies { get; set; }
    }
}
