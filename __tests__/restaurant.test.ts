import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import request from "supertest";
import app from "../src/app";
import prisma from "../src/database/prismaClient";

// Limpia la DB antes y después de los tests
beforeAll(async () => {
    await prisma.restaurant.deleteMany();
});

afterEach(async () => {
    await prisma.restaurant.deleteMany();
});

// para cerrar despues de cada text sea obliogado
afterAll(async () => {
    await prisma.$disconnect();
});


// Crear un restaurante y probar la validación
describe("POST /api/restaurants", () => {

    it("debe crear un restaurante y retornar 201", async () => {
        const response = await request(app)
            .post("/api/restaurants")
            .send({
                name: "Tacos El Patrón",
                address: "Av. Chapultepec 123",
                city: "Guadalajara",
                cuisineType: "Mexicana",
                rating: 4.5,
                isActive: true
            });

        expect(response.status).toBe(201);
        expect(response.body.results).toMatchObject({
            name: "Tacos El Patrón",
            city: "Guadalajara",
            rating: 4.5
        });
        expect(response.body.results.id).toBeDefined();
        expect(response.body.results.createdAt).toBeDefined();
    });

     it("debe retornar 400 si name está vacío", async () => {
        const response = await request(app)
            .post("/api/restaurants")
            .send({
                name: "   ",
                address: "Av. Chapultepec 123",
                city: "Guadalajara",
                cuisineType: "Mexicana",
                rating: 4.5,
                isActive: true
            });

        expect(response.status).toBe(400);
    });

    it("debe retornar 400 si rating es mayor a 5", async () => {
        const response = await request(app)
            .post("/api/restaurants")
            .send({
                name: "Tacos El Patrón",
                address: "Av. Chapultepec 123",
                city: "Guadalajara",
                cuisineType: "Mexicana",
                rating: 6,
                isActive: true
            });

        expect(response.status).toBe(400);
    });

    it("debe retornar 400 si rating es menor a 0", async () => {
        const response = await request(app)
            .post("/api/restaurants")
            .send({
                name: "Tacos El Patrón",
                address: "Av. Chapultepec 123",
                city: "Guadalajara",
                cuisineType: "Mexicana",
                rating: -1,
                isActive: true
            });

        expect(response.status).toBe(400);
    });
    
});


// filtar por city y isActive
describe("GET /api/restaurants", () => {

    it("debe retornar lista de restaurantes", async () => {
        await prisma.restaurant.create({
            data: {
                name: "Sushi Hana",
                address: "Calle 1",
                city: "CDMX",
                cuisineType: "Japonesa",
                rating: 4.0,
                isActive: true
            }
        });

        const response = await request(app).get("/api/restaurants");

        expect(response.status).toBe(200);
        expect(response.body.restaurants).toHaveLength(1);
        expect(response.body.restaurants[0].name).toBe("Sushi Hana");
    });

    it("debe filtrar por ciudad", async () => {
        await prisma.restaurant.createMany({
            data: [
                { name: "Rest A", address: "Dir A", city: "Guadalajara", cuisineType: "Mexicana", rating: 4.0, isActive: true },
                { name: "Rest B", address: "Dir B", city: "CDMX", cuisineType: "Italiana", rating: 3.5, isActive: true }
            ]
        });

        const response = await request(app).get("/api/restaurants?city=Guadalajara");

        expect(response.status).toBe(200);
        expect(response.body.restaurants).toHaveLength(1);
        expect(response.body.restaurants[0].city).toBe("Guadalajara");
    });

    it("debe filtrar por isActive=false", async () => {
        await prisma.restaurant.createMany({
            data: [
                { name: "Activo", address: "Dir", city: "CDMX", cuisineType: "Mexicana", rating: 4.0, isActive: true },
                { name: "Inactivo", address: "Dir", city: "CDMX", cuisineType: "Mexicana", rating: 3.0, isActive: false }
            ]
        });

        const response = await request(app).get("/api/restaurants?isActive=false");

        expect(response.status).toBe(200);
        expect(response.body.restaurants).toHaveLength(1);
        expect(response.body.restaurants[0].isActive).toBe(false);
    });
});

// optener restaurante por id
describe("GET /api/restaurants/:id", () => {

    it("debe retornar el restaurante si existe", async () => {
        const created = await prisma.restaurant.create({
            data: { name: "Pizza Roma", address: "Dir", city: "Monterrey", cuisineType: "Italiana", rating: 4.2, isActive: true }
        });

        const response = await request(app).get(`/api/restaurants/${created.id}`);

        expect(response.status).toBe(200);
        expect(response.body.restaurant.name).toBe("Pizza Roma");
    });

    it("debe retornar 404 si no existe", async () => {
        const response = await request(app).get("/api/restaurants/99999");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Restaurante no encontrado");
    });
});

// actualizar restaurante
describe("PUT /api/restaurants/:id", () => {

    it("debe actualizar el rating del restaurante", async () => {
        const created = await prisma.restaurant.create({
            data: { name: "Burger Co", address: "Dir", city: "CDMX", cuisineType: "Americana", rating: 3.0, isActive: true }
        });

        const response = await request(app)
            .put(`/api/restaurants/${created.id}`)
            .send({ rating: 4.8 });

        expect(response.status).toBe(200);
        expect(response.body.rating).toBe(4.8);
    });
});

// borrar restaurante
describe("DELETE /api/restaurants/:id", () => {

    it("debe eliminar el restaurante y retornar 204", async () => {
        const created = await prisma.restaurant.create({
            data: { name: "Para Borrar", address: "Dir", city: "CDMX", cuisineType: "Mexicana", rating: 3.0, isActive: true }
        });

        const response = await request(app).delete(`/api/restaurants/${created.id}`);
        expect(response.status).toBe(204);
    });

    it("debe retornar 404 si el restaurante no existe", async () => {
        const response = await request(app).delete("/api/restaurants/99999");
        expect(response.status).toBe(404);
    });
});

// endpoid convinado
describe("GET /api/restaurants/:id/menu-suggestions", () => {

    it("debe obtener sugerencias del menú", async () => {
        // Corregimos la creación agregando los campos obligatorios
        const restaurant = await prisma.restaurant.create({
            data: {
                id: 4, 
                name: "Test Restaurant",
                cuisineType: "Italian",
                address: "Calle Falsa 123", // Campo requerido según el error
                city: "Springfield",        // Campo requerido según el error
                rating: 5                   // Campo requerido según el error
            }
        });

        const response = await request(app)
            .get(`/api/restaurants/${restaurant.id}/menu-suggestions`);
        
        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.menuSuggestions).toBeDefined();
        expect(Array.isArray(response.body.menuSuggestions)).toBe(true);
    });

});