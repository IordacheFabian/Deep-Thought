import { Box, Typography } from "@mui/material";
import useJobs from "../../lib/hooks/useJobs"
import JobCard from "./JobCard";

export default function JobList() {
  const {jobs} = useJobs();

  if(!jobs) return <Typography>No jobs available</Typography>;

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
        {jobs.map(job => (
            <JobCard key={job.id} job={job} />
        ))}
    </Box>
  )
}