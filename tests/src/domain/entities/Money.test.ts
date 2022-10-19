import { Currency } from "@/domain/entities/Currency";
import { Money } from "@/domain/entities/Money";

describe("test - money entity", () => {
  const CURRENCY = new Currency("BRL");

  test("should create money domain correctly", async () => {
    const money = new Money(CURRENCY, 10000);

    expect(money.amount).toEqual(10000);
  });

  test("should return error when amount is ZERO", async () => {
    expect(() => {
      new Money(CURRENCY, 0);
    }).toThrow(Error("Invalid amount"));
  });

  test("should return error when amount is less than ZERO", async () => {
    expect(() => {
      new Money(CURRENCY, -10);
    }).toThrow(Error("Invalid amount"));
  });
});
