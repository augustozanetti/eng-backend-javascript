import { randomUUID } from "crypto";

export class Quote {
  public readonly id: string;

  public currency: string;
  public value: number;

  constructor(currency: string, value: number, id?: string) {
    this.currency = currency;
    this.value = value;

    this.id = id ?? randomUUID();
  }
}
