import prisma from "../database/prismaClient";
import { RestaurantCreate } from "../types/restaurant";

export const createRestaurant = async (data: RestaurantCreate) => {
    try{
        // usando orm para crear un restaurante
        return await prisma.restaurant.create({
            data
        });

    }catch(error){
        if (error instanceof Error) {
            throw new Error("Error al crear el restaurante.");
        }
        throw error;
    }
};