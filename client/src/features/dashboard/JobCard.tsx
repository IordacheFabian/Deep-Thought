import { Box, Stack } from "@mui/material";

type Props = {
    job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <Box sx={{ backgroundColor: "grey", borderRadius: 3}}>
      <Stack spacing={1} sx={{ padding: 2 }}>
        <h2>{job?.question ?? "Untitled"}</h2>
        <p>{job?.algorithm ?? "No algorithm provided"}</p>
      </Stack>
    </Box>
  );
}
