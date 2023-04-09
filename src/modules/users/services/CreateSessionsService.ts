import AppError from '@shared/http/erros/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepositories';

interface IRequest {
  // quando o usuário se autenticar ele vai ganhar um token(necessário para ele conseguir entrar nas demais rotas da aplicação),
  // retorna usuário e o token, retorno composto cria uma interface.
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
      //401 status code de autorização
      //senha sem critografia, e user que é o objeto que trouxe do bd e lá a senha está criptografada.
    }

    const passwordConfirmed = await compare(password, user.password); // comparar uma senha sem criptografia com uma senha com criptografia, user é um objeto
    // que foi pego no banco de dados, ele tem a senha criptografada.

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign(
      {},
      /*'f20eef30d5dbbfa279208c6789c156be',*/ authConfig.jwt.secret,
      {
        // subject: user.id,
        /// expiresIn: '1d',
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
        //fica algo de uso mais global
        // eslint-disable-next-line prettier/prettier

       }); // payload, informações que deseja devolver para o usuário,para facilitar o uso pelo front end, é importante não colocar informações sensíveis.

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
