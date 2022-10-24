import { Product } from "@/domain/entities/Product";
import { IProductRepository } from "@/domain/repositories/IProductRepository";

export class ProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  create(name: string, value: number) {
    const currency = new Product(name, value);

    return this.productRepository.create(currency);
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }

  read() {
    return this.productRepository.read();
  }

  update(id: string, name: string, value: number) {
    const product = new Product(name, value, id);
    return this.productRepository.update(product);
  }
}
