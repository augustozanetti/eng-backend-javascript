import { Product } from "@/domain/entities/Product";

describe("test - product entity", () => {
  test("should create product domain correctly", async () => {
    const product = new Product("mizuno", 52999);

    expect(product).toStrictEqual(new Product("mizuno", 52999, product.id));
  });
});
