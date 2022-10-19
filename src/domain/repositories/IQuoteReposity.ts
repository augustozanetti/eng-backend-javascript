import { Quote } from "@/domain/entities/Quote";

export interface IQuoteRepository {
  create: (quote: Quote) => Promise<Quote>;
  read: () => Promise<Quote[]>;
  update: (quote: Quote) => Promise<Quote>;
  delete: (id: string) => Promise<void>;
}
