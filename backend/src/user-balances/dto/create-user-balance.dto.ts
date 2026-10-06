import { IsISO8601, IsNumber, IsUUID } from "class-validator";

export class CreateUserBalanceDto {
  @IsISO8601()
  date: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsUUID(4)
  userId: string;
}
