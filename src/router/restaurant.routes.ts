import { Router } from "express";
import { createRestaurantController, getRestaurantsController } from "../controller/restaurant.controller";

import { schemaValidation } from "../middlewares/shemaValidate.middleware";
import { createRestaurantSchema } from "../schemas/restaurant.schema"; 

const restaurantRouter = Router();

// POST /api/restaurants
restaurantRouter.post("/", schemaValidation(createRestaurantSchema), createRestaurantController);

// GET /api/restaurants?city={ciudad}&isActive={true|false}
restaurantRouter.get("/", getRestaurantsController);

export default restaurantRouter;