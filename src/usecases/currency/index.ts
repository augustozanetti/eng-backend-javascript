import { CurrencyCodeRepository } from "@/infra/repositories/CurrencyCodeRepository";

import { CurrencyCodeUseCase } from "@/usecases/currency/CurrencyCodeUsecase";

const currencyRepo = new CurrencyCodeRepository();

export default new CurrencyCodeUseCase(currencyRepo);
