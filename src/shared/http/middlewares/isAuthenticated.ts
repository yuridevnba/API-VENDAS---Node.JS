// exigir que só possa acessar os conteúdos usuários com permissão.
// usuário precisa ter um token e o token for válidado pela aplicação, validar se o token é expirado e se foi criado pela aplicação.
//middleware para passar essa configuração para cada rota que vai querer proteger

// isAuthenticated
//middleaware 3 parâmetros request,response,netx que vai levar para outro middleawere = autenticar o usuário e proteger as rotas da aplicação.
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/http/erros/AppError';

interface ITokenPayload {
  //interface com todas as informações que retornar no decodedToken
  iat: number;
  exp: number;
  sub: string;
}
//método vai verificar se nas requisições que chegar vai ter um token
export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction, // método que leva a gt para o próximo middleware ou para próxima requisição.
): void {
  const authHeader = request.headers.authorization; // o token vai estar aí dentro, no cabeçalho do request.

  if (!authHeader) {
    // se o cabeçalho n ter nada
    throw new AppError('JWT Token is missing.');
  }
  // Bearer sdlkfjsldkfjsjfffdklfjdflksjflkjfdlk3405905,  o padrão do token jwt.
  const [, token] = authHeader.split(' '); // dividir o token, entre duas posições, visto que é um array.
  //desestruturar entre posição e só pega a posição1.
  try {
    // a verificação pode gerar uma exceção
    const decodedToken = verify(token, authConfig.jwt.secret); //informar o token e a secret que vai verificar se o token foi criado pelo sistema

    // eslint-disable-next-line no-console
    console.log(decodedToken);

    const { sub } = decodedToken as ITokenPayload; //desestruturar, tokenPayload aula de typescript.
    //decodedToken é do tipo object, mas não sabemos qual é o tipo desse object.
    // sub vai tá o id do usuário
    request.user = {
      // toda request que passar pelo midleawe a rota vai ter o id do usuário, se colocar em todas as rotas, todas vão ter o id do usuário.
      // isso vai chegar a aplicação front end, facilitand fazer buscas por recursos do usuário logado, para permitir ele alterar dados de perfil de avatar etc, vai ser feito com essa informação do id do usuário no objeto da request vai facilitar bastante.
      id: sub,
    };

    return next(); // se o token for da aplicação, pode seguir em frente com o next.
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}

//sobescrita para atribuir ao request, visto que nã existe no request,uma forma é sobescrever os tipos no typescript,criar uma pasta @types dentro do src e aí definir outros tipos para outras bibliotecas
//internamente separar os tipos por bibliotecas, esses novos tipo não vai eliminar os tipos antigos só vai agregar não substituir.
