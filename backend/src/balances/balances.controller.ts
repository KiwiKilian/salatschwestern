import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { BalancesService } from "@/balances/balances.service";

@ApiTags("Balances")
@Controller("balances")
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get("account")
  getAccount() {
    return this.balancesService.getAccount();
  }

  @Get("users")
  @ApiQuery({ name: "active", required: false })
  getUsers(@Query("active") active?: boolean) {
    return this.balancesService.getUsers({ active });
  }

  @Get("users/:userId")
  getUser(@Param("userId") userId: string) {
    return this.balancesService.getUser(userId);
  }
}
