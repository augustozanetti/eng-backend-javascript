import { Repository } from "typeorm";

import { ICurrencyCodeRepository } from "@/domain/repositories/ICurrencyCodeReposity";
import { Currency } from "@/infra/database/models/Currency";
import { Currency as Domain } from "@/domain/entities/Currency";
import { AppDataSource } from "@/infra/database/config";

export class CurrencyCodeRepository implements ICurrencyCodeRepository {
  private readonly _repository: Repository<Currency>;

  constructor() {
    this._repository = AppDataSource.getRepository(Currency);
  }

  async create(input: Domain) {
    const currency = Currency.fromDomain(input);

    const saved = await this._repository.save(currency);

    return saved.toDomain();
  }

  async read() {
    const data = await this._repository.find();
    return data.map((item) => item.toDomain());
  }

  async delete(code: string) {
    const deleted = await this._repository.delete({
      code,
    });

    return deleted.affected && deleted.affected > 0;
  }
}
