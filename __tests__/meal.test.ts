import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("GET /api/meals/search", () => {

    it("Obtener resultados de platillos de TheMealDB", async () => {

        const response = await request(app)
            .get("/api/meals/search")
            .query({ name: "Mexico" });

        expect(response.status).toBe(201);

        expect(response.body.results).toBeDefined();

        expect(Array.isArray(response.body.results)).toBe(true);

    });

});