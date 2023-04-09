declare namespace Express {
  export interface Request {
    // exportar uma interface que a gt quer acrescentar o tipo.
    // request é um objeto do express
    user: {
      // acrescentar o objeto user.
      id: string;
    };
  }
}
