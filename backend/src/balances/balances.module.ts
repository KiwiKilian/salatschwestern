import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountBalance } from '@/account-balances/entities/account-balance.entity';
import { BalancesController } from '@/balances/balances.controller';
import { BalancesService } from '@/balances/balances.service';
import { Grocery } from '@/groceries/entities/grocery.entity';
import { Salad } from '@/salads/entities/salad.entity';
import { UserBalance } from '@/user-balances/entities/user-balance.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBalance, UserBalance, Grocery, Salad, User])],
  exports: [BalancesService],
  controllers: [BalancesController],
  providers: [BalancesService],
})
export class BalancesModule {}
