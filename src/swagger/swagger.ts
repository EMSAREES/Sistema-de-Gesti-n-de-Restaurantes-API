import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sistema de Gestión de Restaurantes API",
            version: "1.0.0",
            description: "API REST para gestionar restaurantes e integrar TheMealDB"
        },
        servers: [
            { url: `http://localhost:${PORT}`, description: "Servidor local" }
        ],
        components: {
            schemas: {
                Restaurant: {
                    type: "object",
                    properties: {
                        id:          { type: "integer", example: 1 },
                        name:        { type: "string",  example: "Tacos El Patrón" },
                        address:     { type: "string",  example: "Av. Chapultepec 123" },
                        city:        { type: "string",  example: "Guadalajara" },
                        cuisineType: { type: "string",  example: "Mexicana" },
                        rating:      { type: "number",  example: 4.5 },
                        isActive:    { type: "boolean", example: true },
                        createdAt:   { type: "string",  format: "date-time" }
                    }
                },
                RestaurantCreate: {
                    type: "object",
                    required: ["name", "address", "city", "cuisineType", "rating", "isActive"],
                    properties: {
                        name:        { type: "string",  example: "Tacos El Patrón" },
                        address:     { type: "string",  example: "Av. Chapultepec 123" },
                        city:        { type: "string",  example: "Guadalajara" },
                        cuisineType: { type: "string",  example: "Mexicana" },
                        rating:      { type: "number",  minimum: 0, maximum: 5, example: 4.5 },
                        isActive:    { type: "boolean", example: true }
                    }
                },
                Meal: {
                    type: "object",
                    properties: {
                        id:       { type: "string", example: "52772" },
                        name:     { type: "string", example: "Tacos de Birria" },
                        category: { type: "string", example: "Beef" },
                        cuisine:  { type: "string", example: "Mexican" }
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        code:  { type: "integer", example: 404 },
                        error: { type: "string",  example: "Restaurante no encontrado." }
                    }
                }
            }
        }
    },
    apis: ["./src/router/*.ts"]  // lee los comentarios de tus routers
};

export const swaggerSpec = swaggerJsdoc(options);