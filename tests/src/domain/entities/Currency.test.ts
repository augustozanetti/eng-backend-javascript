import { Currency } from "@/domain/entities/Currency";

describe("test - currency entity", () => {
  test("should create currency domain correctly", async () => {
    const code = "BRL";
    const currency = new Currency(code);

    expect(currency.code).toStrictEqual(code);
  });

  test("should return error when code length is greater than CODE_LENGTH", async () => {
    const code = "BLREUR";

    expect(() => {
      new Currency(code);
    }).toThrow(Error("Invalid code length"));
  });

  test("should return error when code length is less than CODE_LENGTH", async () => {
    const code = "B";

    expect(() => {
      new Currency(code);
    }).toThrow(Error("Invalid code length"));
  });
});
