import { Product } from "@/domain/entities/Product";

const PRODUCT_ID = "B1E55026-C326-496F-8898-4B25063EB5FC";

jest.mock("crypto", () => {
  return {
    randomUUID: jest.fn(() => PRODUCT_ID),
  };
});

describe("test - product entity", () => {
  test("should create product domain correctly", async () => {
    const product = new Product("mizuno", 52999);

    expect(product).toStrictEqual(new Product("mizuno", 52999, PRODUCT_ID));
  });
});
