import { Entity, PrimaryColumn, Column } from "typeorm";

import { Product as Domain } from "@/domain/entities/Product";

@Entity()
export class Product {
  constructor(id: string, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    type: "int",
  })
  amount: number;

  static fromDomain({ id, name, amount }: Domain) {
    return new Product(id, name, amount);
  }

  toDomain() {
    return new Domain(this.name, this.amount, this.id);
  }
}
