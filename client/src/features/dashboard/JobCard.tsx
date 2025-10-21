import { Box } from "@mui/material";

type Props = {
    job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <Box>
      <h2>{job?.question ?? "Untitled"}</h2>
      <p>{job?.algorithm ?? "No algorithm provided"}</p>
    </Box>
  );
}
