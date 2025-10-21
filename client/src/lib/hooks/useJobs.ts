import agent from "../api/agent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useJobs(selectedId?: string) {
  const queryClient = useQueryClient();

  const { data: jobs } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await agent.get<Job[]>("/job");
      return res.data;
    },
  });

  const { data: job } = useQuery<Job | null>({
    queryKey: ["jobs", selectedId ?? null],
    queryFn: async () => {
      if (!selectedId) return null;
      const res = await agent.get<Job>(`/job/${selectedId}`);
      return res.data;
    },
    enabled: Boolean(selectedId),
  });

  const createJob = useMutation({
    mutationFn: async (payload: Omit<Job, "id">) => {
      const res = await agent.post<Job>("/job", payload);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  const deleteJob = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/job/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });

  return { jobs, job, createJob, deleteJob };
}
