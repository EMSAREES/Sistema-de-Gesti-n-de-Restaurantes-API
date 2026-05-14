import { Router } from "express";
import { searchMealsController } from "../controller/meal.controller";

import { schemaValidation } from "../middlewares/shemaValidate.middleware";
import { searchMealSchema } from "../schemas/meal.schema"; 

const mealRouter = Router();

/**
 * @swagger
 * /api/meals/search:
 *   get:
 *     summary: Buscar comidas en TheMealDB
 *     tags: [Comidas]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: Arrabiata
 *     responses:
 *       200:
 *         description: Lista de comidas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Meal'
 *       400:
 *         description: El nombre es obligatorio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/meals/search?name={nombre}
mealRouter.get("/search",schemaValidation(searchMealSchema), searchMealsController);

export default mealRouter;