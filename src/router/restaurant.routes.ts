import { Router } from "express";
import { createRestaurantController, getRestaurantsController, getRestaurantsByIdController, updateRestaurantController, deleteRestaurantController } from "../controller/restaurant.controller";

import { schemaValidation } from "../middlewares/shemaValidate.middleware";
import { createRestaurantSchema } from "../schemas/restaurant.schema"; 

const restaurantRouter = Router();

// POST /api/restaurants
restaurantRouter.post("/", schemaValidation(createRestaurantSchema), createRestaurantController);

// GET /api/restaurants?city={ciudad}&isActive={true|false}
restaurantRouter.get("/", getRestaurantsController);

// GET /api/restaurants/{id}
restaurantRouter.get("/:id", getRestaurantsByIdController);

// PUT /api/restaurants/{id}
restaurantRouter.put("/:id",schemaValidation(createRestaurantSchema),  updateRestaurantController);

// DELETE /api/restaurants/{id}
restaurantRouter.delete("/:id", deleteRestaurantController);

export default restaurantRouter;