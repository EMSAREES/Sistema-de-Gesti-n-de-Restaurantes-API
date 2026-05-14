//  Crear restaurante
export interface RestaurantCreate {
    name: string;
    address: string;
    city: string;
    cuisineType: string;
    rating: number;
    isActive: boolean;
}

// Listar restaurante por ciudad o activo
export interface RestaurantFilter{
    id: number;
    name: string;
    city: string;
    cuisineType: string;
    rating: number;
    isActive: boolean;
}






// Listar restaurantes por id

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

