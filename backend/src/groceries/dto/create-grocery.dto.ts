import { IsISO8601, IsNegative, IsNumber, IsUUID } from "class-validator";

export class CreateGroceryDto {
  @IsISO8601()
  date: string;

  @IsNegative()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsUUID(4, { each: true })
  userIds: string[];
}
