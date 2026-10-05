import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { FinancialTransaction } from '@/base-entities/financial-transaction.entity';
import { FinancialTransactionType } from '@/types/FinancialTransactionType';
import { User } from '@/users/entities/user.entity';

@Entity()
export class UserBalance extends FinancialTransaction {
  @ManyToOne(() => User, (user) => user.userBalances)
  @JoinColumn()
  user?: User;

  @Expose()
  @ApiProperty({ enum: FinancialTransactionType, enumName: 'FinancialTransactionType' })
  get financialTransactionType() {
    return FinancialTransactionType.UserBalance;
  }
}
