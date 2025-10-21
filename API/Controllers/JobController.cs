using System;
using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using Application.Commands;
using Application.DTOs;
using Application.Jobs.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;


namespace API.Controllers;


public class JobController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Job>>> GetJobs()
    {
        return await Mediator.Send(new GetJobList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Job>> GetJobDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetJobDetails.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<Job>> CreateJob(CreateJobDto job)
    {
        return HandleResult(await Mediator.Send(new CreateJob.Command { JobDto = job }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteJob(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteJob.Command { Id = id }));
    }
}
