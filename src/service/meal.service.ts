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
        const response = await axios.get<ApiResponse>(
            `${BASE_URL}search.php?s=${name}`
        );
        
        if (!response.data.results || response.data.results.length === 0) {
            throw new Error(`No se encontraron comidas con el nombre: ${name}`);
        }

        return response.data.results;

    }catch (error){
        if (error instanceof AxiosError) {
            throw new Error("Error al conectar con TheMealDB.");
        }
        throw error;

    }
}