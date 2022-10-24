import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from "typeorm";

import { Quote as Domain } from "@/domain/entities/Quote";
import { Currency } from "./Currency";

@Entity()
export class Quote {
  constructor(id: string, currency: Currency, value: number) {
    this.id = id;
    this.currency = currency;
    this.value = value;
  }

  @PrimaryColumn()
  id: string;

  @OneToOne(() => Currency, { eager: true })
  @JoinColumn()
  currency: Currency;

  @Column("decimal", {
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  value: number;

  static fromDomain({ id, currency, value }: Domain) {
    const currencyModel = new Currency(currency);
    return new Quote(id, currencyModel, value);
  }

  toDomain() {
    return new Domain(this.currency.code, this.value, this.id);
  }
}
