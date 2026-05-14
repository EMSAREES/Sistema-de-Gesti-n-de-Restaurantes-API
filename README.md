# Sistema-de-Gesti-n-de-Restaurantes-API

API REST construida con Node.js, Express, TypeScript y Prisma ORM  que gestiona un catálogo de restaurantes e integra datos de la API externa de TheMealDB 

-------------------------------------------------------
## Tecnologías utilizadas

- Node.js 18+
- TypeScript
- Express 5
- Prisma ORM 
- Axios — consumo de API externa
- Zod 4 — validación de datos
- dotenv — variables de entorno
- ts-node-dev — desarrollo con hot-reload
- Vitest - para los test
- Swagger - para documentar las rutas

-------------------------------------------------------
## Instalación
 
```bash
# 1. Clonar el repositorio
git clone https://github.com/EMSAREES/Sistema-de-Gesti-n-de-Restaurantes-API.git
cd sistema-de-gestion-de-restaurantes-api
 
# 2. Instalar dependencias
npm install
 
# 3. Usa como ejemplo .env.example para tu .env
cp .env.example .env
```
 
Edita el archivo `.env` con tus valores:
 
```env
DATABASE_URL="file:./dev.db"
PORT=3000
URL_THEMEALDB="https://www.themealdb.com/api/json/v1/1/"
```
 
```bash
# 4. Generar el cliente de Prisma y aplicar migraciones
npm run prisma:generate
npm run prisma:migrate
```

 
## Ejecución
 
```bash
# Modo desarrollo 
npm run dev
 
# Compilar a JavaScript
npm run build
 
# Modo producción
npm run start
```
*** debera imprimir: ***
http://localhost:3000/api
http://localhost:3000/api-docs

## Ejecución
 
```bash
# Correr una vez
npm test

# Modo watch (se re-ejecuta al guardar)
npm run test:watch

# Con cobertura de código
npm run test:coverage
```
-------------------------------------------------------
## Endpoints
 
### Base
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Bienvenida |
 
### Comidas — TheMealDB
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/meals/search?name={nombre}` | Buscar comidas por nombre |
 
### Restaurantes
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/restaurants` | Crear restaurante |
| GET | `/api/restaurants` | Listar restaurantes (filtros opcionales) |
| GET | `/api/restaurants/:id` | Obtener restaurante por ID |
| PUT | `/api/restaurants/:id` | Actualizar restaurante (parcial) |
| DELETE | `/api/restaurants/:id` | Eliminar restaurante |
| GET | `/api/restaurants/:id/menu-suggestions` | Sugerencias de menú (bonus) |
 
---
 
## Ejemplos de uso
 
### Buscar comidas
 
```bash
curl http://localhost:3000/api/meals/search?name=chicken
```
 
```json
{
  "results": [
    {
      "id": "52772",
      "name": "Teriyaki Chicken Casserole",
      "category": "Chicken",
      "cuisine": "Japanese"
    }
  ]
}
```
 
---
 
### Crear restaurante
 
```bash
curl -X POST http://localhost:3000/api/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tacos El Patrón",
    "address": "Av. Chapultepec 123",
    "city": "Guadalajara",
    "cuisineType": "Mexicana",
    "rating": 4.5,
    "isActive": true
  }'
```
 
```json
{
  "id": 1,
  "name": "Tacos El Patrón",
  "address": "Av. Chapultepec 123",
  "city": "Guadalajara",
  "cuisineType": "Mexicana",
  "rating": 4.5,
  "isActive": true,
  "createdAt": "2026-05-12T12:00:00.000Z"
}
```
 
---
 
### Listar restaurantes
 
```bash
# Todos
curl http://localhost:3000/api/restaurants
 
# Filtrar por ciudad
curl http://localhost:3000/api/restaurants?city=Guadalajara
 
# Filtrar por estado activo
curl http://localhost:3000/api/restaurants?isActive=true
 
# Combinar filtros
curl "http://localhost:3000/api/restaurants?city=CDMX&isActive=false"
```
 
```json
{
  "restaurants": [
    {
      "id": 1,
      "name": "Tacos El Patrón",
      "city": "Guadalajara",
      "cuisineType": "Mexicana",
      "rating": 4.5,
      "isActive": true
    }
  ]
}
```
 
---
 
### Obtener restaurante por ID
 
```bash
curl http://localhost:3000/api/restaurants/1
```
 
```json
{
  "id": 1,
  "name": "Tacos El Patrón",
  "address": "Av. Chapultepec 123",
  "city": "Guadalajara",
  "cuisineType": "Mexicana",
  "rating": 4.5,
  "isActive": true,
  "createdAt": "2026-05-12T12:00:00.000Z"
}
```
 
---
 
### Actualizar restaurante (parcial)
 
```bash
curl -X PUT http://localhost:3000/api/restaurants/1 \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4.8,
    "isActive": false
  }'
```
 
```json
{
  "id": 1,
  "name": "Tacos El Patrón",
  "rating": 4.8,
  "isActive": false
}
```
 
---
 
### Eliminar restaurante
 
```bash
curl -X DELETE http://localhost:3000/api/restaurants/1
```
 
Respuesta: `204 No Content`
 
---
 
### Sugerencias de menú (Bonus)
 
```bash
curl http://localhost:3000/api/restaurants/1/menu-suggestions
```
 
```json
{
  "restaurant": {
    "id": 1,
    "name": "Tacos El Patrón",
    "cuisineType": "Mexicana"
  },
  "menuSuggestions": [
    {
      "id": "52772",
      "name": "Tacos de Birria",
      "category": "Beef",
      "cuisine": "Mexican"
    }
  ]
}
```
 
-------------------------------------------------------
## Estructura del proyecto
 
```
src/
├── index.ts
├── app.ts
├── constants/
│   └── stateCodes.ts
├── controller/
│   ├── meal.controller.ts
│   └── restaurant.controller.ts
├── database/
│   └── prismaClient.ts
├── middlewares/
│   └── shemaValidate.middleware.ts
├── router/
│   ├── index.routes.ts
│   ├── meal.routes.ts
│   └── restaurant.routes.ts
├── schemas/
│   ├── meal.schema.ts
│   └── restaurant.schema.ts
├── service/
│   ├── meal.service.ts
│   └── restaurant.service.ts
└── types/
    ├── meal.ts
    └── restaurant.ts
```
 "*** NOTA ***  El archivo db.ts no se utiliza puedes borrarla si quieres" 
 
