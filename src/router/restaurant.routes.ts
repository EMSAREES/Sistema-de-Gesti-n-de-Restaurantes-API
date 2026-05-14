import { Router } from "express";
import { createRestaurantController, getRestaurantsController, getRestaurantsByIdController, updateRestaurantController, deleteRestaurantController, getMenuSuggestionsController } from "../controller/restaurant.controller";

import { schemaValidation } from "../middlewares/shemaValidate.middleware";
import { createRestaurantSchema, getRestaurantsSchema, getRestaurantByIdSchema, DeleteRestaurant} from "../schemas/restaurant.schema"; 

const restaurantRouter = Router();

// GET /api/restaurants/{id}/menu-suggestions
restaurantRouter.get("/:id/menu-suggestions", schemaValidation(getRestaurantByIdSchema), getMenuSuggestionsController);

// POST /api/restaurants
restaurantRouter.post("/", schemaValidation(createRestaurantSchema), createRestaurantController);

// GET /api/restaurants?city={ciudad}&isActive={true|false}
restaurantRouter.get("/",schemaValidation(getRestaurantsSchema), getRestaurantsController);

// GET /api/restaurants/{id}
restaurantRouter.get("/:id",schemaValidation(getRestaurantByIdSchema), getRestaurantsByIdController);

// PUT /api/restaurants/{id}
restaurantRouter.put("/:id",  updateRestaurantController);

// DELETE /api/restaurants/{id}
restaurantRouter.delete("/:id" ,schemaValidation(DeleteRestaurant), deleteRestaurantController);

export default restaurantRouter;