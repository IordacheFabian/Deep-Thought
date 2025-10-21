using System;
using Domain;

namespace Persistence;

public class DbInitializer
{

    public static async Task SeedData(AppDbContext context)
    {
        if (context.Jobs.Any()) return;

        var jobs = new List<Job>
        {
            new()
            {
                Id = "3e1c9a2b-2f7e-4c51-9ebc-6b9e3c1e8f9a",
                Timestamp = "2025-10-20T12:34:56Z",
                Question = "What is the meaning of life?",
                Algorithm = "always_42",
                Answer = "42"
            }
        };

        context.Jobs.AddRange(jobs);

        await context.SaveChangesAsync();
    }

}
