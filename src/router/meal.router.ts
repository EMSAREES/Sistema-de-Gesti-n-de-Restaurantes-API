import { Router } from "express";
import { searchMealsController } from "../controller/meal.controller";

const mealRouter = Router();

// GET /api/meals/search?name={nombre}
mealRouter.get("/search", searchMealsController);

export default mealRouter;