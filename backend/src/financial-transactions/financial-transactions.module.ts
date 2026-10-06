import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountBalance } from "@/account-balances/entities/account-balance.entity";
import { FinancialTransactionsController } from "@/financial-transactions/financial-transactions.controller";
import { FinancialTransactionsService } from "@/financial-transactions/financial-transactions.service";
import { Grocery } from "@/groceries/entities/grocery.entity";
import { UserBalance } from "@/user-balances/entities/user-balance.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccountBalance, Grocery, UserBalance])],
  controllers: [FinancialTransactionsController],
  providers: [FinancialTransactionsService],
})
export class FinancialTransactionsModule {}
