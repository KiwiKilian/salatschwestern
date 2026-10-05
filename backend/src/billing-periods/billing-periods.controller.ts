import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BillingPeriodsService } from '@/billing-periods/billing-periods.service';

@ApiTags('BillingPeriods')
@Controller('billing-periods')
export class BillingPeriodsController {
  constructor(private readonly billingPeriodsService: BillingPeriodsService) {}

  @Get()
  findAll() {
    return this.billingPeriodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingPeriodsService.findOne(id);
  }
}
