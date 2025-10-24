import z from "zod";

export const requiredString = (fieldName: string) => 
    z.string(`${fieldName} is required`)
        .min(1, `${fieldName} is required`);

export const always_42 = () => {
  return 42;
};

export const hash_mod_100 = (input: string) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash % 100;
}