import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountBalancesModule } from "@/account-balances/account-balances.module";
import { AccountBalance } from "@/account-balances/entities/account-balance.entity";
import { BalancesModule } from "@/balances/balances.module";
import { BillingPeriod } from "@/billing-periods/entities/billing-period.entity";
import { CurrentBillingPeriodController } from "@/current-billing-period/current-billing-period.controller";
import { CurrentBillingPeriodService } from "@/current-billing-period/current-billing-period.service";
import { Grocery } from "@/groceries/entities/grocery.entity";
import { NotificationModule } from "@/notification/notification.module";
import { Salad } from "@/salads/entities/salad.entity";
import { UserBalance } from "@/user-balances/entities/user-balance.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BillingPeriod, Salad, Grocery, AccountBalance, UserBalance]),
    AccountBalancesModule,
    BalancesModule,
    NotificationModule,
  ],
  controllers: [CurrentBillingPeriodController],
  providers: [CurrentBillingPeriodService],
})
export class CurrentBillingPeriodModule {}
