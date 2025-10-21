using System;

namespace Application.DTOs;

public class BaseJobDto
{
    public string? Timestamp { get; set; }
    public string? Question { get; set; }
    public string? Algorithm { get; set; }
    public string? Answer { get; set; }

}
