import { Money } from "@/domain/entities/Money";

import currencyUsecase from "@/usecases/currency/index";
import productUsecase from "@/usecases/product/index";
import quoteUsecase from "@/usecases/quote/index";

export const resolvers = {
  Query: {
    currencies: () => {
      return currencyUsecase.read();
    },
    quotes: () => {
      return quoteUsecase.read();
    },
    products: async () => {
      const data = await productUsecase.read();

      return data;
    },
  },
  Product: {
    money: async ({ amount }, { currencies }) => {
      const quotes = await quoteUsecase.getByCurrency(currencies);

      const money = quotes.map((quote) => new Money(quote, amount));
      return money;
    },
  },
  Mutation: {
    addCurrency: (_, { code }) => {
      return currencyUsecase.create(code);
    },
    addQuote: (_, { input: { currency, value } }) => {
      return quoteUsecase.create(currency, value);
    },
    updateQuote: (_, { input: { id, currency, value } }) => {
      return quoteUsecase.update(id, currency, value);
    },
    addProduct: async (_, { input: { name, value } }) => {
      const product = await productUsecase.create(name, value);

      return product;
    },
    updateProduct: async (_, { input: { id, name, value } }) => {
      const product = await productUsecase.update(id, name, value);

      return product;
    },
    deleteProduct: (_, { id }) => {
      return productUsecase.delete(id);
    },
    deleteCurrency: (_, { code }) => {
      return currencyUsecase.delete(code);
    },
    deleteQuote: async (_, { id }) => {
      await quoteUsecase.delete(id);
      return true;
    },
  },
};
