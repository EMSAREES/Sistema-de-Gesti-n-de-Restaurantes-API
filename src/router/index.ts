import { Router } from 'express';
import mealRouter from './meal.routes';


const router = Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la API de Restaurantes');
});

router.use("/meals", mealRouter);

export default router;