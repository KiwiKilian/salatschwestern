import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserBalance } from "@/user-balances/entities/user-balance.entity";
import { UserBalancesController } from "@/user-balances/user-balances.controller";
import { UserBalancesService } from "@/user-balances/user-balances.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserBalance])],
  controllers: [UserBalancesController],
  providers: [UserBalancesService],
})
export class UserBalancesModule {}
