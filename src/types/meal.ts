
// para Respuesta mas simplificada:
export interface Meal {
    id: string;
    name: string;
    category: string;
    cuisine: string;
}

// para Respuesta de TheMealDB (original):
export interface ApiResponse {
    results: Meal[];
}
