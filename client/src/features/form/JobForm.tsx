import type { JobSchema } from "../../lib/schemas/jobSchema";
import { jobSchema } from "../../lib/schemas/jobSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import useJobs from "../../lib/hooks/useJobs";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grow, Stack, Typography } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import SelectInput from "../../app/shared/components/SelectInput";

export default function JobForm() {
    const { control, reset, handleSubmit } = useForm<JobSchema>({
        mode: "onTouched",
        resolver: zodResolver(jobSchema),
    });

    const [loading, setLoading] = useState(false);

    const algorithms = [
      { text: "Algorithm A", value: "algorithm_a" },
      { text: "Algorithm B", value: "algorithm_b" },
      { text: "Algorithm C", value: "algorithm_c" },
    ];

    const navigate = useNavigate();
    const { id } = useParams();
    const { createJob, job } = useJobs(id);

    useEffect(() => {
      if (job) {
        reset({
          ...job,
        });
      }
    }, [job, reset]);

    const onSubmit = async (data: JobSchema) => {
      setLoading(true);
      const delay = Math.floor(Math.random() * 4000) + 1000; 
      await new Promise((r) => setTimeout(r, delay));

      try {
        if (createJob.mutateAsync) {
          const result = await createJob.mutateAsync(data);
          navigate("/");
        } else {
          createJob.mutate(data, {
            onSuccess: () => navigate("/"),
            onError: (err) => console.error(err),
          });
        }
       
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <Grow in timeout={360} style={{ transformOrigin: "top center" }}>
      <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            background:
              "linear-gradient(90deg, rgba(123,97,255,0.12), rgba(41,182,246,0.08))",
          }}
        >
          <Typography>Ask something...</Typography>
        </Box>

        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <TextInput label="Question" control={control} name="question" />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <SelectInput
                control={control}
                label="Algorithm"
                name="algorithm"
                fullWidth
                items={algorithms}
              />
            </Stack>

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 1,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  textTransform: "none",
                  background: "linear-gradient(90deg, #7b61ff, #29b6f6)",
                  color: "#fff",
                  borderRadius: 3,
                  px: 3,
                  py: 1.2,
                  "&:hover": {
                    background: "linear-gradient(90deg, #29b6f6, #7b61ff)",
                  },
                }}
                
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : "Send"}
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
}