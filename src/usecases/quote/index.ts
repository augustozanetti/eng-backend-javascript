import { QuoteRepository } from "@/infra/repositories/QuoteRepository";
import { QuoteUseCase } from "@/usecases/quote/QuoteUsecase";

const quoteRepo = new QuoteRepository();

export default new QuoteUseCase(quoteRepo);
