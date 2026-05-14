import { Router } from "express";
import { searchMealsController } from "../controller/meal.controller";

import { schemaValidation } from "../middlewares/shemaValidate.middleware";
import { searchMealSchema } from "../schemas/meal.schema"; 

const mealRouter = Router();

// GET /api/meals/search?name={nombre}
mealRouter.get("/search",schemaValidation(searchMealSchema), searchMealsController);

export default mealRouter;