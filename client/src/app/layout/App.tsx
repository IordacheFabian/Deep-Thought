import { Outlet } from "react-router";
import useJobs from "../../lib/hooks/useJobs";
// import JobCard from "../../features/dashboard/JobCard";
import { Box, Container } from "@mui/material";

export default function App() {
  const { jobs } = useJobs();

  if (!jobs) return <Container>Loading...</Container>;
  if (jobs.length === 0) return <Container>No jobs found</Container>;

  return (
    <Box minWidth={"100vw"}>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        
        {/* {jobs.map((j) => (
          <JobCard key={j.id} job={j} />
        ))} */}
        <Outlet />
      </Container>
    </Box>
  );
}
