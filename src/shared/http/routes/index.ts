import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter); //definiu como será as rotas.
routes.use('/users', usersRouter);
//routes.get('/', (request, response) => {
//return response.json({ message: 'Hello Dev!' });
//});
export default routes;
