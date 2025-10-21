import z from "zod";

export const requiredString = (fieldName: string) => 
    z.string(`${fieldName} is required`)
        .min(1, `${fieldName} is required`);