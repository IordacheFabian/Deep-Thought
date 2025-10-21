import z from "zod";
import { requiredString } from "../util/util";

export const jobSchema = z.object({
    question: requiredString("Question"),
    algorithm: requiredString("Algorithm"),
});

export type JobSchema = z.infer<typeof jobSchema>;