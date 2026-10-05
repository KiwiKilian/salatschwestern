import { IsISO8601, IsNumber, IsString } from 'class-validator';

export class CreateAccountBalanceDto {
  @IsISO8601()
  date: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsString()
  subject: string;
}
