import { IsDateString, IsNumber, Min } from 'class-validator';

export class CloseCurrentBillingPeriodDto {
  @IsDateString()
  until: string;

  @Min(0)
  @IsNumber({ maxDecimalPlaces: 2 })
  countedAccountBalance: number;
}
