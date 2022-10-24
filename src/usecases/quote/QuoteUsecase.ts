import { Quote } from "@/domain/entities/Quote";
import { IQuoteRepository } from "@/domain/repositories/IQuoteReposity";

export class QuoteUseCase {
  constructor(private quoteRepository: IQuoteRepository) {}

  create(currencyCode: string, value: number) {
    const quote = new Quote(currencyCode, value);

    return this.quoteRepository.create(quote);
  }

  async delete(id: string) {
    const deleted = await this.quoteRepository.delete(id);

    if (!deleted) {
      throw new Error("Quote doesn't exists");
    }

    return deleted;
  }

  read() {
    return this.quoteRepository.read();
  }

  update(id: string, currencyCode: string, value: number) {
    const quote = new Quote(currencyCode, value, id);

    return this.quoteRepository.update(quote);
  }

  getByCurrency(currencies: string[]) {
    return this.quoteRepository.findQuoteByCurrency(currencies);
  }
}
