import type { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from "../constants/stateCodes";
import { searchMeals } from "../service/meal.service";

export const searchMealsController = async (req: Request, res: Response) => {
    try{
        const name  = req.query.name as string;
        const meals = await searchMeals(name);
        
        res.status(HTTP_STATUS_CODES.OK).json({ results: meals });
    }
    catch (error){
        const message = error instanceof Error ? error.message : "Error inesperado.";
        res.status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).json({ error: message });
    }
}