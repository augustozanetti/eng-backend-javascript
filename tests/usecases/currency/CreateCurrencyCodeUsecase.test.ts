import { DataSource } from "typeorm";

import { Currency } from "@/domain/entities/Currency";
import { CurrencyCodeRepository } from "@/infra/repositories/CurrencyCodeRepository";
import { CurrencyCodeUseCase } from "@/usecases/currency/CurrencyCodeUsecase";
import { initializeDataSource, cleanDatabase } from "@tests/jest.setup";

describe("test - create currency code usecase", () => {
  const repository = new CurrencyCodeRepository();
  const usecase = new CurrencyCodeUseCase(repository);
  const CODE = "AAA";

  let ds: DataSource;
  beforeAll(async () => {
    ds = await initializeDataSource();
  });

  afterAll(async () => {
    await cleanDatabase();
    ds.destroy();
  });

  test("should create succesfuly currency code", async () => {
    const currencyCode = await usecase.create(CODE);

    expect(currencyCode).toStrictEqual(new Currency(CODE));
  });

  test("should return created currency code", async () => {
    const currencies = await usecase.read();

    const currency = currencies.find((currency) => currency.code == CODE);
    expect(currency).toStrictEqual(new Currency(CODE));
  });

  test("should delete currency code", async () => {
    await usecase.delete(CODE);

    const currencies = await usecase.read();

    const match = currencies.find((currency) => currency.code == CODE);

    expect(match).toBeUndefined();
  });

  test("should return error when code is greater than 3", async () => {
    expect(() => usecase.create("invalid")).toThrowError(
      Error("Invalid code length")
    );
  });

  test("should return error when code is less than 3", async () => {
    expect(() => usecase.create("i")).toThrowError(
      Error("Invalid code length")
    );
  });

  test("should return error when doesn't exists quote", async () => {
    expect(() => usecase.delete("inexistent")).rejects.toThrowError(
      Error("Code doesn't exists")
    );
  });
});
