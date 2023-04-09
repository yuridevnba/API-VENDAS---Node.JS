import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig); // upload tem uma instância do multer já com as configurações definidas.

usersRouter.get('/', isAuthenticated, usersController.index); //exigir que somente usuários autenticados listem .

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);
usersRouter.patch(
  '/avatar',
  isAuthenticated, // chamando o middleware pois o usuário precisa estar autenticado.
  upload.single('avatar'),
  usersAvatarController.update,
); //método para fazer atualização em um único dado do recurso.
//single faz o upload de um arquivo e o array faz de vários

export default usersRouter;
