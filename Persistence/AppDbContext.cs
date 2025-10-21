using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Job> Jobs { get; set; }
}
