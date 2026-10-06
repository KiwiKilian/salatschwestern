import { IsISO8601, IsUUID } from "class-validator";

export class CreateSaladDto {
  @IsISO8601()
  date: string;

  @IsUUID(4)
  userId: string;
}
