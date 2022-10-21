import { Money } from "@/domain/entities/Money";
import { Quote } from "@/domain/entities/Quote";

describe("test - money entity", () => {
  const QUOTE = new Quote("BRL", 1);

  test("should create money domain correctly", async () => {
    const money = new Money(QUOTE, 10000);

    expect(money.amount).toEqual(10000);
  });

  test("should return error when amount is ZERO", async () => {
    expect(() => {
      new Money(QUOTE, 0);
    }).toThrow(Error("Invalid amount"));
  });

  test("should return error when amount is less than ZERO", async () => {
    expect(() => {
      new Money(QUOTE, -10);
    }).toThrow(Error("Invalid amount"));
  });
});
