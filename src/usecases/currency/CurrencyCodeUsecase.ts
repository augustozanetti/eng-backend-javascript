import { Currency } from "@/domain/entities/Currency";
import { ICurrencyCodeRepository } from "@/domain/repositories/ICurrencyCodeReposity";

export class CurrencyCodeUseCase {
  constructor(private currencyCodeRepository: ICurrencyCodeRepository) {}

  create(code: string) {
    const currency = new Currency(code);

    return this.currencyCodeRepository.create(currency);
  }

  async delete(code: string) {
    const deleted = await this.currencyCodeRepository.delete(code);

    if (!deleted) {
      throw new Error("Code doesn't exists");
    }

    return deleted;
  }

  read() {
    return this.currencyCodeRepository.read();
  }
}
