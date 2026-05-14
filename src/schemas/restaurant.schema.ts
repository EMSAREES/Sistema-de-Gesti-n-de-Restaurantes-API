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

export const getRestaurantsSchema = z.object({
    query: z.object({
        city: z
            .string()
            .optional(), 
    }),
});

export const getRestaurantByIdSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^\d+$/, "El id debe ser un número entero.")
            .transform((val) => Number(val)), // convierte a número
    }),
});

export const DeleteRestaurant = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^\d+$/, "El id debe ser un número entero.")
            .transform((val) => Number(val)), // convierte a número
    }),
});