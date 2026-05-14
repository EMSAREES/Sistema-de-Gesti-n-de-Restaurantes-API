//  Crear restaurante
export interface RestaurantCreate {
    name: string;
    address: string;
    city: string;
    cuisineType: string;
    rating: number;
    isActive: boolean;
}

// Listar restaurantes por ciudad o activo
export interface RestaurantFilter{
    id: number;
    name: string;
    city: string;
    cuisineType: string;
    rating: number;
    isActive: boolean;
}

// Listar restaurante por id
export interface RestaurantFilters {
    city?: string;
    isActive?: boolean;
}

export interface RestaurantResponse  {
    id: number;
    name: string;
    address: string;
    city: string;
    cuisineType: string;
    rating: number;
    isActive: boolean;
    createdAt: Date;
}



// actualizar restaurante
export interface RestaurantUpdate {
    name?: string;
    address?: string;
    city?: string;
    cuisineType?: string;
    rating?: number;
    isActive?: boolean;
}

