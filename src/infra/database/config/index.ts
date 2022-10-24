import { DataSource } from "typeorm";

import { Quote } from "@/infra/database/models/Quote";
import { Currency } from "@/infra/database/models/Currency";
import { Product } from "@/infra/database/models/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Currency, Quote, Product],
  subscribers: [],
});

export default AppDataSource;
