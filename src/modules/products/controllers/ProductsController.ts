import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

// a classe não tem nhm vínculo com o express, por isso tem a dificuldade de ter o request,response, e a rota, que está no arquivo server.ts.

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService(); // listar os produtos.

    const products = await listProducts.execute();

    return response.json(products); // retornar para o usuário. ele fez uma divisão dividindo aplicação para cada responsável,como o controller tem o método listar produtos, mas n é ele que é responsável por listar os produtos.
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params; // a rota recebe o id.

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body; //recebe esses campos no request.body, no corpo da requisição.

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      //recebeu do serviço o produto que foi criado, agora vai executar
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
