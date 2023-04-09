import productsRouter from '@modules/products/routes/products.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter); //definiu como será as rotas.
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
//routes.get('/', (request, response) => {
//return response.json({ message: 'Hello Dev!' });
//});
export default routes;
