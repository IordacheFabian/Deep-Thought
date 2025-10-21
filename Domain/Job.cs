using System;

namespace Domain;

public class Job
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? Timestamp { get; set; }
    public string? Question { get; set; }
    public string? Algorithm { get; set; }
    public string? Answer { get; set; }
}
