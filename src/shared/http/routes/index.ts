import productsRouter from '@modules/products/typeorm/entities/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter); //definiu como será as rotas.

//routes.get('/', (request, response) => {
//return response.json({ message: 'Hello Dev!' });
//});
export default routes;
