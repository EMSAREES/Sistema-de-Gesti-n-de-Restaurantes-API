
// para Respuesta mas simplificada
export interface Meal {
    id: string;
    name: string;
    category: string;
    cuisine: string;
}

// para Respuesta completa de TheMealDB (original):
export interface ApiResponse {
    meals: MealDBRaw[] | null;
}

// para Respuesta de TheMealDB (original):
export interface MealDBRaw {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    [key: string]: any; // Para ignorar el resto de ingredientes/instrucciones
}