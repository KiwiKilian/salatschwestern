import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  displayName: string;
}
