import { Column, Entity, OneToMany } from "typeorm";

import { BaseEntity } from "@/base-entities/base-entity.entity";
import { Grocery } from "@/groceries/entities/grocery.entity";
import { Salad } from "@/salads/entities/salad.entity";
import { ColumnDecimalTransformer } from "@/transformers/ColumnDecimalTransformer";

@Entity()
export class BillingPeriod extends BaseEntity {
  @Column("date")
  billingDate: string;

  @OneToMany(() => Salad, (salad) => salad.billingPeriod)
  salads?: Salad[];

  @Column("decimal", { precision: 5, scale: 2, transformer: new ColumnDecimalTransformer() })
  saladPrice: number;

  @OneToMany(() => Grocery, (grocery) => grocery.billingPeriod)
  groceries?: Grocery[];
}
