using System;
using System.Runtime.InteropServices;
using Application.Core;
using Application.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Commands;

public class CreateJob
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateJobDto JobDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var job = mapper.Map<Job>(request.JobDto);
            context.Jobs.Add(job);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to create job", 400);

            return Result<string>.Success(job.Id);

        }
    }
}
