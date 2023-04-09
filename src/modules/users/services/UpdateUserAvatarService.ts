import AppError from '@shared/http/erros/AppError';
//import { hash } from 'bcryptjs'; não vai ter senha pra fazer o hash,copiei do userservice.
import path from 'path';
import fs from 'fs'; // biblioteca para manipular sistemas de arquivos.
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepositories';
import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      // se o avatar estiver preenchido e não for nulo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); // pegou o caminho completo dos arquivos que estão sendo salvos., pegou o caminho completo do arquivo.
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); // pegar o status do arquivo se ele existe se está no caminho indicado.

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); //unlink é um método que remove arquivos num sistemas de arquivos.
        // isso tudo para não deixar arquivo desnecessário no servidor.
      }
    }
    user.avatar = avatarFilename; //avatar que foi enviado pelo usuário é o 2º parâmetro do construtor.

    await usersRepository.save(user);

    return user;//retornar o usuário já com os dados atualizados.
  }
}

export default UpdateUserAvatarService;
// para o usuário fazer o upload de uma imagem dele, precisa estar com o token válido na aplicação, atráves do id que está no request, e desse id buscar
// o usuário pra fazer a modificação.
// para fazer upload de avatar, tem q verificar se o userid vai ser encontrado pela aplicação.
// se já exister um avatar desse usuário e ele está querendo substituir é bom deletar o avatar atual,
// pra n ficar acumulando arquivos desnecessariamente e aí sim enviar o novo avatar.
