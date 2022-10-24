import { ProductRepository } from "@/infra/repositories/ProductRepository";
import { ProductUseCase } from "@/usecases/product/ProductUsecase";

const repo = new ProductRepository();

export default new ProductUseCase(repo);
