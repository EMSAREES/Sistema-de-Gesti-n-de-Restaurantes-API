import { Request, Response } from "express";
import { createRestaurant } from "../service/restaurant.service";
import { HTTP_STATUS_CODES } from "../constants/stateCodes";

export const createRestaurantController = async (req: Request, res: Response) => {
    try {
        const restaurant = await createRestaurant(req.body); // se debe mandar en formato json

        res.status(HTTP_STATUS_CODES.CREATED).json({code: HTTP_STATUS_CODES.CREATED, results: restaurant});
    }catch (error){
        const message = error instanceof Error ? error.message : "Error inesperado.";
        res.status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).json({ error: message });
    }
}
