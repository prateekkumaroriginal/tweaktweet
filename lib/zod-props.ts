import { z } from "zod";

export const askProps = z.object({
    text: z.string().min(1).max(280).refine(str => str.trim().length > 0)
});

export const advancedAskProps = askProps.extend({
    platform: z.enum(["INSTAGRAM", "X", "FACEBOOK", "REDDIT", "THREADS"]),
    followers: z.preprocess(
        (a) => {
            const num = Number(a);
            return num;
        },
        z.number().positive().int()
    ),
    image: z
        .instanceof(File)
        .refine(file => file.type.startsWith("image/"), {
            message: "File must be an image!"
        })
        .refine(file => file.size <= 5 * 1024 * 1024, {
            message: "File cannot be greater than 5MB!"
        })
        .optional()
});