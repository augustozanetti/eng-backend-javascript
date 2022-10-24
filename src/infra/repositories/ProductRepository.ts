import { Repository } from "typeorm";

import { Product as Domain } from "@/domain/entities/Product";
import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product } from "@/infra/database/models/Product";

import { AppDataSource } from "@/infra/database/config/index";

export class ProductRepository implements IProductRepository {
  private readonly _repository: Repository<Product>;

  constructor() {
    this._repository = AppDataSource.getRepository(Product);
  }

  async create(input: Domain) {
    const model = Product.fromDomain(input);

    const saved = await this._repository.save(model);

    return saved.toDomain();
  }

  async read() {
    const data = await this._repository.find();

    return data.map((item) => item.toDomain());
  }

  async update(domain: Domain) {
    const { amount, name, id } = domain;

    await this._repository.update(id, {
      name,
      amount,
    });

    return domain;
  }

  async delete(id: string) {
    await this._repository.delete(id);
  }
}
