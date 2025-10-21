using System;
using Microsoft.EntityFrameworkCore;
// using Microsoft.OpenApi.Writers;
using Microsoft.Extensions.Logging;
using Persistence;
using Application.Jobs.Queries;
using Application.Core;
using Application;

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddOpenApi();

// add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfiles).Assembly);
builder.Services.AddCors();
// builder.Services.AddValidatorsFromAssemblyContaining<Application.AssemblyReference>();

builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetJobList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));

});


var app = builder.Build();

app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    // add your dev origins (Vite often uses 5173/5174); include whatever port your client runs on
    .WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:5174")
);

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred while migrating the database.");
}
    


app.Run();
