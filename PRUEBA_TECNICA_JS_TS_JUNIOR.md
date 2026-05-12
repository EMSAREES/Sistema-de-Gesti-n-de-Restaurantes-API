# Prueba Técnica - Desarrollador JavaScript/TypeScript Junior
## Sistema de Gestión de Restaurantes API

---

## Información General

**Objetivo:** Evaluar tus habilidades en desarrollo de APIs REST con Node.js y TypeScript, consumo de APIs externas y manejo de bases de datos.

**Tiempo estimado:** 2-3 días  
**Entrega:** Repositorio en GitHub con README completo

---

## Descripción del Proyecto

Deberás crear una **API REST con Express y TypeScript** que gestione un catálogo de restaurantes. La API debe:

1. Consumir datos de una API externa pública (TheMealDB)
2. Implementar un CRUD completo para restaurantes
3. Combinar ambas funcionalidades en un endpoint especial

---

## Parte 1: Consumir API Externa

### API a Consumir: TheMealDB

- **Base URL:** `https://www.themealdb.com/api/json/v1/1/`
- **Documentación:** https://www.themealdb.com/api.php
- **Endpoint de búsqueda:** `search.php?s={nombre}`

### Tarea

Crear un endpoint: **`GET /api/meals/search?name={nombre}`**

Este endpoint debe:
- Buscar comidas en TheMealDB usando el parámetro `name`
- Transformar la respuesta a un formato simplificado
- Manejar errores si la API externa no responde

### Ejemplo de Transformación

**Respuesta de TheMealDB (original):**
```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Teriyaki Chicken Casserole",
      "strCategory": "Chicken",
      "strArea": "Japanese",
      "strInstructions": "Preheat oven to 350°...",
      "strMealThumb": "https://...",
      "...": "muchos campos más"
    }
  ]
}
```

**Tu respuesta (simplificada):**
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

## Parte 2: CRUD de Restaurantes

### Modelo de Datos

Cada restaurante debe tener los siguientes campos:

```typescript
interface Restaurant {
  id: number;           // Auto-generado
  name: string;         // Requerido, no vacío
  address: string;      // Requerido
  city: string;         // Requerido
  cuisineType: string;  // Ej: "Mexicana", "Italiana", "Japonesa"
  rating: number;       // Entre 0.0 y 5.0
  isActive: boolean;    // Default: true
  createdAt: Date;      // Auto-generado
}
```

### Endpoints Requeridos

#### 1. **POST /api/restaurants** — Crear restaurante

**Request body:**
```json
{
  "name": "Tacos El Patrón",
  "address": "Av. Chapultepec 123",
  "city": "Guadalajara",
  "cuisineType": "Mexicana",
  "rating": 4.5,
  "isActive": true
}
```

**Validaciones:**
- `name` no puede estar vacío ni ser solo espacios
- `rating` debe estar entre 0.0 y 5.0
- Retornar el restaurante creado con su `id` y `createdAt`

**Response exitoso (201):**
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

#### 2. **GET /api/restaurants** — Listar restaurantes

**Query parameters opcionales:**
- `?city={ciudad}` — Filtrar por ciudad
- `?isActive={true/false}` — Filtrar por estado activo

**Response:**
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

#### 3. **GET /api/restaurants/:id** — Obtener un restaurante

**Response exitoso (200):**
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

**Si no existe (404):**
```json
{
  "error": "Restaurante no encontrado"
}
```

---

#### 4. **PUT /api/restaurants/:id** — Actualizar restaurante

Debe permitir actualización parcial (no es necesario enviar todos los campos).

**Request body (ejemplo):**
```json
{
  "rating": 4.8,
  "isActive": false
}
```

**Response exitoso (200):**
```json
{
  "id": 1,
  "name": "Tacos El Patrón",
  "rating": 4.8,
  "isActive": false,
  "...": "resto de campos"
}
```

---

#### 5. **DELETE /api/restaurants/:id** — Eliminar restaurante

- Retornar **204 No Content** si se eliminó exitosamente
- Retornar **404** si el restaurante no existe

---

## Parte 3: Endpoint Combinado (Bonus)

Crear un endpoint que combine ambas partes:

**`GET /api/restaurants/:id/menu-suggestions`**

Este endpoint debe:
1. Obtener el restaurante por su `id`
2. Usar el `cuisineType` del restaurante para buscar platillos relacionados en TheMealDB
3. Retornar el restaurante junto con las sugerencias de platillos

**Response esperado:**
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

---

## Requisitos Técnicos

### Obligatorio

- ✅ **Node.js 18+**
- ✅ **TypeScript** — Todo el código debe estar tipado
- ✅ **Express** — Framework web
- ✅ **SQLite o PostgreSQL** — Base de datos (SQLite es más simple para empezar)
- ✅ **axios o node-fetch** — Para consumir TheMealDB
- ✅ **Manejo de errores HTTP apropiado** (404, 400, 500, etc.)
- ✅ **README.md** con instrucciones claras para correr el proyecto

### Opcional (Puntos Extra)

- ⭐ **Zod o class-validator** para validación de datos (+10 puntos)
- ⭐ **Docker / docker-compose** (+5 puntos)
- ⭐ **Tests con Jest o Vitest** (+10 puntos)
- ⭐ **Swagger / OpenAPI docs** con `swagger-ui-express` (+5 puntos)
- ⭐ **Logging estructurado** con `winston` o `pino` (+5 puntos)

---

## Entregables

Debes entregar:

1. **Repositorio Git** (GitHub, GitLab o similar)
   - Código fuente completo en TypeScript
   - Commits descriptivos 

2. **README.md** que incluya:
   - Descripción del proyecto
   - Instrucciones de instalación paso a paso
   - Cómo ejecutar el proyecto
   - Ejemplos de uso de cada endpoint (curl o Postman)

3. **Archivo de dependencias:**
   - `package.json` con todas las dependencias listadas
   - `tsconfig.json` configurado correctamente

4. **(Opcional)** `.env.example` si usas variables de entorno

---

## Estructura Sugerida del Proyecto

```
restaurant-api/
├── src/
│   ├── index.ts                # Punto de entrada
│   ├── app.ts                  # Configuración de Express
│   ├── types/
│   │   └── restaurant.ts       # Interfaces y tipos TypeScript
│   ├── routes/
│   │   ├── restaurants.ts      # Rutas de restaurantes
│   │   └── meals.ts            # Rutas de comidas
│   ├── controllers/
│   │   ├── restaurantController.ts
│   │   └── mealController.ts
│   ├── services/
│   │   ├── restaurantService.ts
│   │   └── mealdbService.ts    # Cliente para TheMealDB
│   └── database/
│       └── db.ts               # Configuración de base de datos
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

**Nota:** Esta estructura es solo una sugerencia. Puedes organizarlo como prefieras.

---

## Instrucciones de Ejecución

Tu README debe incluir algo similar a:

```bash
# Clonar el repositorio
git clone <tu-repo>
cd restaurant-api

# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Ejecutar en modo desarrollo (con hot-reload)
npm run dev

# La API estará disponible en:
# http://localhost:3000
```

**Scripts recomendados en `package.json`:**
```json
{
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## Criterios de Evaluación

| Criterio | Puntos | Qué evaluamos |
|----------|--------|---------------|
| **Funcionalidad** | 40 | Todos los endpoints funcionan correctamente |
| **Tipado TypeScript** | 15 | Uso correcto de tipos, interfaces y evitar `any` |
| **Código limpio** | 15 | Código legible, organizado, nombres descriptivos |
| **Validaciones y errores** | 10 | Manejo apropiado de errores HTTP y validaciones |
| **Documentación** | 10 | README claro, instrucciones que funcionen |
| **API externa** | 10 | Integración correcta con TheMealDB |
| **Bonus** | +35 | Zod, Docker, tests, Swagger, logging |
| **TOTAL BASE** | **100** | |

### Niveles de Aprobación

- **70-79 puntos:** Aprobado — nivel básico aceptable
- **80-89 puntos:** Bueno — nivel esperado para el puesto
- **90-100 puntos:** Excelente — supera expectativas

---

## Consejos

1. **Empieza simple:** Primero haz que funcione sin TypeScript estricto, luego agrega los tipos
2. **No uses `any`:** Si no sabes el tipo, usa `unknown` y manéjalo correctamente
3. **Prueba cada endpoint:** Usa Postman, Thunder Client o `curl` mientras desarrollas
4. **Maneja errores:** Usa `try/catch` y retorna respuestas HTTP con el código correcto
5. **Commits frecuentes:** Haz commits pequeños y descriptivos, uno por feature
6. **README claro:** Imagina que alguien más debe correr tu proyecto sin tu ayuda

---

## Recursos Útiles

- **Express con TypeScript:** https://expressjs.com/
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **TheMealDB API:** https://www.themealdb.com/api.php
- **Zod (validación):** https://zod.dev/
- **better-sqlite3:** https://github.com/WiseLibs/better-sqlite3
- **axios:** https://axios-http.com/

---

## Preguntas Frecuentes

**¿Puedo usar un ORM como Prisma o TypeORM?**  
Sí, puedes usar cualquier ORM o trabajar directamente con SQL. SQLite con `better-sqlite3` es la opción más simple para empezar.

**¿Debo implementar autenticación?**  
No es necesario para esta prueba.

**¿Qué hago si TheMealDB no responde?**  
Maneja el error con `try/catch` y retorna un mensaje claro al usuario con el código HTTP apropiado (503 o 502).

**¿Puedo usar librerías adicionales?**  
Sí, siempre que estén en tu `package.json`.

**¿Puedo usar JavaScript en lugar de TypeScript?**  
Preferimos TypeScript, pero si no estás familiarizado, puedes empezar en JavaScript y agregar tipos después. Sin embargo, el uso de TypeScript sí se evalúa.

**¿Debo hacer tests?**  
No es obligatorio, pero suma puntos extra significativos.

**¿Qué framework puedo usar en lugar de Express?**  
Puedes usar Fastify o Hono si los conoces mejor. Lo importante es que la API funcione correctamente.

---

## ¡Buena Suerte!

Recuerda: valoramos más un código limpio y funcional que una solución perfecta pero complicada. Si no terminas todo, entrega lo que tengas con una nota en el README explicando qué te faltó y cómo lo hubieras resuelto.
