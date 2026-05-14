import prisma from "../database/prismaClient";
import { RestaurantCreate, RestaurantFilter, RestaurantFilterById, RestaurantUpdate} from "../types/restaurant";

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

export const getRestaurants = async (city?: string, isActive?: boolean): Promise<RestaurantFilter[]> => {
    try{
        return await prisma.restaurant.findMany({
            where: {
                ...(city ? { city } : {}),
                ...(typeof isActive === "boolean" ? { isActive } : {}), 
            },
            select: {
                id: true,
                name: true,
                city: true,
                cuisineType: true,
                rating: true,
                isActive: true
            }
        });
    }catch(error){
        if (error instanceof Error) {
            throw new Error("Error al obtener los restaurantes.");
        }
        throw error;
    }
};

export const getRestaurantsById = async (id: number): Promise<RestaurantFilterById | null> => {
    try{
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                address: true,
                city: true,
                cuisineType: true,
                rating: true,
                isActive: true,
                createdAt: true
            }
        });

        if (!restaurant) {
            return null;
        }   

        return restaurant;
    }catch(error){
        if (error instanceof Error) {
            throw new Error("Error al obtener el restaurante.");
        }
        throw error;
    }
};

export const updateRestaurant = async (id: number, data: RestaurantUpdate): Promise<RestaurantFilterById | null>  => {
    try{
        return await prisma.restaurant.update({
            where: { id },
            data
        });
    }catch(error){
        if (error instanceof Error) {
            throw new Error("Error al actualizar el restaurante.");
        }
        throw error;
    }
};



