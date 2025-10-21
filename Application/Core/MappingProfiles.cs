using System;
using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Job, Job>();
        CreateMap<CreateJobDto, Job>();
    }
}
