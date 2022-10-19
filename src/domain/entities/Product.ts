import { randomUUID } from "crypto";

import { Money } from "@/domain/entities/Money";
import { Currency } from "@/domain/entities/Currency";

export class Product {
  public readonly id: string;

  public name: string;
  private _money: Money;

  constructor(name: string, value: number, id?: string) {
    this.name = name;
    this._money = this.buildMoney(value);
    this.id = id ?? randomUUID();
  }

  private buildMoney(amount: number) {
    const code = "BRL";
    const currency = new Currency(code);
    const money = new Money(currency, amount);

    return money;
  }

  get money() {
    return this._money;
  }
}
