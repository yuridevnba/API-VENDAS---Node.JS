import AppError from '@shared/http/erros/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../../../../../moduless/Products';
import { ProductRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    // toda chamada de um processo que vai entrar no bd preciso do await.

    if (!product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
