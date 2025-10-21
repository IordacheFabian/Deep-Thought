using System;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs.Queries;

public class GetJobDetails
{
    public class Query : IRequest<Result<Job>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<Job>>
    {
        public async Task<Result<Job>> Handle(Query request, CancellationToken cancellationToken)
        {
            var job = await context.Jobs
                .ProjectTo<Job>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

            if (job == null) return Result<Job>.Failure("Job not found", 404); 

            return Result<Job>.Success(job);  
        }
    }
}
