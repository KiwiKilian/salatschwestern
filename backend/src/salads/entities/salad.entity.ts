import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "@/base-entities/base-entity.entity";
import { BillingPeriod } from "@/billing-periods/entities/billing-period.entity";
import { User } from "@/users/entities/user.entity";

@Entity()
export class Salad extends BaseEntity {
  @Column("date")
  date: string;

  @ManyToOne(() => User, (user) => user.salads)
  @JoinColumn()
  user: User;

  @ManyToOne(() => BillingPeriod, (billingPeriod) => billingPeriod.salads, { nullable: true })
  @JoinColumn()
  billingPeriod: BillingPeriod | null;
}
