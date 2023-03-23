//console.log('Hello Dev!');// para rodar precisa fazer o buil compilar o arquivo para js.
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from './erros/AppError';
import '@shared/http/typeorm';

const app = express();

app.use(cors()); // sem parâmetro aceitando qualquer origem.

app.use(express.json()); // a api vai trabalhar com o padrão json.

app.use(routes);
// eslint-disable-next-line @typescript-eslint/no-empty-function

app.use(errors()); // se for gerado o erro na rotas, o erro vai ser enviado para aplicação, por aqui, pega o erro e trata logo em baixo.

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      // erro gerado pela nossa aplicação sempre vai cair aqui.
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      // quando for erro gerado pelo servidor
      status: 'error',
      message: 'Internal server error',
    });
  },
); //requisição tem um response um request e no caso do middle tem o next, errrro.
app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
//app..listen é o método que vai chamar o servidor.
