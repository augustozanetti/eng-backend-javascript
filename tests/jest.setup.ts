import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

import { DataSource } from "typeorm";
import { Container } from "typedi";

import { AppDataSource } from "@/infra/database/config/index";

const dataSource = AppDataSource;

export const initializeDataSource = async (): Promise<DataSource> => {
  await dataSource
    .initialize()
    .then(() => Container.set(DataSource, dataSource)); // <--- this is the important line

  return dataSource;
};

export const cleanDatabase = async () => {
  const entities = dataSource.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(", ");

  await dataSource.query(`TRUNCATE ${tableNames} CASCADE;`);
};
