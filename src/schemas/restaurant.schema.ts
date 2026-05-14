import { z } from "zod";

export const createRestaurantSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(1, "El nombre no puede estar vacío."),
        rating: z.number()
            .min(0, "El rating debe tener un valor mimínimo de 0.")
            .max(5, "El rating debe tener un valor  máximo de 5."),
    })
});

