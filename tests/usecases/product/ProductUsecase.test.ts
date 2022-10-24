import { DataSource, Repository } from "typeorm";

import { Product } from "@/domain/entities/Product";
import { Product as ProductModel } from "@/infra/database/models/Product";
import usecase from "@/usecases/product/index";
import { initializeDataSource, cleanDatabase } from "@tests/jest.setup";

describe("test - product usecase", () => {
  let ds: DataSource;
  let productRepository: Repository<ProductModel>;

  beforeAll(async () => {
    ds = await initializeDataSource();
    productRepository = ds.getRepository(ProductModel);
  });

  afterAll(async () => {
    await cleanDatabase();
    ds.destroy();
  });

  const NAME = "mizuno";
  const VALUE = 52999;

  test("should create correctly product", async () => {
    const product = await usecase.create(NAME, VALUE);

    expect(product).toStrictEqual(new Product(NAME, VALUE, product.id));
  });

  test("should return created product", async () => {
    const products = await usecase.read();

    expect(products.length).toBe(1);
    expect(products[0]).toStrictEqual(new Product(NAME, VALUE, products[0].id));
  });

  test("should update product", async () => {
    const id = "26AA48A6-0A20-45DB-9D58-4EA9C7649587";
    await productRepository.save(new ProductModel(id, "new balance", 50000));

    await usecase.update(id, "mizuno", 1000);

    const product = await productRepository.findOneBy({ id });
    expect(product).toStrictEqual(new ProductModel(id, "mizuno", 1000));
  });

  test("should delete product", async () => {
    const id = "EA6DDE7D-ACFE-457F-B300-C4155D6BE8E4";
    await productRepository.save(new ProductModel(id, "new balance", 50000));

    await usecase.delete(id);

    const product = await productRepository.findOneBy({ id });

    expect(product).toBeNull();
  });
});
