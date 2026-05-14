import { Router } from "express";
import { createRestaurantController, getRestaurantsController, getRestaurantsByIdController, updateRestaurantController, deleteRestaurantController, getMenuSuggestionsController } from "../controller/restaurant.controller";

import { schemaValidation } from "../middlewares/shemaValidate.middleware";
import { createRestaurantSchema, getRestaurantsSchema, getRestaurantByIdSchema, DeleteRestaurant} from "../schemas/restaurant.schema"; 

const restaurantRouter = Router();

/**
 * @swagger
 * /api/restaurants/{id}/menu-suggestions:
 *   get:
 *     summary: Sugerencias de menú según el tipo de cocina del restaurante
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Restaurante con sugerencias de platillos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   $ref: '#/components/schemas/Restaurant'
 *                 menuSuggestions:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Meal'
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
restaurantRouter.get("/:id/menu-suggestions", schemaValidation(getRestaurantByIdSchema), getMenuSuggestionsController);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Crear restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantCreate'
 *     responses:
 *       201:
 *         description: Restaurante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
restaurantRouter.post("/", schemaValidation(createRestaurantSchema), createRestaurantController);

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Listar restaurantes
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filtrar por ciudad
 *         example: Guadalajara
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado activo
 *         example: true
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 */
restaurantRouter.get("/",schemaValidation(getRestaurantsSchema), getRestaurantsController);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Obtener restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Restaurante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
restaurantRouter.get("/:id",schemaValidation(getRestaurantByIdSchema), getRestaurantsByIdController);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Actualizar restaurante (parcial)
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantCreate'
 *     responses:
 *       200:
 *         description: Restaurante actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
restaurantRouter.put("/:id",  updateRestaurantController);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Eliminar restaurante
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       204:
 *         description: Eliminado exitosamente
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
restaurantRouter.delete("/:id" ,schemaValidation(DeleteRestaurant), deleteRestaurantController);

export default restaurantRouter;