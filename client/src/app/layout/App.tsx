import { Outlet } from "react-router";
import useJobs from "../../lib/hooks/useJobs";
// import JobCard from "../../features/dashboard/JobCard";
import { Box, Container, Typography } from "@mui/material";

export default function App() {
  const { jobs } = useJobs();

  if (!jobs) return <Container>Loading...</Container>;
  if (jobs.length === 0) return <Container>No jobs found</Container>;

  return (
    <Box>
      <Container>
        <Typography variant="h4" gutterBottom>Jobs</Typography>
        {/* {jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))} */}
        <Outlet />
      </Container>
    </Box>
  );
}
