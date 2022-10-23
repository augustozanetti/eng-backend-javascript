import { randomUUID } from "crypto";

export class Product {
  public readonly id: string;

  public name: string;
  public amount: number;

  constructor(name: string, amount: number, id?: string) {
    this.name = name;
    this.amount = amount;

    this.id = id ?? randomUUID();
  }
}
