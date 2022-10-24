import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import { start } from "@/application/graphql/index";
import { AppDataSource } from "@/infra/database/config/index";

const initialize = async () => {
  try {
    await AppDataSource.initialize();

    start();
  } catch (error) {
    console.error("error to set up project", error);
    process.exit(1);
  }
};

initialize();
