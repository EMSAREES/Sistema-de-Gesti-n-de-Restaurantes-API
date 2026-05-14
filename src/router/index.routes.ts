import { Router } from 'express';

import mealRouter from './meal.routes';
import restaurantRouter from './restaurant.routes';


const router = Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la API de Restaurantes');
});

router.use("/meals", mealRouter);

router.use("/restaurants", restaurantRouter);

export default router;