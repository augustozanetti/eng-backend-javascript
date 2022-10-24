import { DataSource, Repository } from "typeorm";

import { Quote } from "@/domain/entities/Quote";

import usecase from "@/usecases/quote/index";
import { Quote as QuoteModel } from "@/infra/database/models/Quote";

import { initializeDataSource, cleanDatabase } from "@tests/jest.setup";
import { Currency as CurrencyModel } from "@/infra/database/models/Currency";

describe("test - quote usecase", () => {
  let ds: DataSource;
  let currencyRepository: Repository<CurrencyModel>;
  let quoteRepository: Repository<QuoteModel>;

  beforeAll(async () => {
    ds = await initializeDataSource();
    quoteRepository = ds.getRepository(QuoteModel);
    currencyRepository = ds.getRepository(CurrencyModel);
  });

  beforeEach(async () => {
    quoteRepository = ds.getRepository(QuoteModel);
    await quoteRepository.clear();
    await currencyRepository.save(new CurrencyModel("EUR"));
  });

  afterAll(async () => {
    await cleanDatabase();
    ds.destroy();
  });

  test("should create correctly quote", async () => {
    await currencyRepository.save(new CurrencyModel("DOL"));
    const quote = await usecase.create("DOL", 0.5);

    expect(quote).toStrictEqual(new Quote("DOL", 0.5, quote.id));
  });

  test("should return created quote", async () => {
    const quoteModel = QuoteModel.fromDomain(new Quote("EUR", 10));
    await quoteRepository.save(quoteModel);

    const quotes = await usecase.read();

    const quote = quotes.find((quote) => quote.id == quoteModel.id);
    expect(quote).toStrictEqual(new Quote("EUR", 10, quote.id));
  });

  test("should update quote", async () => {
    const quoteModel = QuoteModel.fromDomain(new Quote("EUR", 1));
    await quoteRepository.save(quoteModel);

    const quote = await usecase.update(quoteModel.id, "EUR", 5000);

    expect(quote).toStrictEqual(new Quote("EUR", 5000, quoteModel.id));
  });

  test("should delete quote", async () => {
    const quoteModel = QuoteModel.fromDomain(new Quote("EUR", 1));
    await quoteRepository.save(quoteModel);

    await usecase.delete(quoteModel.id);

    const quotes = await usecase.read();
    expect(quotes.length).toBe(0);
  });

  test("should return error when not exists currency", async () => {
    const quoteModel = QuoteModel.fromDomain(new Quote("INE", 1));

    expect(quoteRepository.save(quoteModel)).rejects.toThrow();
  });

  test("should return error when doesn't exists quote", async () => {
    expect(() => usecase.delete("inexistent")).rejects.toThrowError(
      Error("Quote doesn't exists")
    );
  });
});
