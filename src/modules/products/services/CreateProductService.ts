import AppError from '@shared/http/erros/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Products';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

// a interface vai tipar as informações, dados da requisição do usuários, a informação tá vendo do request.
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    // execute método que vai executar essa responsabilidade específica do serviço.
    // async pq vai fazer chamadas no repositório, e vai levar um tempo.
    const productsRepository = getCustomRepository(ProductRepository);
    // pegar um repositório getRepository, como é customizado colocou o custom isso vem do typeorm.
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
