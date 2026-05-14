import { Router } from "express";
import { createRestaurantController } from "../controller/restaurant.controller";

import { schemaValidation } from "../middlewares/shemaValidate.middleware";
import { createRestaurantSchema } from "../schemas/restaurant.schema"; 

const restaurantRouter = Router();

// POST /api/restaurants
restaurantRouter.post("/", schemaValidation(createRestaurantSchema), createRestaurantController);

export default restaurantRouter;