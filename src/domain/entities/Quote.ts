import { randomUUID } from "crypto";

export class Quote {
  public readonly id: string;

  public currencyCode: string;
  public value: number;

  constructor(currencyCode: string, value: number, id?: string) {
    this.currencyCode = currencyCode;
    this.value = value;

    this.id = id ?? randomUUID();
  }
}
