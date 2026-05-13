//  Crear restaurante
export interface RestaurantCreate {
    id: number;
    name: string;
    address: string;
    city: string;
    cuisineType: string;
    rating: number;
    isActive: boolean;
    createdAt?: Date;
}

// Listar restaurantes por ciudad o activo
export interface RestaurantList {
    id: number;
    name: string;
    city: string;
    cuisineType: string;
    rating: number;
    isActive: boolean;
}

// Listar restaurante por id
export interface RestaurantDetail {
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

