const CODE_LENGTH = 3;

export class Currency {
  public code: string;

  constructor(code: string) {
    this.code = this.checkCode(code);
  }

  private checkCode(code: string) {
    if (code.length != CODE_LENGTH) {
      throw new Error("Invalid code length");
    }

    return code;
  }
}
