import { PartialType } from "@nestjs/swagger";

import { CreateGroceryDto } from "@/groceries/dto/create-grocery.dto";

export class UpdateGroceryDto extends PartialType(CreateGroceryDto) {}
