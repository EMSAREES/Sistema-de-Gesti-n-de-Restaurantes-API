import type { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from "../constants/stateCodes";
import { searchMeals } from "../service/meal.service";

export const searchMealsController = async (req: Request, res: Response) => {
    try{
        const { name } = req.query;
        const meals = await searchMeals(name as string);
        
        res.status(HTTP_STATUS_CODES.OK).json({ results: meals });
    }
    catch (error){
        if (error instanceof Error) {
            if (error.message === "El nombre es obligatorio.") {
                return res.status(HTTP_STATUS_CODES.BAD_REQUEST)
                    .json({ error: error.message });
            }
            return res.status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE)
                .json({ error: error.message });
        }

        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ error: "Error inesperado." });
    }
}