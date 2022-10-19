import { Currency } from "@/domain/entities/Currency";

export interface ICurrencyCodeRepository {
  create: (currencyCode: Currency) => Promise<Currency>;
  read: () => Promise<Currency[]>;
  delete: (code: string) => Promise<void>;
}
