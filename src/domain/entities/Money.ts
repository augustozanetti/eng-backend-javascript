import { Currency } from "@/domain/entities/Currency";

const MINIMUM_AMOUNT_ALLOWED = 0;

export class Money {
  public currency: Currency;
  public amount: number;

  constructor(currency: Currency, amount: number) {
    this.currency = currency;
    this.amount = this.checkAmount(amount);
  }

  private checkAmount(amount: number) {
    if (amount <= MINIMUM_AMOUNT_ALLOWED) {
      throw new Error("Invalid amount");
    }

    return amount;
  }
}
