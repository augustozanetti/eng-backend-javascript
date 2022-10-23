import { Currency } from "@/domain/entities/Currency";

export interface ICurrencyCodeRepository {
  create: (input: Currency) => Promise<Currency>;
  read: () => Promise<Currency[]>;
  delete: (code: string) => Promise<boolean>;
}
