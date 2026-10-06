import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { CurrentBillingPeriodService } from "@/current-billing-period/current-billing-period.service";
import { CloseCurrentBillingPeriodDto } from "@/current-billing-period/dto/close-current-billing-period.dto";

@ApiTags("CurrentBillingPeriod")
@Controller("current-billing-period")
export class CurrentBillingPeriodController {
  constructor(private readonly currentBillingPeriodService: CurrentBillingPeriodService) {}

  @Get()
  @ApiQuery({ name: "until", required: false })
  get(@Query("until") until?: string) {
    return this.currentBillingPeriodService.get(until);
  }

  @Post()
  close(@Body() closeCurrentBillingPeriodDto: CloseCurrentBillingPeriodDto) {
    return this.currentBillingPeriodService.close(closeCurrentBillingPeriodDto);
  }
}
