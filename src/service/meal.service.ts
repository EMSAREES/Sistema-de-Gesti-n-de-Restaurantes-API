import axios, { AxiosError } from "axios";
import { Meal, ApiResponse, MealDBRaw } from "../types/meal";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.URL_THEMEALDB;

export const searchMeals  = async (name: string): Promise<Meal[]>  => {
    if (!name || name.trim().length === 0) {
        throw new Error("El nombre es obligatorio.");
    }

    try{

        // consumir la api con axios
        const response = await axios.get<ApiResponse>(
            `${BASE_URL}search.php?s=${name}`
        );
        
        // cuando no encuentre resultado lo mande vecio
        if (!response.data.meals) {
            return [];
        }

        // para simplificar la respuesta y hacer que funcione 
        return response.data.meals.map((meal: MealDBRaw): Meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            category: meal.strCategory,
            cuisine: meal.strArea
        }));

    }catch (error){
        if (error instanceof AxiosError) {
            throw new Error("Error al conectar con la api TheMealDB.");
        }
        throw error;

    }
}