import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountBalancesController } from '@/account-balances/account-balances.controller';
import { AccountBalancesService } from '@/account-balances/account-balances.service';
import { AccountBalance } from '@/account-balances/entities/account-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBalance])],
  exports: [AccountBalancesService],
  controllers: [AccountBalancesController],
  providers: [AccountBalancesService],
})
export class AccountBalancesModule {}
