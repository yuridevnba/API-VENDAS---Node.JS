import { EntityRepository, Repository } from 'typeorm';
import Product from '../../../../../moduless/Products';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    //todo método assíncrono retorna uma promisse
    const product = this.findOne({
      where: {
        name,
      },
    });
    //vai retonar em products o primeiro registro que ele encontrar do parâmetro que está sendo passado.
    return product;
  }
}
