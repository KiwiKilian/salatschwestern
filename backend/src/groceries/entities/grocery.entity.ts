import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { FinancialTransaction } from '@/base-entities/financial-transaction.entity';
import { BillingPeriod } from '@/billing-periods/entities/billing-period.entity';
import { FinancialTransactionType } from '@/types/FinancialTransactionType';
import { User } from '@/users/entities/user.entity';

@Entity()
export class Grocery extends FinancialTransaction {
  @ManyToMany(() => User, (user) => user.groceries)
  users?: User[];

  @ManyToOne(() => BillingPeriod, (billingPeriod) => billingPeriod.groceries, { nullable: true })
  @JoinColumn()
  billingPeriod?: BillingPeriod | null;

  @Expose()
  @ApiProperty({ enum: FinancialTransactionType, enumName: 'FinancialTransactionType' })
  get financialTransactionType() {
    return FinancialTransactionType.Grocery;
  }
}
