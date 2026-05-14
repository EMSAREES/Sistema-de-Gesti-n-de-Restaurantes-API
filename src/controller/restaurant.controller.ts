import { Request, Response } from "express";
import { createRestaurant, getRestaurants, getRestaurantsById, updateRestaurant, deleteRestaurant } from "../service/restaurant.service";
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

export const getRestaurantsController = async (req: Request, res: Response) => {
    try {
        const { city, isActive } = req.query;

        // convertir isActive a booleano esta fue la solucion que encontre
        const parsedIsActive =
            isActive === "true"
                ? true
                : isActive === "false"
                ? false
                : undefined;
        
        const restaurants = await getRestaurants(
            city as string ,
            parsedIsActive
        );

        res.status(HTTP_STATUS_CODES.OK).json({ restaurants });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error inesperado.";
        res
        .status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE)
        .json({ error: message });
    }
};


export const getRestaurantsByIdController = async (req: Request, res: Response) => {
    try {
        const  id  = Number(req.params.id);
        const restaurant = await getRestaurantsById(id);

        if (!restaurant) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                code: HTTP_STATUS_CODES.NOT_FOUND,
                error: "Restaurante no encontrado"
            });
        }


        res.status(HTTP_STATUS_CODES.OK).json({code: HTTP_STATUS_CODES.OK, restaurant });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error inesperado.";
        res
        .status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE)
        .json({ error: message });
    }
};

export const updateRestaurantController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const restaurant = await updateRestaurant(id, req.body);

        res.status(HTTP_STATUS_CODES.OK).json(restaurant);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error inesperado.";
        res.status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).json({ error: message });
    }
};

export const deleteRestaurantController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await deleteRestaurant(id);

        if (!deleted) {

        return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({
                code: HTTP_STATUS_CODES.NOT_FOUND,
                error: "Restaurante no encontrado"
            });
        }

        res.status(HTTP_STATUS_CODES.NO_CONTENT).json({code: HTTP_STATUS_CODES.NO_CONTENT, deleted });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error inesperado.";
        res.status(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).json({ error: message });
    }
};
