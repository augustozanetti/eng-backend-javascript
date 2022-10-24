import { FindManyOptions, In, Repository } from "typeorm";

import { Quote as Domain } from "@/domain/entities/Quote";
import { IQuoteRepository } from "@/domain/repositories/IQuoteReposity";
import { Quote } from "@/infra/database/models/Quote";
import { AppDataSource } from "@/infra/database/config";

export class QuoteRepository implements IQuoteRepository {
  private readonly _repository: Repository<Quote>;

  constructor() {
    this._repository = AppDataSource.getRepository(Quote);
  }

  async create(domain: Domain) {
    const quote = Quote.fromDomain(domain);

    const saved = await this._repository.save(quote);

    return saved.toDomain();
  }
  async read() {
    const data = await this._repository.find({
      relations: {
        currency: true,
      },
    });

    return data.map((item) => item.toDomain());
  }

  async update(domain: Domain) {
    const { currency, value, id } = domain;

    await this._repository.update(id, {
      currency: {
        code: currency,
      },
      value,
    });

    return domain;
  }

  async delete(id: string) {
    const deleted = await this._repository.delete({
      id,
    });

    return deleted.affected && deleted.affected > 0;
  }

  async findQuoteByCurrency(currencies?: string[]) {
    const condition: FindManyOptions<Quote> =
      currencies?.length > 0
        ? {
            where: {
              currency: In(currencies),
            },
          }
        : {};

    const data = await this._repository.find({
      relations: {
        currency: true,
      },
      ...condition,
    });

    return data.map((item) => item.toDomain());
  }
}
