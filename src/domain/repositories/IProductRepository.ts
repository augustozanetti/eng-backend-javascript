import { Product } from "@/domain/entities/Product";

export interface IProductRepository {
  create: (quote: Product) => Promise<Product>;
  read: () => Promise<Product[]>;
  update: (quote: Product) => Promise<Product>;
  delete: (id: string) => Promise<void>;
}
