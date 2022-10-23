import { Quote } from "@/domain/entities/Quote";

const MINIMUM_AMOUNT_ALLOWED = 0;

export class Money {
  public currency: string;
  public amount: number;

  constructor(quote: Quote, amount: number) {
    this.currency = quote.currency;
    this.amount = this.checkAmount(amount, quote);
  }

  private checkAmount(amount: number, quote: Quote) {
    if (amount <= MINIMUM_AMOUNT_ALLOWED) {
      throw new Error("Invalid amount");
    }

    const a = amount / quote.value;
    return Math.floor(a);
  }
}
