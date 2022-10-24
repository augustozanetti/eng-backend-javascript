import { Entity, PrimaryColumn } from "typeorm";

import { Currency as Domain } from "@/domain/entities/Currency";

@Entity()
export class Currency {
  constructor(code: string) {
    this.code = code;
  }

  @PrimaryColumn()
  code: string;

  toDomain() {
    return new Domain(this.code);
  }

  static fromDomain(domain: Domain) {
    return new Currency(domain.code);
  }
}
