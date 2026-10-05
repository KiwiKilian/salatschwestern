import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BillingPeriodsController } from '@/billing-periods/billing-periods.controller';
import { BillingPeriodsService } from '@/billing-periods/billing-periods.service';
import { BillingPeriod } from '@/billing-periods/entities/billing-period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillingPeriod])],
  controllers: [BillingPeriodsController],
  providers: [BillingPeriodsService],
})
export class BillingPeriodsModule {}
