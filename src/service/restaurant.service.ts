import prisma from "../database/prismaClient";
import { RestaurantCreate, RestaurantFilter, RestaurantFilterById, RestaurantUpdate} from "../types/restaurant";
import { searchMeals } from "./meal.service";

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

export const deleteRestaurant = async (id: number): Promise<boolean> => {
    try{
        // busacmos primero para ver si existe 
        const restaurantExists =
            await prisma.restaurant.findUnique({
                where: { id }
            });

        if (!restaurantExists) {
            return false;
        }

        await prisma.restaurant.delete({
            where: { id }
        });

        return true;

    }catch(error){
        if (error instanceof Error) {
            throw new Error("Error al eliminar el restaurante.");
        }
        throw error;
    }
};


// Endpoint Combinado (Bonus) a qui se usan los dos esta va consumir el service de meal tambein
export const getMenuSuggestions = async (id: number) => {
    try {
        // Busca el restaurante por su id primero
        const restaurant = await prisma.restaurant.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                cuisineType: true
            }
        });

        // por si no existe
        if (!restaurant) {
            return null;
        }

        // Buscar sugerencia del menu con la api 
        const menuSuggestions = await searchMeals(restaurant.cuisineType);

        
        return {
            restaurant,
            menuSuggestions
        };

    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error al obtener sugerencias de menú.");
        }
        throw error;
    }
};