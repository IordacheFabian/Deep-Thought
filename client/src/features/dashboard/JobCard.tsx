import { Box, Button, Stack, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useJobs from "../../lib/hooks/useJobs";
import { useState } from "react";

type Props = {
    job: Job;
}

export default function JobCard({ job }: Props) {
  const { deleteJob } = useJobs();
  const [isLoading, setLoading] = useState(false);

  async function handleDelete(id: string): Promise<void> {
    // if (!window.confirm("Delete this job?")) return;

    setLoading(true);

    const delay = Math.floor(Math.random() * 2000) + 1000;
    await new Promise((r) => setTimeout(r, delay));
    deleteJob.mutate(id);
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,
        backgroundColor: "background.paper",
        borderRadius: 3,
        mx: "auto",
        color: "text.primary",
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <Stack spacing={1} sx={{ padding: 3 }}>
        <h2 style={{ margin: 0, textAlign: "center" }}>{job?.question ?? "Untitled"}</h2>
        <p style={{ margin: 0, textAlign: "center" }}>{job?.answer ?? "No answer provided"}</p>
        <p style={{ margin: 0, textAlign: "center", opacity: 0.8 }}>Algorithm: {job?.algorithm ?? "No algorithm provided"}</p>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center", p: 2, bgcolor: "background.default" }}>
        <Button
          startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <DeleteIcon />}
          variant="contained"
          color="error"
          sx={{
            textTransform: "none",
            background:
              "linear-gradient(90deg, rgba(255,90,90,1) 0%, rgba(196,45,45,1) 100%)",
            borderRadius: 3,
            px: 3,
            py: 1,
            boxShadow: "0 6px 18px rgba(196,45,45,0.18)",
            fontWeight: 700,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 28px rgba(196,45,45,0.24)",
              background:
                "linear-gradient(90deg, rgba(196,45,45,1) 0%, rgba(255,90,90,1) 100%)",
            },
            transition:
              "transform 120ms ease, box-shadow 120ms ease, background 120ms ease",
          }}
          onClick={() => handleDelete(job.id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
