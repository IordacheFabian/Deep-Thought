using System;
using MediatR;
using Domain;
using Microsoft.EntityFrameworkCore.Metadata;
using AutoMapper;
using Persistence;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Jobs.Queries;

public class GetJobList
{
    public class Query : IRequest<List<Job>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<Job>>
    {
        public async Task<List<Job>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Jobs
                .ProjectTo<Job>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }

}