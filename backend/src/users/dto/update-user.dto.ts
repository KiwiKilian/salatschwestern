import { PartialType, PickType } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

import { CreateUserDto } from "@/users/dto/create-user.dto";

export class UpdateUserDto extends PartialType(PickType(CreateUserDto, ["displayName"])) {
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
