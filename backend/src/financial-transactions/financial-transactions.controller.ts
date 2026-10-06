import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags, refs } from "@nestjs/swagger";

import { AccountBalance } from "@/account-balances/entities/account-balance.entity";
import { FinancialTransactionsService } from "@/financial-transactions/financial-transactions.service";
import { Grocery } from "@/groceries/entities/grocery.entity";
import { UserBalance } from "@/user-balances/entities/user-balance.entity";

@ApiTags("FinancialTransactions")
@Controller("financial-transactions")
export class FinancialTransactionsController {
  constructor(private readonly financialTransactionsService: FinancialTransactionsService) {}

  @ApiResponse({
    status: 200,
    isArray: true,
    schema: {
      type: "array",
      items: {
        oneOf: refs(AccountBalance, UserBalance, Grocery),
      },
    },
  })
  @Get()
  get() {
    return this.financialTransactionsService.get();
  }
}
