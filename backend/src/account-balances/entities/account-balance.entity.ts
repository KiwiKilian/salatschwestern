import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Column, Entity } from "typeorm";

import { FinancialTransaction } from "@/base-entities/financial-transaction.entity";
import { FinancialTransactionType } from "@/types/FinancialTransactionType";

@Entity()
export class AccountBalance extends FinancialTransaction {
  @Column("varchar")
  subject: string;

  @Expose()
  @ApiProperty({ enum: FinancialTransactionType, enumName: "FinancialTransactionType" })
  get financialTransactionType() {
    return FinancialTransactionType.AccountBalance;
  }
}
