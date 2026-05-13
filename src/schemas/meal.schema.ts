import { z } from "zod";

export const searchMealSchema = z.object({
    query: z.object({
        name: z.string().trim().min(1, "El nombre es obligatorio.")
    })
});