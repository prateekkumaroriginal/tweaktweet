import { z } from "zod";

export const askProps = z.object({
    text: z.string().min(1).max(280).refine(str => str.trim().length > 0)
});