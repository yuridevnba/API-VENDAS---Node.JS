import { getCustomRepository } from 'typeorm';
import Product from '../../../../../moduless/Products';
import { ProductRepository } from '../repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
